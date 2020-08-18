import React, { useState, useEffect } from "react";
import SimulatorProgressBarMarker from "./SimulatorProgressBarMarker";

function getGradient(colorA, colorB) {
  return `linear-gradient(to right, ${colorA}, ${colorB})`;
}

const SimulatorProgressBar = ({ results, progressBarColor }) => {
  const [translateValue, setTranslateValue] = useState(0);
  const [parentWidth, setParentWidth] = useState(0);
  const data = results[0];
  const max = data.ranges[2];
  const m1 = (data.markers[0] / max) * 100 - 0.25 + "%";
  const m2 = (data.markers[1] / max) * 100 - 0.25 + "%";
  const jaugeStart = -(data.markers[1] / max) * 100 + 0.5 + "%";
  const value = (data.measures[0] / max) * 100 + "%";
  const parentRef = React.createRef(null);

  useEffect(() => {
    let palue = Number(value.replace("%", ""));
    const width = parentRef.current.getBoundingClientRect().width;
    const translateVal = (width * palue) / 100;
    setTranslateValue(translateVal - 24 / 2);
  }, [results, parentRef]);

  // useEffect(() => {
  //   function handleResize(event) {
  //     const width = parentRef.current.getBoundingClientRect().width;
  //     setParentWidth(width);
  //   }
  //   window.addEventListener("resize", handleResize);

  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   };
  // });

  function handleClass() {
    return data.measures[0] >= data.ranges[2] - 15 ? "jauge-int-max" : "jauge-int";
  }

  return (
    <div
      className="jauge-ext"
      ref={parentRef}
      style={{
        height: "20px",
        width: "100%",
        backgroundColor: "white",
        border: "#E5EAEC solid 1px",
        position: "relative",
      }}
    >
      <SimulatorProgressBarMarker backgroundColor="#0b8c85" position={m1} />
      <SimulatorProgressBarMarker backgroundColor="#ff6868" position={m2} />
      <div
        style={{
          left: `calc(${value})`,
        }}
        className="tooltip sim-categorie-emissions"
      >
        <p> Emissions: {Math.round(results[0].measures[0])} ktCO2e</p>
      </div>
      <div
        className={handleClass()}
        style={{
          borderRadius: "none",
          height: "18.5px",
          width: `${value}`,
          position: "absolute",
          left: `${jaugeStart}px`,
          transition: "1s",
          backgroundColor: progressBarColor,
        }}
      ></div>
    </div>
  );
};

export default SimulatorProgressBar;
