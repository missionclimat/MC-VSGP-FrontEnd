import React from "react";
import { withRouter } from "react-router-dom";

import SimulatorNavigationMenu from "components/simulateur/SimulatorNavigationMenu";
import SimulatorIcon from "components/simulateur/SimulatorIcon";
import ReactGA from "react-ga";

import "styles/SimulatorNavigation.css";

const SimulatorNav = ({ leftNavData, showOptions, style, location }) => {
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

  const hash = location.hash.replace("#", "");

  return (
    <div id="SimulatorNavigation" style={style}>
      <h2 className="scope">{leftNavData.scope}</h2>
      <h2 className="scope">Options</h2>
      <div className="icons">
        <SimulatorNavigationMenu data={leftNavData} />
      </div>
      <div>
        <button className="options" onClick={handleClick}>
          <SimulatorIcon icon="Options" color="black" />
          {/* <img src="/images/Options.png" alt="options" /> */}
        </button>
        <p>Options</p>
      </div>
    </div>
  );
};

export default withRouter(SimulatorNav);
