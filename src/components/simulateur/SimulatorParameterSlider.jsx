import React, { useState, useEffect } from "react";

import { makeStyles, withStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import { faQuestionCircle } from "@fortawesome/free-regular-svg-icons";
import { faMinusSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Slider from "@material-ui/core/Slider";
import SimulatorInformationBox from "components/simulateur/SimulatorInformationBox";
// import SimulatorSlider from "components/simulateur/SimulatorSlider";
import SimulatorIcon from "components/simulateur/SimulatorIcon";
import "styles/simParametreSlide.css";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  margin: {
    height: 0,
  },
}));

const SimulatorTooltip = withStyles({
  tooltip: {
    color: "white",
    fontSize: "1.1em",
  },
})(Tooltip);

function ValueLabelComponent(props) {
  const { children, open, value, backgroundColor } = props;

  const useToolTipStyles = makeStyles((theme) => ({
    tooltip: {
      backgroundColor,
    },
    arrow: {
      color: backgroundColor,
    },
  }));

  const classes = useToolTipStyles();

  return (
    <SimulatorTooltip
      open={open}
      enterTouchDelay={0}
      classes={classes}
      placement="top"
      title={value}
      arrow
    >
      {children}
    </SimulatorTooltip>
  );
}

const SimParametreSlide = ({ data, value, setOneValue, cat }) => {

  console.log(data)

  const [componentClass, setComponentClass] = useState("");

  const SimulatorSlider = withStyles({
    root: {
      color: "#E4E4E4",
      height: 8,
    },
    thumb: {
      height: 16,
      width: 16,
      borderRadius: 0,
      border: `2px solid white`,
      backgroundColor: cat.colorHover,
      marginTop: -5,
      marginLeft: -7,
      "&:focus,&:hover,&$active": {
        boxShadow: "inherit",
      },
    },
    active: {},
    valueLabel: {},
    track: {
      height: 5,
      borderRadius: 1,
      color: "#C7C7C7",
    },
    rail: {
      height: 5,
      borderRadius: 1,
    },
    mark: {
      backgroundColor: '#C7C7C7',
      height: 12,
      width: 3,
      marginTop: -2.5,
    },
  })(Slider);

  useEffect(() => {
    if (data.expert) {
      setComponentClass("mode-expert param-container-normal");
    } else setComponentClass("param-container-normal");
  }, [data.expert]);

  const unit = data.unit;
  const sliderStep = data.step; //(data.max-data.min)/100
  const classes = useStyles();
  const expanded = componentClass.includes("expanded");

  const marks = [
    {
      value: data.min,
      label: `${data.min}${data.unit}`,
    },
    {
      value: data.value
    },
    {
      value: data.max,
      label: `${data.max}${data.unit}`,
    },
  ];

  const handleChange = (event, val) => {
    setOneValue(val, data.index);
  };

  function toggleClass() {
    var componentClassSt = "";
    if (data.expert) componentClassSt += "mode-expert";
    if (componentClass.includes("param-container-normal")) {
      setComponentClass(componentClassSt + " param-container-expanded");
    } else {
      setComponentClass(componentClassSt + " param-container-normal");
    }
  }

  function handleValue() {
    if (unit === "%") {
      return Math.round(value);
    } else {
      return value[0];
    }
  }

  return (
    <div className={componentClass}>
      <div className="param-header flex-item nomarge nopad">
        <h6 className="param-name nomarge">{data.name}</h6>

        <button className="see-more-btn icon-box nomarge nopad" onClick={toggleClass}>
          {!expanded && <FontAwesomeIcon icon={faQuestionCircle} />}
          {expanded && <FontAwesomeIcon icon={faMinusSquare} />}
        </button>
      </div>
      {data.description && <p className="small-param-desc">{data.description}</p>}

      <div className={classes.root}>
        <div className={classes.margin} />
        <SimulatorSlider
          defaultValue={handleValue()}
          aria-labelledby="discrete-slider-always"
          min={data.min}
          max={data.max}
          step={sliderStep}
          marks={marks}
          scale={(x) => x + data.unit}
          ValueLabelComponent={(props) => (
            <ValueLabelComponent {...props} backgroundColor={cat.colorHover} />
          )}
          valueLabelDisplay="auto"
          onChangeCommitted={handleChange}
          track="normal"
        />
      </div>

      {expanded && <SimulatorInformationBox style={{ backgroundColor: "#E5EAEC" }} data={data} />}
    </div>
  );
};

export default SimParametreSlide;
