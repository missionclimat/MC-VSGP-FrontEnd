import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { Checkbox } from "@material-ui/core";
import { CheckboxOutlinedEmpty, CheckboxOutlinedFull } from "components/Checkbox";
import SimulatorIcon from "components/simulateur/SimulatorIcon";
import "styles/OptionsBox.css";

const OptionsBox = ({ hideOptions, modeExpert, handleInitValues, handleModeExpert }) => {
  const PurpleSwitch = withStyles({
    switchBase: {
      color: "grey",
      borderRadius: 0,
      "&$checked": {
        color: "#512072",
      },
      "&$checked + $track": {
        backgroundColor: "#00ADB9",
      },
    },
    checked: {},
    track: {
      borderRadius: "2px",
    },
  })(Switch);

  return (
    <div id="OptionsBox">
      <div onClick={hideOptions}>
        <SimulatorIcon icon="Cross" color="black" />
      </div>

      <h4 className="sim-categorie-name">Options</h4>

      <h6 className="param-name">Initialisation des paramètres</h6>
      <p>
        Afin de gagner du temps, vous pouvez initialiser l'ensemble des données à des valeurs
        spécifiques
      </p>
      {/* TODO Remove after testing */}
      <form className="sim-option-form flex-item">
        {/* <form className="sim-option-form flex-item" onChange={(e) => handleInitValues(e)}> */}

        <Checkbox
          value="bau"
          icon={<CheckboxOutlinedEmpty />}
          checkedIcon={<CheckboxOutlinedFull />}
        />
        <label>Business as usual</label>
        <Checkbox
          value="1degre5"
          icon={<CheckboxOutlinedEmpty />}
          checkedIcon={<CheckboxOutlinedFull />}
        />
        <label>Valeurs 2020</label>
        <Checkbox
          value="init"
          icon={<CheckboxOutlinedEmpty />}
          checkedIcon={<CheckboxOutlinedFull />}
        />
        <label>Reco 2030</label>
      </form>

      <h6 className="param-name">Mode Expert</h6>
      <p>
        Le mode expert permet d'accéder à un plus grand nombre de paramètres, pour régler son
        scénario avec davantage de finesse
      </p>
      <FormControlLabel
        className="nomarge nopad"
        onChange={(e) => handleModeExpert(e.target.checked)}
        control={
          <PurpleSwitch icon={<CheckboxOutlinedEmpty />} checkedIcon={<CheckboxOutlinedFull />} />
        }
        label="Activer"
        checked={modeExpert}
      />
    </div>
  );
};

export default OptionsBox;
