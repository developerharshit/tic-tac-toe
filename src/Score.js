import React, { Component } from 'react'

class Score extends Component {

    render() {
        return (
            <div className="scores">
                <p className="player1">
                    <span className="p1">Player</span>
                    (x)
                    <span className="score">{this.props.score1}</span>
                </p>
                <p className="ties">
                    Tie<span className="score">{this.props.scoreT}</span>
                </p>
                <p className="player2">
                    <span className="p1">Computer</span>
                    (o)
                    <span className="score">{this.props.score2}</span>
                </p>
                <p className="reset" onClick={this.props.reset}>
                    <span className="p1">Reset</span>
                    <span className="score">Score</span>
                </p>
            </div>
        )
    }
}

export default Score
