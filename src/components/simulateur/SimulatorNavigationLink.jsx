import React from "react";

const SimulatorNavigationLink = ({ id, color, name, children }) => {
  return (
    <a style={{ color: color }} href={`#${id}`} title={name}>
      {children}
      <p>{name}</p>
    </a>
  );
};

export default SimulatorNavigationLink;
