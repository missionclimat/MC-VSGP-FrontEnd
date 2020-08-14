import React from 'react'
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import SimulatorInformationBox from "components/simulateur/SimulatorInformationBox";
import { faQuestionCircle } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const LightTooltip = withStyles((theme) => ({
    tooltip: {
      backgroundColor: theme.palette.common.white,
      color: 'rgba(0, 0, 0, 0.87)',
      boxShadow: theme.shadows[1],
      fontSize: 11,
    },
  }))(Tooltip);

const ResultsIndicator = ({indicator, type, backgroundColor, color, width}) => {

    
    
    return (
        
        <div className="indicator" style={{ width: width }}>

            <p className="results-title">{indicator.name}</p>
            
            <div className="results-figure flex-item" style={{ backgroundColor: backgroundColor, color: color }}>
                {indicator.value}{indicator.unit}   
                <LightTooltip title={indicator.infos}>
                    <span className="indicator-tooltip">
                        <FontAwesomeIcon icon={faQuestionCircle} />
                    </span>
                </LightTooltip>
            </div>

        </div>
    )
}

export default ResultsIndicator
