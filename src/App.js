import React, { Component } from 'react'
import Board from './Board'
import Header from './Header'
import './styles.css'


export class App extends Component {
    render() {
        return (
            <div className='main'>
                <Header />
                <Board />
            </div>
        )
    }
}

export default App
