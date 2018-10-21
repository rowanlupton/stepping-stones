import React, { Component } from 'react'
import Board from './Board.js'
import Wizard from './Wizard.js'
import './App.css'

class Player {
  constructor (props) {
    this.name = props.name
    this.score = 0
  }

  updateScore (difference) {
    this.score += difference
  }
}

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      numberOfPlayers: 4,
      players: [],
      startingNumberOfCards: 7,
      roundOfOne: true
    }

    this.updateSettings = this.updateSettings.bind(this)
    this.setRoundOfOne = this.setRoundOfOne.bind(this)
  }

  updateSettings (event) {
    const t = event.target

    switch (t.name) {
      case 'numberOfPlayers':
      case 'startingNumberOfCards':
      case 'toggleRoundOfOne':
        const value = t.type === 'checkbox' ? t.checked : Number(t.value)
        const name = t.name
        this.setState({[name]: value})
      case 'playerName':
        let players = this.state.players
        players[t.dataset.index] = new Player({name: t.value})
        this.setState({players: players})
      case 'submit':
        break
    }
  }
  setRoundOfOne (roundOfOne) {
    this.setState({roundOfOne: roundOfOne})
  }

  render () {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Stepping Stones Scoring</h1>
        </header>
        <Wizard
          players={this.state.players}
          startingNumberOfCards={this.state.startingNumberOfCards}
          updateSettings={this.updateSettings}
        />
        <Board
          startingNumberOfCards={this.state.startingNumberOfCards}
          roundOfOne={this.state.roundOfOne}
          numberOfPlayers={this.state.numberOfPlayers}
          players={this.state.players}
          setRoundOfOne={this.setRoundOfOne}
        />
      </div>
    )
  }
}

export default App;
