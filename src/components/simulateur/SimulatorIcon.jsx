import React from "react";

const SimulatorIcon = ({ icon }) => {
  const imgSrc = {
    Habitat: "/images/Logement.png",
    Transports: "/images/Transports.png",
    Tertiaire: "/images/Alimentation.png",
    Industrie: "/images/Biens services.png",
    Énergie: "/images/Energie.png",
    Trajectoire: "/images/Trajectoire.png",
    Paramètres: "/images/Projection mondiale.png",
  };

  return <img src={imgSrc[icon]} alt={icon} />;
};

export default SimulatorIcon;
