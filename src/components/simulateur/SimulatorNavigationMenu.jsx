import React from "react";
import SimulatorIcon from "components/simulateur/SimulatorIcon";
import SimulatorNavigationLink from "components/simulateur/SimulatorNavigationLink";
import { useLocation } from "react-router-dom";

const SimulatorNavigationMenu = ({ data }) => {
  const location = useLocation();

  const currentHash = location.hash;

  return (
    <React.Fragment>
      {data.categories.map((cat) => (
        <SimulatorNavigationLink key={cat.id} color={cat.colorHover} name={cat.name} id={cat.id}>
          <SimulatorIcon
            icon={cat.name}
            color={currentHash === `#${cat.id}` ? cat.colorHover : "white"}
          />
        </SimulatorNavigationLink>
      ))}
    </React.Fragment>
  );
};

export default SimulatorNavigationMenu;
