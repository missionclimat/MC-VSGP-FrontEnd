import React, { useState } from "react";

import SimulatorNavigationMenu from "components/simulateur/SimulatorNavigationMenu";
import SimulatorIcon from "components/simulateur/SimulatorIcon";
import ReactGA from "react-ga";

import "styles/SimulatorNavigation.css";

const SimulatorNav = ({ leftNavData, showOptions, style, isActiveOptions }) => {
  const [isHovered, setIsHovered] = useState(false);
  function handleClickTracking(type) {
    ReactGA.event({
      category: "Click",
      action: type,
    });
  }

  function handleClick(event) {
    handleClickTracking("options");
    showOptions(event);
  }

  return (
    <div id="SimulatorNavigation" style={style}>
      <h2 className="scope">{leftNavData.scope}</h2>
      <h2 className="scope">Options</h2>
      <div className="icons">
        <SimulatorNavigationMenu data={leftNavData} />
      </div>
      <div className="options-container">
        <button
          onMouseOver={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="options"
          onClick={handleClick}
        >
          <SimulatorIcon
            icon="Options"
            onMouseOver={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            color={isActiveOptions || isHovered ? "black" : "white"}
          />
        </button>
        <p style={{ color: isActiveOptions || isHovered ? "black" : "white" }}>Options</p>
      </div>
    </div>
  );
};

export default SimulatorNav;
