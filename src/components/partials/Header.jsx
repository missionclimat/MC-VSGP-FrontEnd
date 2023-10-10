import React, { useState } from "react";
import "../../styles/header.css";
import { withRouter } from "react-router-dom";
import Modal from "components/partials/Modal";
import { faQuestionCircle } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = ({ background }) => {
  let backgroundColor = "";
  let color = "";
  let logo = "";
  if (background === "color") {
    backgroundColor = "transparent";
    color = "white";
    logo = "./images/Logo blanc V2.svg";
  } else {
    backgroundColor = "white";
    color = "#067F83"; //"black"//""
    logo = "./images/VSGPLogo.JPG";
  }

  const [openHelp, setOpenHelp] = useState(false);
  const [openAbout, setOpenAbout] = useState(false);

  return (
    <header className="flex-item" style={{ backgroundColor: backgroundColor }}>
      <ModalHelp open={openHelp} setOpen={setOpenHelp} />
      <ModalAbout open={openAbout} setOpen={setOpenAbout} />
      <img src={logo} alt="LogoVSGP" />
      <div>
        <div className="indicator" onClick={() => setOpenHelp(true)}>
          <span className="indicator-tooltip">
            <FontAwesomeIcon icon={faQuestionCircle} />
          </span>
          Aide
        </div>
        <div className="indicator" onClick={() => setOpenAbout(true)}>
          <span className="indicator-tooltip">
            <FontAwesomeIcon icon={faQuestionCircle} />
          </span>
          A propos
        </div>
      </div>
    </header>
  );
};

const ModalHelp = ({ open, setOpen }) => {
  return (
    <Modal
      isOpen={open}
      closeModal={() => setOpen(false)}
      children={
        <div id="intro-vsgp">
          <h3>Aide</h3>
          <p>
            <b>
              Imaginez le futur de votre territoire grâce à l’évolution des mesures prises dans les
              différents secteurs d’actions
            </b>{" "}
            (des bâtiments, de l’énergie, des transports, de l’industrie ou encore des énergies
            renouvelables).
          </p>
          <p>
            <b>En déplaçant les curseurs, vous visualiserez</b> les effets sur le territoire à
            horizon 2030 pour tester votre niveau d’ambition par rapport aux objectifs potentiels
            pour le PCAET de Vallée Sud – Grand Paris. Il s’agit d’un véritable{" "}
            <b>simulateur climat</b>, permettant de visualiser les efforts à réaliser pour agir
            contre le réchauffement climatique.
          </p>
          <ol>
            <li>
              Dans un premier temps, nous vous invitons à{" "}
              <b>prendre connaissance des différents paramètres modifiables</b> des 5 secteurs
              d’actions. Pour une meilleure compréhension, cliquez sur (?) si vous avez besoin de
              précisions.{" "}
            </li>
            <li>
              Puis, réalisez votre scenario en{" "}
              <b>déplaçant les curseurs des différents paramètres d’actions</b> pour que{" "}
              <b>les indicateurs d’impacts apparaissent en vert.</b> Cela signifiera que les
              objectifs ont été atteints.{" "}
            </li>
            <li>
              Enfin, cliquez sur <b>« découvrir mes résultats »</b> afin de prendre connaissance des
              impacts de votre scenario de manière plus détaillée.{" "}
            </li>
          </ol>
        </div>
      }
    ></Modal>
  );
};

const ModalAbout = ({ open, setOpen }) => {
  return (
    <Modal
      isOpen={open}
      closeModal={() => setOpen(false)}
      children={
        <div id="intro-vsgp">
          <h3>A propos</h3>
          <p>
            <b>Equipe</b>
            <br />
            Le modèle de calcul a été développé par{" "}
            <a href="https://www.bl-evolution.com/" target="_blank">
              BL Evolution
            </a>
            .<br />
            L'outil web a été développé par Pascal Besson, fondateur de <a href="https://bleumatin.fr" target="_blank">Bleu Matin</a>, et Franck
            Marmier.
            <br />
          </p>
          <p>
            <b>Licence</b>
            <br />
            This program is free software: you can redistribute it and/or modify it under the terms
            of the GNU Affero General Public License as published by the Free Software Foundation,
            either version 3 of the License, or (at your option) any later version. This program is
            distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even
            the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
            Affero General Public License for more details.
          </p>
        </div>
      }
    ></Modal>
  );
};

export default withRouter(Header);
