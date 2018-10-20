import React, { Component } from 'react';
import './App.css';

class Box extends Component {
  constructor (props) {
    super(props)
    this.state = {...props}
  }

  render () {
    return (
      <div className="Box">
        <div className="score">{this.state.player.score}</div>
      </div>
    )
  }
}

class Round extends Component {
  constructor (props) {
    super(props)
    this.state = {...props}
    let trumps = ["spades","hearts","diamonds","clubs","no trumps"]
    this.state.trump = "\u00A0"
  }

  render () {
    return (
      <div className="Row">
        <div className="round-information">
          <div className="round-number">
            round of {this.state.roundNumberOfCards}
          </div>
          <div className="dealer">
            {this.state.players[this.state.dealer].name} to deal
          </div>
          <div className="trump" data-trump={this.state.trump}>
            {this.state.trump}
          </div>
        </div>

        {this.state.players.map((player,i) =>
          <Box
            key = {i}
            player = {player}
          />
        )}
      </div>
    )
  }
}

class WizardSettings extends Component {
  constructor(props) {
    super(props)
    this.state = {...props}

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange (event) {
    this.props.updateSettings(event)
  }
  handleSubmit (event) {
    event.preventDefault()
    this.props.applySettings(event)
  }
  render () {
    const {
      startingNumber,
      toggleRoundOfOne
    } = this.props

    let nameFields = this.state.players.map((player,i) =>
      <input
        type="text"
        value={this.state.players[i].name}
        onChange={this.handleChange}
        key={i}
        data-index={i} />
    )

    return  <form onSubmit={this.handleSubmit} className="Settings">
              <label>Number of Players:
                <input
                  type="number"
                  name="numberOfPlayers"
                  onChange={this.handleChange}
                  value={this.state.players.length} />
              </label>
              <label>Player names:
              {nameFields}
              </label>
              <label>Starting number:
                <input
                  type="number"
                  name="startingNumber"
                  onChange={this.handleChange}
                  value={startingNumber} />
              </label>
              <label> Play the round of one?
                <input type="checkbox"
                  name="toggleRoundOfOne"
                  onChange={this.handleChange}
                  value={toggleRoundOfOne} />
              </label>
              <label> Start
                <input type="submit" />
              </label>
            </form>
          }
}

class Wizard extends Component {
  // placeholder for the bit of code that prompts for round info (e.g. bids,
  // tricks taken, etc)

  // one Wizard will be in place for every round in a game.
  // in time, there should be ability to move backward and edit previous entries

  // takes props:
  //   roundIndex
  //   players
  constructor (props) {
    super(props)
    this.state = {...props}

    this.updateSettings = this.updateSettings.bind(this)
    this.applySettings = this.applySettings.bind(this)
  }
  handleSubmit(e) {
    e.preventDefault()
    document.querySelector('#roundWizard label').innerText = "hello"
  }

  updateSettings (event) {
    const t = event.target
    // not using the ~~fancy~~ syntax here for consistency with `value`
    const name = t.name
    const value = t.type === 'checkbox' ? t.checked : Number(t.value)

    if (t.type === 'text') {
      let players = this.state.players
      players[t.dataset.index] = {'name': t.value}
      this.setState({players: players})
    } else {
      this.setState({[name]: value});
    }
  }
  applySettings (event) {
    this.setState((settings) => ({settings: true}))
  }

  render () {
    return (
      <div id="wizard">
        <WizardSettings
          players = {this.state.players}
          updateSettings={this.updateSettings}
          applySettings={this.applySettings}
        />
      </div>
    )
  }
}

class Board extends Component {
  constructor (props) {
    super(props)
    this.state = {...props}
    this.state.roundIndex = 0

    let iterator = [...Array(this.state.startingNumberOfCards)]
    let roundNumbersOfCards = []
    // i >= 2 because we want to leave off the round of 1 by default
    for (let i = iterator.length; i >= 2; i--) {
      roundNumbersOfCards.push(i);
    }
    this.state.roundNumbersOfCards = roundNumbersOfCards.concat([...roundNumbersOfCards].reverse())
    if (this.state.roundOfOne)
      this.state.roundNumbersOfCards.splice(this.state.startingNumberOfCards-1, 0, 1)

    this.state.roundList = []

    this.addRound = this.addRound.bind(this)
  }

  addRound () {
    this.boardElement = document.querySelector('#board')
    this.setState({roundIndex: (this.state.roundIndex+1)})

    let newRound = (
      <Round
        key = {this.state.roundIndex}
        roundNumberOfCards = {this.state.roundNumbersOfCards[this.state.roundIndex]}
        players = {this.state.players}
        dealer = {(this.state.roundIndex) % this.state.players.length}
      />
    )

    this.setState({roundList: [...this.state.roundList, newRound]})
  }

  render () {
    return (
      <div id="board">
        {this.state.roundList}
        <button onClick={this.addRound} />
      </div>
    )
  }
}

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
      players: [new Player({name: "rowan"}), new Player({name: "robert"}), new Player({name: "helen"}), new Player({name: "lynda"})],
      startingNumberOfCards: 7,
      roundOfOne: true
    }
  }

  render () {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Stepping Stones Scoring</h1>
        </header>
        <Wizard
          players = {this.state.players}
        />
        <Board
          startingNumberOfCards = {this.state.startingNumberOfCards}
          roundOfOne = {this.state.roundOfOne}
          players = {this.state.players}
        />
      </div>
    )
  }
}

export default App;
