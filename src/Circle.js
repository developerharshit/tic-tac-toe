import React from 'react'

const circle = (props) => {
    const getStyle = () => {
        if (props.isWinner === true) return { borderColor: 'grey', transform: 'scale(0.7)' }
        else return null;
    }
    return (
        <div className="o" style={getStyle()}></div>
    )
}

export default circle
