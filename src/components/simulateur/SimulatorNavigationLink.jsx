import React from "react";
import hexToRgb from "utils/hexToRgb";

const SimulatorNavigationLink = ({ id, color, name, children }) => {
  const rgb = hexToRgb(color);
  
  return (
    <a href={`#${id}`} title={name}>
      {children}
      <p>{name}</p>
    </a>
  );
};

export default SimulatorNavigationLink;
