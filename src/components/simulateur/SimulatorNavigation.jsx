import React from "react";

import SimulatorNavigationMenu from "components/simulateur/SimulatorNavigationMenu";
import ReactGA from "react-ga";

const SimulatorNav = ({ leftNavData, showOptions }) => {
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
    <div id="sim-nav-box" className="flex-item flex-column">
      <div className="flex-item">
        <div id="sim-nav-fr">
          <SimulatorNavigationMenu data={leftNavData} />
        </div>
        <button
          id="options"
          className="sim-nav-category flex-item flex-column"
          onClick={handleClick}
        >
          <div className="sim-nav-category-icon">
            <span className="sim-nav-category-icon-helper"></span>
            <img src="/images/Options.png" alt="options" />
          </div>
        </button>
      </div>
    </div>
  );
};

export default SimulatorNav;
