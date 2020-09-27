import React, {useState} from "react";
import "../../styles/header.css";
import { withRouter } from "react-router-dom";
import Modal from 'components/partials/Modal';
import { faQuestionCircle } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = ({ background }) => {

  let backgroundColor = ""
  let color = ""
  let logo = ""
  if (background==="color") {
    backgroundColor = "transparent"
    color = "white"
    logo = "./images/Logo blanc V2.svg"
  }
  else {
    backgroundColor = "white"
    color = "#067F83" //"black"//""
    logo = "./images/VSGPLogo.JPG"
  }

  const [open, setOpen] = useState(false);
  
  return (
    <header className="flex-item" style={{backgroundColor:backgroundColor}}>
      <Modal 
        isOpen={open}
        closeModal={()=>setOpen(false)}
        children={
          <div id="intro-vsgp">
          <h3>Aide</h3>
          <p><b>Imaginez le futur de votre territoire grâce à l’évolution des mesures prises dans les différents secteurs d’actions</b> (des bâtiments, de l’énergie, des transports, de l’industrie ou encore des énergies renouvelables).</p>
          <p><b>En déplaçant les curseurs, vous visualiserez</b> les effets sur le territoire à horizon 2030 pour tester votre niveau d’ambition par rapport aux objectifs potentiels pour le PCAET de Vallée Sud – Grand Paris. Il s’agit d’un véritable <b>simulateur climat</b>, permettant de visualiser les efforts à réaliser pour agir contre le réchauffement climatique.</p>
          <ol>
            <li>Dans un premier temps, nous vous invitons à <b>prendre connaissance des différents paramètres modifiables</b> des 5 secteurs d’actions. Pour une meilleure compréhension, cliquez sur (?) si vous avez besoin de précisions. </li>
            <li>Puis, réalisez votre scenario en <b>déplaçant les curseurs des différents paramètres d’actions</b> pour que <b>les indicateurs d’impacts apparaissent en vert.</b> Cela signifiera que les objectifs ont été atteints. </li>
            <li>Enfin, cliquez sur <b>« découvrir mes résultats »</b> afin de prendre connaissance des impacts de votre scenario de manière plus détaillée.  </li>
          </ol>
          </div> 
        }>
      </Modal>
      <img src={logo} alt="LogoVSGP"/>
      {/* <a style={{color:color}}>VERSION BETA / CONFIDENTIEL</a> */}
      <a href="http://mission-climat.io" style={{color:color}}>mission climat - simulateur de scénario climat</a>
      <div className="indicator" onClick={()=>setOpen(true)}>
        <span className="indicator-tooltip">
            <FontAwesomeIcon icon={faQuestionCircle} />
        </span>Aide</div>
    </header>
  );
};

export default withRouter(Header);
