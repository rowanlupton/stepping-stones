import React, { Component } from 'react'
import Board from './Board.js'
import Wizard from './Wizard.js'
import './App.css'

class Player {
  constructor (props) {
    this.name = (props) ? props.name : ""
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
      players: [...Array(4)].map((i) => {return new Player}),
      startingNumberOfCards: 7,
      roundOfOne: true
    }

    this.updateSettings = this.updateSettings.bind(this)
    this.setRoundOfOne = this.setRoundOfOne.bind(this)
  }

  updateSettings (event) {
    const t = event.target
    let value
    switch (t.name) {
      case 'numberOfPlayers':
        value = Number(t.value)
        if (value > this.state.players.length) {
          value = this.state.players.concat(new Player)
        } else if (value < this.state.players.length) {
          value = this.state.players.slice(0,-1)
        }
        this.setState({players: value})
        break
      case 'startingNumberOfCards':
      case 'toggleRoundOfOne':
        value = (t.type === 'checkbox') ?  t.checked : t.value
        const name = t.name
        this.setState({[name]: value})

        break
      case 'playerName':
        let players = this.state.players
        players[t.dataset.index] = new Player({name: t.value})
        this.setState({players: players})
        break
      case 'submit':
        console.log('submit')
        break
      default:
        console.log('Unrecognized input:'+t.name)
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
          players={this.state.players}
          setRoundOfOne={this.setRoundOfOne}
        />
      </div>
    )
  }
}

export default App
