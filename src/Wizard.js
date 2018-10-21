import React, { Component } from 'react';

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
      startingNumberOfCards,
      toggleRoundOfOne,
      players
    } = this.props
    console.log(players)
    let nameFields = players.map((player,i) =>
      <input
        type="text"
        name="playerName"
        value={(player) ? player.name : ""}
        onChange={this.handleChange}
        key={i}
        data-index={i} />
    )

    return  (
      <form onSubmit={this.handleSubmit} className="Settings">
        <label>Number of Players:
          <input
            type="number"
            name="numberOfPlayers"
            onChange={this.handleChange}
            value={players.length} />
        </label>
        <fieldset>
          <legend>Player names:</legend>
          {nameFields}
        </fieldset>
        <label>Starting number:
          <input
            type="number"
            name="startingNumberOfCards"
            onChange={this.handleChange}
            value={startingNumberOfCards} />
        </label>
        <label>Play the round of one?
          <input
            type="checkbox"
            name="toggleRoundOfOne"
            onChange={this.handleChange}
            value={toggleRoundOfOne} />
        </label>
        <label> Start
          <input
            type="submit"
            name="submit" />
        </label>
      </form>
    )
  }
}

class WizardGameplay extends Component {
  constructor (props) {
    super(props)
  }

  handleSubmit (event) {

  }

  render () {
    return (
      <form onSubmit={this.handleSubmit} className="WizardGameplay">
        hi
      </form>
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
  }

  render () {
    if (!this.props.toggleStartGame) {
      return (
        <div id="wizard">
          <WizardSettings
            players               = {this.props.players}
            updateSettings        = {this.props.updateSettings}
            applySettings         = {this.props.applySettings}
            startingNumberOfCards = {this.props.startingNumberOfCards}
          />
        </div>
      )
    } else {
      return (
        <WizardGameplay
          players                 = {this.props.players}
          currentNumberOfCards    = {this.props.currentNumberOfCards}
        />
      )
    }
  }
}

export default Wizard;
