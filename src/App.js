import React, { Component } from 'react';
import ReactDOM from 'react-dom';
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
    this.state.trump = trumps[Math.floor(Math.random()*5)]
  }

  render () {
    console.log(this.state.players)
    console.log(this.state.dealer)
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
        <button onClick={this.state.drawRound} />
      </div>
    )
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
  }
  handleSubmit(e) {
    e.preventDefault()
    document.querySelector('#roundWizard label').innerText = "hello"
  }
  render () {
    return (
      <form onSubmit={this.handleSubmit} className="Wizard" id="roundWizard">
        <label>label text</label>
        <input type="number" />
        <input type="submit" />
      </form>
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

    this.drawRound = this.drawRound.bind(this)
  }

  drawRound () {
    this.boardElement = document.querySelector('#board')
    this.setState({roundIndex: (this.state.roundIndex+1)})
    ReactDOM.render (
      <Round
        key = {this.state.roundIndex}
        roundNumberOfCards = {this.state.roundNumbersOfCards[this.state.roundIndex]}
        players = {this.state.players}
        dealer = {(this.state.roundIndex) % this.state.players.length}
        drawRound = {this.drawRound}
      />,
      this.boardElement
    )
  }

  render () {
    return (
      <div id="board">

        <button onClick={this.drawRound} />
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
      players: [new Player({name: "rowan"}), new Player({name: "nicki"}), new Player({name: "lynda"})],
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
        <Wizard />
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
