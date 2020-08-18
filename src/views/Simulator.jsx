/// BASIC
import React, { useState, useEffect } from "react";
import Header from "components/partials/Header";
import { Helmet } from "react-helmet";
import ReactGA from "react-ga";
import jsonFile from "ressources/initialDatas.json";

/// COMPONENTS
import SimulatorSettings from "components/simulateur/SimulatorSettings";
import SimulatorNavigation from "components/simulateur/SimulatorNavigation";
import Title from "components/partials/Title";
import OptionsBox from "components/simulateur/OptionsBox";
import ResultsSample from "components/simulateur/ResultsSample";
import SimulatorLoader from "components/simulateur/SimulatorLoader";
import Modal from 'components/partials/Modal';

// Custom Hooks
import { useVisibility } from "hooks/useVisibility";

// Utility functions
import { getUrl } from "utils/getUrl";
import { getValuesFormatted } from "utils/getValuesFormatted";
import { getValuesFromUrl } from "utils/getValuesFromUrl";

import api from "api/APIHandler";
import "styles/simulator.css";
import "styles/app.css";

const Simulator = (props) => {
  const [values, setValues] = useState(null);
  const [results, setResults] = useState(null); // jsonFile.results
  const [modeExpert, setModeExpert] = useState(false);
  const [showOptions, hideOptions, isVisible] = useVisibility(false);
  const [open, setOpen] = useState(true);

  //Gestion d'une route avec paramêtres spécifiques
  //url test : favorites/p0=100&&p1=0&&p2=56&&p3=99&&p4=30&&p5=18&&p6=52&&p7=35&&p8=57&&p9=2&&p10=80&&p11=82&&p12=3000000&&p13=73&&p14=35&&p15=30&&p16=50&&p17=100&&p18=85&&p19=85&&p20=85&&p21=1&&p22=2

  // Fonction appellée à la première exécution. Permet de :
  //   - créer une spreadsheet si non créée,
  //   - charger les valeurs de la spreadsheet créée si existante, et les afficher,
  //   - charger les valeurs d'un scénario enregistré, dans le cas d'un appel via url spécifique,
  useEffect(() => {
    async function initDatas() {
      var valuesURL = [];
      // cas où une sheet est déjà en dans le localstorage
      const idSheet = localStorage.getItem("idSheet-VSGP");

      if (idSheet) {
        console.log("SHEET ALREADY CREATED, ID:", idSheet);
        //cas où appel normal de la page simulateur
        if (!props.location.pathname.includes("favorites")) {
          const response = await api.get("/sheet/values/" + idSheet);
          setValues(response.data.values);
        } else {
          // cas où appel via url spécifique /save/p=1&&p=3.....
          const startIndex = props.location.pathname.indexOf("p0=");
          const url = props.location.pathname.substr(startIndex);
          valuesURL = getValuesFromUrl(url);
          setValues(valuesURL);
        }
      } else {
        // cas où aucune sheet n'a été créée

        //création d'une copie de la sheet master
        const response = await api.get("/sheet/");
        const idSheet = response.data.id;
        localStorage.setItem("idSheet-VSGP", idSheet);
        console.log("SHEET CREATED! ID:", idSheet);

        // cas où appel via url spécifique /save/p=1&&p=3.....
        if (props.location.pathname.includes("favorites")) {
          const startIndex = props.location.pathname.indexOf("p0=");
          const url = props.location.pathname.substr(startIndex);
          valuesURL = getValuesFromUrl(url);
          setValues(valuesURL);
        } else {
          // cas où appel normal (on initialise tout de même les valeurs ici pour le loader)
          setValues(jsonFile.options.vInit);
        }
      }
    }

    initDatas();

    //nettoyage du results de local storage
    if (localStorage.getItem("results")) {
      localStorage.removeItem("results");
    }
  }, [props.location.pathname]);

  //Fonction appellée à chaque actualisation de la variable state "values". Permet d'actualiser les résultats correpondant aux nouvelles values
  useEffect(() => {
    console.log("useEffect", values)
    if (values) {
      const idSheet = localStorage.getItem("idSheet-VSGP");
      const valuesFormatted = getValuesFormatted(values, jsonFile.options.unit);
      if (idSheet) {
        api
          .patch("/sheet/update/" + idSheet, { values: valuesFormatted })
          .then((res) => {
            const resTemp = res.data.results;
            resTemp.url = getUrl(values, jsonFile.parameters);
            //correction des data area pour affichage ok
            // handleAreaData(resTemp.emiSecteurGnl);
            setResults(resTemp);
          })
          .catch((err) => console.log(err));
      }
    }
  }, [values]);

  function setOneValue(value, index) {
    ReactGA.event({
      category: "Parameters",
      action: index + ":" + value,
    });
    setValues((values) => {
      const newValues = [...values];
      newValues[index][0] = value;
      return newValues;
    });
  }

  function handleInitValues(e) {
    const values = {
      init: "vInit",
      vMin: "vMin",
      "1degre5": "v15",
      bau: "vBaU",
      vMax: "vMax",
    };

    const initMode = e.target.value;
    const valuesTemp = jsonFile.options[values[initMode]];

    const idSheet = localStorage.getItem("idSheet-VSGP");
    const valuesFormatted = getValuesFormatted(valuesTemp, jsonFile.options.unit);

    // setValues(valuesTemp)
    // setVisibleOptions(false);
    api
      .patch("/sheet/updateonly/" + idSheet, { values: valuesFormatted })
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => console.log(err));
  }

  // function handleAreaData(datas) {
  //   datas.areaDatas = [...datas.areaDatas].reverse();
  //   return datas;
  // }

  const handleModeExpert = (value) => {
    setModeExpert(value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (!values || !results) {
    return <SimulatorLoader />;
  }

  return (
    <>
      <Modal 
        isOpen={open}
        closeModal={()=>setOpen(false)}
        children={
          <div id="intro-vsgp">
          <h3>Bienvenue sur Mission Climat<br></br>Vallée Sud - Grand Paris</h3>
          <p>Cet outil a été développé dans le cadre de l’élaboration du <a href="https://www.valleesud.fr/fr/PCAET" target="_blank">Plan Climat Air Energie Territorial de Vallée Sud – Grand Paris</a>. Il a une vocation pédagogique, et ne préjuge en rien des objectifs et actions qui seront in fine retenus dans la version finale du Plan Climat Air Energie Territorial.</p>
          <p>Il se focalise sur les émissions de gaz à effet de serre directement émises sur le Territoire de Vallée Sud – Grand Paris, liées aux secteurs les plus émetteurs sur le territoire : habitat, tertiaire, transports, industrie, énergie.</p>
          <p>Les émissions liées à la production et aux transports de biens et services, qu’ils soient produits localement, nationalement ou importés ne sont pas paramétrables dans l’outil, car elles dépendent essentiellement de politiques nationales et internationales. A titre indicatif, elles sont toutefois prises en compte dans l’indicateur « empreinte carbone ».</p>
          <p>Pour en savoir plus sur ces impacts, rendez-vous sur le <a href="http://mission-climat.io/" target="_blank">Simulateur de l’échelle nationale</a> ou sur le <a href="https://ecolab.ademe.fr/apps/climat/simulateur/bilan?PR=106" target="_blank">calculateur carbone individuel</a></p>
          </div> 
        }>
      </Modal>
      <Header />
      <div className="sim-page flex-item">
        <Helmet>
          <meta charSet="utf-8" />
          <title>Mission Climat / Simulateur</title>
          <meta name="description" content="Simulateur de scénarios climat à l'échelle nationale" />
          <link rel="canonical" href="http://mission-climat.io/simulator/" />
        </Helmet>

        <section className="sim-container-box">
          <Title id="sim-title">Mesures sur le territoire Vallée Sud Grand Paris - 2030</Title>
          <SimulatorNavigation
            leftNavData={jsonFile.nav[0]}
            showOptions={showOptions}
            isActiveOptions={isVisible}
            style={{
              background: "linear-gradient(101.38deg, #006567 0%, #00AEC7 100%)",
              color: "white",
            }}
          />

          <div className="sim-main-box">
            {isVisible && (
              <OptionsBox
                modeExpert={modeExpert}
                hideOptions={hideOptions}
                handleInitValues={handleInitValues}
                handleModeExpert={handleModeExpert}
              />
            )}

            <SimulatorSettings
              categories={jsonFile.categories}
              results={results}
              values={values}
              modeExpert={modeExpert}
              handleValue={setOneValue}
            />
          </div>
        </section>

        <ResultsSample results={results} />
      </div>
    </>
  );
};
export default Simulator;
