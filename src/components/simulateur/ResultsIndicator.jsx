import React from 'react'

const ResultsIndicator = ({indicator, type, backgroundColor, color, width}) => {
    
    return (
        <div className="indicator" style={{ width: width }}>

            <p className="results-title">{indicator.name}</p>
            
            <div className="results-figure flex-item" style={{ backgroundColor: backgroundColor, color: color }}>
                {indicator.value}{indicator.unit}
            </div>

        </div> 
    )
}

export default ResultsIndicator
