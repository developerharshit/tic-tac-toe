import React from 'react'

const cross = (props) => {
    const getStyle = () => {
        if (props.isWinner === true) return { backgroundColor: 'grey', transform: 'scale(0.7)', top: '30px' }
        else return null;
    }
    return (
        <div className="x" style={getStyle()} ></div>
    )
}

export default cross
