import React, { useState } from "react";
import SimulatorIcon from "components/simulateur/SimulatorIcon";
import SimulatorNavigationLink from "components/simulateur/SimulatorNavigationLink";
import { useLocation } from "react-router-dom";

const SimulatorNavigationMenu = ({ data }) => {
  const [hoveredItem, setHoveredItem] = useState(null);
  const location = useLocation();

  const currentHash = location.hash;

  const handleMouserOver = (catId) => {
    setHoveredItem(catId);
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  return (
    <React.Fragment>
      {data.categories.map((cat) => (
        <SimulatorNavigationLink
          key={cat.id}
          color={currentHash === `#${cat.id}` || cat.id === hoveredItem ? cat.colorHover : "white"}
          name={cat.name}
          id={cat.id}
        >
          <SimulatorIcon
            onMouseOver={handleMouserOver}
            onMouseLeave={handleMouseLeave}
            id={cat.id}
            icon={cat.name}
            color={
              currentHash === `#${cat.id}` || cat.id === hoveredItem ? cat.colorHover : "white"
            }
          />
        </SimulatorNavigationLink>
      ))}
    </React.Fragment>
  );
};

export default SimulatorNavigationMenu;
