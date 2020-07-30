import React from "react";
import NavMain from "./NavMain";
import { Link } from "react-router-dom";
import "../../styles/header.css";
import { withRouter } from "react-router-dom";

const Header = ({ location }) => {

  return (
    <header className="flex-item">
      <img src="./images/VSGPLogo.JPG" alt="LogoVSGP"/>
      <a href="mission-climat.io">mission climat - simulateur de scénario climat</a>
    </header>
  );
};

export default withRouter(Header);
