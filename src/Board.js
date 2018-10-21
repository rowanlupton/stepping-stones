import React, { Component } from 'react';

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
    this.state = {}
    let trumps = ["spades","hearts","diamonds","clubs","no trumps"]
    this.state.trump = "\u00A0"
  }

  render () {
    const {roundNumberOfCards, dealer, players} = this.props
    return (
      <div className="Row">
        <div className="round-information">
          <div className="round-number">
            round of {roundNumberOfCards}
          </div>
          <div className="dealer">
            {players[dealer].name} to deal
          </div>
          <div className="trump" data-trump={this.state.trump}>
            {this.state.trump}
          </div>
        </div>

        {players.map((player,i) =>
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
    const {startingNumberOfCards, roundOfOne} = props
    this.state.roundIndex = 0

    let iterator = [...Array(this.props.startingNumberOfCards)]
    let roundNumbersOfCards = []
    // i >= 2 because we want to leave off the round of 1 by default
    for (let i = iterator.length; i >= 2; i--) {
      roundNumbersOfCards.push(i);
    }
    this.state.roundNumbersOfCards = roundNumbersOfCards.concat([...roundNumbersOfCards].reverse())
    if (roundOfOne)
      this.state.roundNumbersOfCards.splice(startingNumberOfCards-1, 0, 1)

    this.state.roundList = []

    this.addRound = this.addRound.bind(this)
  }
  componentDidUpdate (prevProps) {
    if (this.props.startingNumberOfCards !== prevProps.startingNumberOfCards) {
      const {startingNumberOfCards, roundOfOne} = this.props
      this.setState({roundIndex: 0})

      let iterator = [...Array(this.props.startingNumberOfCards)]
      let roundNumbersOfCards = []
      // i >= 2 because we want to leave off the round of 1 by default
      for (let i = iterator.length; i >= 2; i--) {
        roundNumbersOfCards.push(i);
      }
      roundNumbersOfCards = roundNumbersOfCards.concat([...roundNumbersOfCards].reverse())
      this.setState({
        roundNumbersOfCards: roundNumbersOfCards
      })

      if (roundOfOne) {
        let newArray = roundNumbersOfCards.slice()
        newArray.splice(startingNumberOfCards-1, 0, 1)
        this.setState({roundNumbersOfCards: newArray})
      }
    }
  }
  addRound () {
    this.boardElement = document.querySelector('#board')
    this.setState({roundIndex: (this.state.roundIndex+1)})

    let newRound = (
      <Round
        key = {this.state.roundIndex}
        roundNumberOfCards = {this.state.roundNumbersOfCards[this.state.roundIndex]}
        players = {this.props.players}
        dealer = {(this.state.roundIndex) % this.props.players.length}
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

export default Board;
