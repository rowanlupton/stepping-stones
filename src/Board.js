import React, { Component } from 'react';

class Box extends Component {
  constructor (props) {
    super(props)
    this.state = {...props}
  }

  render () {
    return (
      <div className="Box">
        []
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
    if (this.props.startingNumberOfCards !== prevProps.startingNumberOfCards
        || this.props.toggleRoundOfOne !== prevProps.toggleRoundOfOne) {
      const {startingNumberOfCards, toggleRoundOfOne} = this.props
      this.setState({roundIndex: 0})

      let iterator = [...Array(Number(this.props.startingNumberOfCards))]
      let roundNumbersOfCards = []
      // i >= 2 because we want to leave off the round of 1 by default
      for (let i = iterator.length; i >= 2; i--) {
        roundNumbersOfCards.push(i);
      }

      if (!toggleRoundOfOne) {
        // double destructured because otherwise reverse() does both of them
        // https://vignette.wikia.nocookie.net/steven-universe/images/e/ec/SU_-_Arcade_Mania_Double_Dogs%21.png
        roundNumbersOfCards = [ ...roundNumbersOfCards,
                                ...[...roundNumbersOfCards].reverse()]
      } else {
        roundNumbersOfCards = [ ...roundNumbersOfCards,
                                1,
                                ...[...roundNumbersOfCards].reverse()]
      }
      this.setState({roundNumbersOfCards: roundNumbersOfCards})
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
