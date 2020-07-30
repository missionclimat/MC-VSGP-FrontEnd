import React from 'react'

const Title = ({id, title}) => {
    return (
        <div id={id} className="title">
            <h1>{title}</h1>
        </div>
    )
}

export default Title
