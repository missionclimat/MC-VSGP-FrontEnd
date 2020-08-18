import React from "react";
import SimulatorProgressBar from "components/simulateur/SimulatorProgressBar";

const SimulatorCategory = ({ data, results, index }) => {
  //calcul des marges de la légende de la jauge pour leur positionnement
  if (results) {
    const max = results[0].ranges[2];
    const m1 = (results[0].markers[0] / max) * 100;
    const m2 = (results[0].markers[1] / max) * 100;

    var margin1 = 0;
    if (m1 < 12) {
      margin1 = 0 + "%";
    } else {
      margin1 = m1 - 12 + "%";
    }

    var margin2 = 0;
    if (m2 < m1 + 24) {
      margin2 = 0 + "%";
    } else if (m2 > 86) {
      margin2 = 86 - m1 - 24 + "%";
    } else {
      margin2 = m2 - m1 - 24 + "%";
    }
  }

  return (
    <div id={"cat" + data.index} className="sim-categorie flex-item">
      <div>
        <h4
          style={{ position: "relative", display: "block", width: "max-content" }}
          className="sim-categorie-name"
        >
          {data.name}
          <span
            style={{
              position: "absolute",
              height: "8px",
              backgroundColor: data.colorHover,
              left: 0,
              bottom: 0,
              top: "102%",
              width: "50%",
            }}
          ></span>
        </h4>
      </div>

      {results && data.name === results[0].name && (
        <div className="flex-item flex-column">
          <p style={{ visibility: "hidden" }} className="sim-categorie-emissions">
            Emissions : {Math.round(results[0].measures[0])} MtCO2e
          </p>
          {/* <div className="sim-jauge">{results && data.name === results[0].name && <Jauge results={results}/>}</div> */}
          <div className="sim-jauge">
            {results && data.name === results[0].name && (
              <SimulatorProgressBar progressBarColor={data.colorHover} results={results} />
            )}
          </div>
          <div className="sim-categorie-markers flex-item">
            <div style={{ position: "relative", marginLeft: `${margin1}` }}>
              <div>
                <p>2°C</p>
              </div>
              <div>
                <p className="sim-emissions-2030">
                  {Math.round(results[0].markers[0])} <span>ktCO2e</span>
                </p>
              </div>
            </div>
            <div style={{ position: "relative", marginLeft: `${margin2}` }}>
              <div>
                <p>2020</p>
              </div>
              <div>
                <p className="sim-emissions-2020">
                  {Math.round(results[0].markers[1])} <span>ktCO2e</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SimulatorCategory;
