import React, { Component } from 'react';

class PlayerField extends Component {
  render () {
    const {i, updateSettings, addPlayer, removePlayer} = this.props
    const player = this.props.players[i]
    return (
      <div className="playerName">
        <input
          type="text"
          name="playerName"
          text={(player) ? player.name : ""}
          onChange={updateSettings}
          key={i}
          data-index={i} />
        <input
          type="button"
          name="removePlayer"
          value="-"
          onClick={removePlayer}
          key={i+"-remove"}
          data-index={i} />
        <input
          type="button"
          name="addPlayer"
          value="+"
          onClick={addPlayer}
          key={i+"-add"}
          data-index={i} />
    </div>
    )
  }
}

class WizardSettings extends Component {
  constructor (props) {
    super(props)
    this.addPlayer    = this.addPlayer.bind(this)
    this.removePlayer = this.removePlayer.bind(this)
    this.state = {
      nameFields: [
        <PlayerField
          players         = {this.props.players}
          updateSettings  = {this.props.updateSettings}
          addPlayer       = {this.addPlayer}
          removePlayer    = {this.removePlayer}
          key             = {0}
          i               = {0} />],
      numberOfPlayersEver: 1}

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  addPlayer (event) {
    this.setState({
      nameFields: [
        ...this.state.nameFields,
        <PlayerField
          players         = {this.props.players}
          updateSettings  = {this.props.updateSettings}
          addPlayer       = {this.addPlayer}
          removePlayer    = {this.removePlayer}
          key             = {this.state.nameFields.length}
          i               = {this.state.nameFields.length} />]
    })
  }
  removePlayer (event) {
    const t = event.target
    const i = t.dataset.index
    console.log(t.dataset.index)
    let nameFields = this.state.nameFields
    nameFields = [
      ...nameFields.slice(0,(i)),
      ...nameFields.slice(i+1)]
    console.log(nameFields)
    nameFields.map((nameField) =>
        nameField.props.i = i-1)

    this.setState({
      nameFields: nameFields
    })
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
      toggleRoundOfOne
    } = this.props

    return  (
      <form onSubmit={this.handleSubmit} className="Settings">
        <fieldset>
          <legend>Players:</legend>
          {this.state.nameFields}
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
    event.preventDefault()
    // this.props.applyPrompt(event)
  }

  render () {
    const {currentPlayer, players} = this.props
    const player = players[currentPlayer]
    return (
      <form onSubmit={this.handleSubmit} className="WizardGameplay">
        <fieldset>
          <legend>{player.name}: </legend>
          <input type="number" />
          <input type="submit" />
        </fieldset>
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
    this.state = {currentPlayer: 0}
  }

  render () {
    if (!this.props.toggleStartGame) {
      return (
        <div id="wizard">
          <WizardSettings
            players               = {this.props.players}
            updateSettings        = {this.props.updateSettings}
            applySettings         = {this.props.applySettings}
            addPlayer             = {this.props.addPlayer}
            removePlayer          = {this.props.removePlayer}
            startingNumberOfCards = {this.props.startingNumberOfCards}
          />
        </div>
      )
    } else {
      this.props.players.map((player,i) => {
        this.setState({currentPlayer: i})
        return true
      })
      return (
        <WizardGameplay
          players                 = {this.props.players}
          currentPlayer           = {this.state.currentPlayer}
        />
      )
    }
  }
}

export default Wizard;
