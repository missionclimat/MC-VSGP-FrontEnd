import React, { useState, useEffect } from "react";
import SimulatorProgressBarMarker from "./SimulatorProgressBarMarker";
import ArrowDropDownOutlinedIcon from "@material-ui/icons/ArrowDropDownOutlined";
function getGradient(colorA, colorB) {
  return `linear-gradient(to right, ${colorA}, ${colorB})`;
}

const SimulatorProgressBar = ({ results }) => {
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

  function handleColor() {
    const measures = data.measures[0];
    const marker0 = data.markers[0];
    const marker1 = data.markers[1];
    const marker2 = data.markers[2];

    if (measures <= marker0) {
      return getGradient("#7FFFD4", "#77D9B5");
    } else if (measures <= marker1) {
      return getGradient("#F2F230", "#FFC53A");
    } else if (measures <= marker2) {
      return getGradient("#FFB8B8", "#DB7093");
    } else {
      return getGradient("#DA8FFF", "#663399");
    }
  }

  function handleClass() {
    return data.measures[0] >= data.ranges[2] - 15 ? "jauge-int-max" : "jauge-int";
  }

  console.log(value);
  return (
    <div
      className="jauge-ext"
      ref={parentRef}
      style={{
        height: "20px",
        width: "100%",
        backgroundColor: "white",
        border: "#C7C7C7 solid 1px",
        position: "relative",
      }}
    >
      <SimulatorProgressBarMarker backgroundColor="#0b8c85" position={m1} />
      <SimulatorProgressBarMarker backgroundColor="#ff6868" position={m2} />
      <div
        style={{
          zIndex: 99,
          display: "flex",
          flexDirection: "column",
          transform: `translate(${translateValue}px,${"-50%"})`,
        }}
      >
        <ArrowDropDownOutlinedIcon />
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
          backgroundImage: handleColor(),
        }}
      ></div>
    </div>
  );
};

export default SimulatorProgressBar;
