import React, { Component } from 'react'
import Cross from './Cross'
import Circle from './Circle'
import Score from './Score';

class Board extends Component {
    state = {
        square: {},
        disabled: false,
        winners: {},
        score1: 0,
        score2: 0,
        scoreT: 0
    }

    chance = 1;
    player = [];
    system = [];

    componentDidMount() {
        if (this.chance === 2) {
            this.setSystemMove()
        }
    }

    setMove = (id) => {
        if (this.state.square[id] === 1) return <Cross isWinner={this.state.winners[id]} />;
        else if (this.state.square[id] === 2) return <Circle isWinner={this.state.winners[id]} />
        else return null;
    }

    onClickHandler = (id) => {
        // Reset Game
        if (this.state.disabled) {
            this.resetGame()
            return;
        }
        // Check for duplicate moves
        if (this.state.square[id] !== undefined) return;

        // Upadting the move
        const temp = this.state.square;
        temp[id] = this.chance;
        this.setState({ square: temp })

        // next move
        if (this.chance === 1) {
            this.chance = 2;
            this.player.push(id);
            if (this.isWinner(this.player)) {
                let tempScore = this.state.score1;
                console.log('player win');
                this.setState({ disabled: true, score1: tempScore + 1 })
            }
            else if (this.isGameDraw()) {
                let tempScore = this.state.scoreT;
                let temp = {}
                for (let i = 0; i < 10; i++) {
                    temp[i + 1] = true;
                }
                this.setState({ scoreT: tempScore + 1, disabled: true, winners: temp })
            }
            else {
                setTimeout(() => {
                    this.setSystemMove()
                }, 250);
            }
        }
        else {
            this.chance = 1;
            this.system.push(id);
            if (this.isWinner(this.system)) {
                let tempScore = this.state.score2;
                console.log('system win');
                this.setState({ disabled: true, score2: tempScore + 1 })
            }
            else if (this.isGameDraw()) {
                let tempScore = this.state.scoreT;
                let temp = {}
                for (let i = 0; i < 10; i++) {
                    temp[i + 1] = true;
                }
                this.setState({ scoreT: tempScore + 1, disabled: true, winners: temp })
            }
        }
    }

    resetGame = () => {
        this.setState({ square: {}, disabled: false, winners: {} }, () => {
            this.player = [];
            this.system = [];
            if (this.chance === 2) {
                setTimeout(() => {
                    this.setSystemMove()
                }, 250);
            }
        })
    }

    resetCompleteGame = () => {
        this.setState({ square: {}, disabled: false, winners: {}, score1: 0, score2: 0, scoreT: 0 })
        this.player = [];
        this.system = [];
        this.chance = 1;
    }

    setSystemMove = () => {
        let leftChance = [];
        for (let i = 1; i <= 9; i++) {
            if (this.state.square[i] === undefined) {
                leftChance.push(i)
            }
        }

        let ans = Math.floor(Math.random() * (leftChance.length))
        this.onClickHandler(leftChance[ans])
    }

    isGameDraw = () => {
        let leftChance = [];
        for (let i = 1; i <= 9; i++) {
            if (this.state.square[i] === undefined) {
                leftChance.push(i)
            }
        }

        if (leftChance.length === 0) {
            this.setState({ disabled: true })
            console.log("Game is Draw");
            return true;
        }
        return false
    }

    isWinner = (A) => {
        let sum = 15;
        let arr_size = A.length;
        let temp = {};
        for (let i = 0; i < 10; i++) {
            temp[i + 1] = true;
        }
        for (let i = 0; i < arr_size - 2; i++) {
            for (let j = i + 1; j < arr_size - 1; j++) {
                for (let k = j + 1; k < arr_size; k++) {
                    if (A[i] + A[j] + A[k] === sum) {
                        temp[A[i]] = false;
                        temp[A[j]] = false;
                        temp[A[k]] = false;
                        this.setState({ winners: temp })
                        return true;
                    }
                }
            }
        }

        return false;
    }

    render() {
        return (
            <div>
                <div className="board">
                    <div className="square left top" onClick={() => this.onClickHandler(2)}>
                        {this.setMove(2)}
                    </div>
                    <div className="square top" onClick={() => this.onClickHandler(7)}>
                        {this.setMove(7)}
                    </div>
                    <div className="square top right" onClick={() => this.onClickHandler(6)}>
                        {this.setMove(6)}
                    </div>
                    <div className="square left" onClick={() => this.onClickHandler(9)}>
                        {this.setMove(9)}
                    </div>
                    <div className="square" onClick={() => this.onClickHandler(5)}>
                        {this.setMove(5)}
                    </div>
                    <div className="square right" onClick={() => this.onClickHandler(1)}>
                        {this.setMove(1)}
                    </div>
                    <div className="square left bottom" onClick={() => this.onClickHandler(4)}>
                        {this.setMove(4)}
                    </div>
                    <div className="square bottom" onClick={() => this.onClickHandler(3)}>
                        {this.setMove(3)}
                    </div>
                    <div className="square right bottom" onClick={() => this.onClickHandler(8)}>
                        {this.setMove(8)}
                    </div>
                </div>
                <Score reset={this.resetCompleteGame} score1={this.state.score1} score2={this.state.score2} scoreT={this.state.scoreT} />
            </div>
        )
    }
}

export default Board
