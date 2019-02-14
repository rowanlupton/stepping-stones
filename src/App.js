import React, { Component } from 'react'
import Board from './Board.js'
import Wizard from './Wizard.js'
import './App.css'

class Player {
  constructor (props) {
    this.name   = (props) ? props.name : ""
    this.rounds = [
      // {bid: b, tricksTaken: t}
    ]
  }

  updateScore (difference) {
    this.score += difference
  }
}

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      players: [...Array(4)].map((i) => {return new Player()}),
      startingNumberOfCards: 7,
      currentNumberOfCards: 7,
      toggleRoundOfOne: false,
      toggleStartGame: false
    }

    this.updateSettings = this.updateSettings.bind(this)
    this.applySettings = this.applySettings.bind(this)
    this.setRoundOfOne = this.setRoundOfOne.bind(this)
  }

  updateSettings (event) {
    const t = event.target
    let value = t.value
    let players = [...this.state.players]
    switch (t.name) {
      case 'numberOfPlayers':
        value = Number(value)

        if (value > this.state.players.length) {
          [...Array(value - this.state.players.length)].map((i) => {
            players = players.concat(new Player())
            return true
          })
        } else if (value < this.state.players.length) {
          [...Array(this.state.players.length - value)].map((i) => {
            players = players.slice(0,-1)
            return true
          })
        }
        this.setState({players: players})
        break
      case 'startingNumberOfCards':
      case 'toggleRoundOfOne':
        value = (t.type === 'checkbox') ? t.checked : Number(value)
        const name = t.name
        this.setState({[name]: value})
        break
      case 'playerName':
        console.log(new Player({name: t.value}))
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
  updatePlayerArrays (event) {

  }
  applySettings (event) {
    this.setState({toggleStartGame: true})
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
          players               = {this.state.players}
          startingNumberOfCards = {this.state.startingNumberOfCards}
          currentNumberOfCards  = {this.state.currentNumberOfCards}
          applySettings         = {this.applySettings}
          updateSettings        = {this.updateSettings}
          toggleStartGame       = {this.state.toggleStartGame}
        />
        <Board
          startingNumberOfCards = {this.state.startingNumberOfCards}
          toggleRoundOfOne      = {this.state.toggleRoundOfOne}
          players               = {this.state.players}
          setRoundOfOne         = {this.setRoundOfOne}
        />
      </div>
    )
  }
}

export default App
