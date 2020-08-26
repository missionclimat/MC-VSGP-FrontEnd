import React, { useState, useEffect } from "react";
import { faLink, faDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { Helmet } from "react-helmet";

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

  console.log(results)

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

        {/* <section id="res-synthese" className="flex-item flex-column">
          <h1>Synthèse</h1>

          <div className="flex-item flex-column">
            <div id="res-synthese-indicator" className="flex-item">
              <div className="tag-container flex-item flex-column">
                <p className="results-title">Températures</p>
                <div
                  className="results-figure flex-item"
                  style={{ backgroundColor: tempColor(), color: "white" }}
                >
                  +{results.impacts.temperature}°C
                </div>
                <p className="results-legend">
                  Hausse moy. mondiale / 2100 (de {results.impacts.temperatureRange})
                </p>
              </div>
              <div className="tag-container flex-item flex-column">
                <p className="results-title">Évolution émissions</p>
                <div
                  className="results-figure flex-item"
                  style={{ backgroundColor: "#40E0D0", color: "#163E59" }}
                >
                  {results.impacts.reductionEmission2030}
                </div>
                <p className="results-legend">Entre 2020 et 2030</p>
              </div>
            </div>

            <p dangerouslySetInnerHTML={handleInnerHTML(results.impacts.texteSynthese)}></p>

            <div id="res-synthese-buttons" className="flex-item">
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
            </div>
          </div>
        </section> */}
      </article>

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
