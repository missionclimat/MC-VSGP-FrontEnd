import React from "react";
import SimulatorIcon from "components/simulateur/SimulatorIcon";
import SimulatorNavigationLink from "components/simulateur/SimulatorNavigationLink";

const SimulatorNavigationMenu = ({ data }) => {
  return (
    <React.Fragment>
      {data.categories.map((cat) => (
        <SimulatorNavigationLink key={cat.id} color={cat.colorHover} name={cat.name} id={cat.id}>
          <SimulatorIcon icon={cat.name} color={cat.colorHover} />
        </SimulatorNavigationLink>
      ))}
    </React.Fragment>
  );
};

export default SimulatorNavigationMenu;
