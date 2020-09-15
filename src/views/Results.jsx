import React, { useState, useEffect } from "react";
import { faLink, faDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { Helmet } from "react-helmet";

import ResultsIndicator from "components/simulateur/ResultsIndicator";
import Header from "components/partials/Header";
import ChartContainer from "components/resultats/ChartContainer";
import ResultsSocial from "components/resultats/ResultsSocial";
import CopyToClipboard from "components/CopyToClipboard";

import "styles/results.css";
import "styles/simulator.css";

import ReactGA from "react-ga";

const Results = (props) => {
  const [arrowVisibility, setArrowVisibility] = useState("hidden");
  const [results, setResults] = useState(null);
  
  const indicatorObjectives = {climate:-27, energy:-11, air: [-70, -57]}
  const secondaryColor = "var(--lightgrey)";
  const fontColor= "white"

  useEffect(() => {
    let results = null;
    if (localStorage.getItem("results")) {
      results = JSON.parse(localStorage.getItem("results"));
      setResults(results);
    } else {
      results = props.location.state.results;
      localStorage.setItem("results", JSON.stringify(results));
      setResults(props.location.state.results);
    }
  }, [props.location.state]);

  function handleIndicatorColor(data, obj) {
    const objReached = data / obj * 100
    return objReached >= 100
      ? "#B0E440"
      : objReached >= 50 && objReached < 100
      ? "#FFF176"
      : "#EB1818"
  }

  // useEffect(() => {
  //   if (!results) return;

  //   ReactGA.event({
  //     category: "Results",
  //     action: "temp:" + results.impacts.temperature,
  //   });
  // }, [results]);



  function handleClickTracking(type) {
    ReactGA.event({
      category: "Click",
      action: type,
    });
  }

  function handleInnerHTML(text) {
    return { __html: text };
  }

  function areaLegend(datas, type) {
    let dataValues = {};
    var datasKey = "";
    var unit = "";
    if (type === "area") {
      datasKey = "areaDatas";
      dataValues = datas.data.data;
      unit = datas.data.yTitle;
    } else if (type === "line") {
      dataValues = datas.data;
      datasKey = "line";
      unit = datas.yTitle;
    }

    function formatThousands(nb) {
      nb += "";
      if (nb.length > 3) {
        var nbSplitted = nb.split(".");
        nb = nbSplitted[0];

        var finalNb = "";
        for (let i = nb.length - 1; i >= 0; i--) {
          if ((i - nb.length + 1) % 3 === 0 && i - nb.length + 1 !== 0) {
            finalNb = nb[i] + " " + finalNb;
          } else {
            finalNb = nb[i] + finalNb;
          }
        }
        return nbSplitted.length > 1 ? finalNb + "." + nbSplitted[1] : finalNb;
      }
      return nb;
    }

    datas[datasKey].map((data) => {
      data.subText =
        formatThousands(dataValues[dataValues.length - 1][data.dataKey]) +
        " " +
        unit +
        " / Evolution : ";
      let evolution = Math.round(
        ((dataValues[dataValues.length - 1][data.dataKey] - dataValues[0][data.dataKey]) /
          dataValues[0][data.dataKey]) *
          100,
      );
      dataValues[0][data.dataKey] === 0
        ? (data.subText += " n/a")
        : evolution >= 0
        ? (data.subText += "+" + evolution + "%")
        : (data.subText += evolution + "%");
      return data;
    });

    let dataReversed = [...datas[datasKey]];
    dataReversed.reverse();

    return dataReversed;
  }

  function pieLegend(datas) {
    datas.data01.map((data) => {
      data.dataKey = data.name;
      data.subText = Math.round(data.value) + " MtCO2";
      return data;
    });

    return datas.data01;
  }

  window.addEventListener("scroll", handleArrowVisibility);

  function handleArrowVisibility() {
    window.scrollY / window.innerHeight > 1
      ? setArrowVisibility("visible")
      : setArrowVisibility("hidden");
  }

  if (!results) return null;

  return (
    <div className="results-page flex-item flex-column">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Mission Climat / Résultats</title>
        <meta name="description" content="Résultats complets de votre simulation Mission Climat" />
        <link rel="canonical" href="http://mission-climat.io/licenses" />
      </Helmet>

       <Header background="color"/>

      
      <article id="hero-article">

        {/* nav */}
        {/* <div className="flex-item full-width">
          <div className="flex-column">
            <a href="#res-synthese">
              <div className="chapter-selection">
                <img src="/images/results/fiche synthèse - blanc.svg" alt="" />
                <br />
                <span>Synthèse</span>
              </div>
            </a>
          </div>

          <div className="flex-column">
            <a href="#res-emi-fr">
              <div className="chapter-selection">
                <img src="/images/results/nuage CO2 - blanc.svg" alt="" />
                <br />
                <span>Emissions françaises</span>
              </div>
            </a>
          </div>

          <div className="flex-column">
            <a href="#res-emi-world">
              <div className="chapter-selection">
                <img src="/images/results/emission monde - blanc.svg" alt="" />
                <br />
                <span>Emissions mondiales</span>
              </div>
            </a>
          </div>

          <div className="flex-column">
            <a href="#res-impacts">
              <div className="chapter-selection">
                <img src="/images/results/impact - blanc.svg" alt="" />
                <br />
                <span>Impacts</span>
              </div>
            </a>
          </div>
        </div> */}

        <div className="contribuer-title flex-item flex-column">
          <h1>Résultats Complets</h1>
        </div>
        <div className="contact-white">
          <p>
            Retrouvez sur cette page une synthèse de vos résultats et de nombreux graphiques vous
            permettant de visualiser les conséquences de votre scénario.
          </p>
        </div>

        


      </article>


      <section id="res-synthese" className="flex-item flex-column">
          <h2>Synthèse</h2>

          <div className="flex-item flex-column">
            <div id="res-synthese-indicator" className="flex-item">
              <div className="tag-container flex-item flex-column">
                <ResultsIndicator
                  indicator={results.indicators.climate.main[0]}
                  backgroundColor={handleIndicatorColor(results.indicators.climate.main[0].value,indicatorObjectives.climate)}
                  color={fontColor}
                  width="100%"
                />
              </div>
              <div className="tag-container flex-item flex-column">
                <ResultsIndicator
                    indicator={results.indicators.energy.main[0]}
                    backgroundColor={handleIndicatorColor(results.indicators.energy.main[0].value,indicatorObjectives.energy)}
                    color={fontColor}
                    width="100%"
                  />
              </div>
              {results.indicators.air.secondary.map((indicator, i) => (
                <div className="tag-container flex-item flex-column">
                  <ResultsIndicator
                    indicator={indicator}
                    backgroundColor={handleIndicatorColor(indicator.value, indicatorObjectives.air[i])}
                    color={fontColor}
                    width="100%"
                  />
                </div>
                ))}
            </div>

            {/* <div id="res-synthese-buttons" className="flex-item">
              <div title="Copier l'url avec mes paramètres">
                <CopyToClipboard text={results.url} fn={handleClickTracking.bind(null, "copyURL")}>
                  <FontAwesomeIcon icon={faLink} />
                </CopyToClipboard>
              </div>

              <div title="Télécharger le modèle de calcul des données">
                <a
                  href="./2020-04-09_Scenario1.5.xlsx"
                  download
                  onClick={() => handleClickTracking("modelDownloadResults")}
                >
                  <FontAwesomeIcon icon={faDownload} />
                </a>
              </div>

              <ResultsSocial
                results={results}
                fillColor="#34244E"
                handleClickTracking={handleClickTracking}
              />
            </div> */}
          </div>
        </section>

      <button id="blinking-results" style={{ visibility: arrowVisibility }}>
        <a href="#hero-article">
          <FontAwesomeIcon icon={faAngleUp} />
        </a>
      </button>

      <article id="res-emi-fr" className="flex-item flex-column">

        {Object.keys(results.completeResults).map((key, i) => (
          <>
            <h2>{results.completeResults[key].title}</h2>
            <p dangerouslySetInnerHTML={handleInnerHTML(results.completeResults[key].intro)}></p>

            {results.completeResults[key].graphs.map((graph,i)=> (
              <ChartContainer {...graph}/>
            ))}
          </>
        ))}

      </article>


      
    </div>
  );
};

export default Results;
