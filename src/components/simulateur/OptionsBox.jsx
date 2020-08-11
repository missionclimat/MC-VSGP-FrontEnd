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
    root: {
      padding: "5px",
      marginLeft: "10px",
    },
    switchBase: {
      color: "grey",
      borderRadius: 0,
      padding: "10px",
      "&$checked + $track": {
        backgroundColor: "#00ADB9",
      },
    },
    checked: {},
    track: {
      borderRadius: "2px",
    },
    label: {
      margin: 0,
    },
  })(Switch);

  const CustomFormLabel = withStyles({
    labelPlacementStart: {
      margin: 0,
    },
  })(FormControlLabel);

  const CustomCheckBox = withStyles({
    root: {
      padding: 0,
    },
  })(Checkbox);

  return (
    <div id="OptionsBox">
      <div className="close" onClick={hideOptions}>
        <SimulatorIcon icon="Cross" color="black" />
      </div>

      <h4 className="main-title">Options</h4>

      <div>
        <h6 className="param-name">Initialisation des paramètres</h6>
        <p className="description">
          Afin de gagner du temps, vous pouvez initialiser l'ensemble des données à des valeurs
          spécifiques
        </p>

        <form className="sim-option-form flex-item">
          {/* <form className="sim-option-form flex-item" onChange={(e) => handleInitValues(e)}> */}
          <div className="control">
            <CustomCheckBox
              disableRipple
              value="bau"
              icon={<CheckboxOutlinedEmpty />}
              checkedIcon={<CheckboxOutlinedFull />}
            />
            <label>Business as usual</label>
          </div>
          <div className="control">
            <CustomCheckBox
              disableRipple
              value="1degre5"
              icon={<CheckboxOutlinedEmpty />}
              checkedIcon={<CheckboxOutlinedFull />}
            />
            <label>Valeurs 2020</label>
          </div>
          <div className="control">
            <CustomCheckBox
              disableRipple
              value="init"
              icon={<CheckboxOutlinedEmpty />}
              checkedIcon={<CheckboxOutlinedFull />}
            />
            <label>Reco 2030</label>
          </div>
        </form>
      </div>
      <div>
        <h6 className="param-name">Mode Expert</h6>
        <p className="description">
          Le mode expert permet d'accéder à un plus grand nombre de paramètres, pour régler son
          scénario avec davantage de finesse
        </p>
        <CustomFormLabel
          className="nomarge nopad"
          onChange={(e) => handleModeExpert(e.target.checked)}
          control={
            <PurpleSwitch
              disableRipple
              icon={<CheckboxOutlinedEmpty />}
              checkedIcon={<CheckboxOutlinedEmpty />}
            />
          }
          label="Activer"
          labelPlacement="start"
          checked={modeExpert}
        />
      </div>
    </div>
  );
};

export default OptionsBox;
