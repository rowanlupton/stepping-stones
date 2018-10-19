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
            round of {this.state.roundNumber}
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

class Board extends Component {
  constructor (props) {
    super(props)
    this.state = {...props}
    this.state.roundIndex = 0

    let iterator = [...Array(this.state.startingNumberOfCards)]
    let roundNumbersOfCards = []
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
    let round = <Round
                  key = {this.state.roundIndex}
                  roundNumberOfCards = {this.state.roundNumbersOfCards[this.state.roundIndex]}
                  players = {this.state.players}
                  dealer = {(this.state.roundIndex) % this.state.players.length}
                />

    ReactDOM.render (
      round,
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
