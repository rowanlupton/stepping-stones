import React, { Component } from 'react';
import './App.css';

function Box (props) {
    return  <div className="Box">
              <div className="score">{props.score}</div>
              <div className="bid">{props.bid}</div>
              <div className="tricks-taken">{props.tricksTaken}</div>
              <div className="difference">{props.difference}</div>
            </div>;
}
Box.defaultProps = {
    score: 0,
    bid: null,
    tricksTaken: null,
    difference: null
}

function Row (props) {
  const {dealer,trump,cardsNumber,numberOfPlayers} = props
  return  <div className="Row">
            <div className="round-information">
              <div className="dealer">{dealer}</div>
              <div className="trump">{trump}</div>
              <div className="cards-number">{cardsNumber}</div>
            </div>

            {[...Array(numberOfPlayers)].map((player,i) =>
              <Box key={i} />
            )}
          </div>
}
Row.defaultProps = {
  dealer: null,
  trump: null,
  cardsNumber: null
}

class Board extends Component {
  constructor (props) {
    super(props)
    this.state = {...props}

    let iterator = [...Array(this.state.startingNumber)];
    let roundNumbers = [];
    for (let i = iterator.length; i >= 2; i--) {
        roundNumbers.push(i);
    }

    this.state.roundNumbers = roundNumbers.concat([...roundNumbers].reverse());
    if (this.state.toggleRoundOfOne) {
      this.state.roundNumbers.splice(this.state.startingNumber - 1,0,1)
    }
  }

  render () {
    const {roundNumbers, numberOfPlayers} = this.state
    return (
      <div id="board">
        {roundNumbers.map((x,i) =>
          <Row key={i} rowKey={i} cardsNumber={x} numberOfPlayers={numberOfPlayers} />
        )}
        hi
      </div>
    )
  }
}

class Settings extends Component {
  constructor(props) {
    super(props)
    // this.state = {...props}

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
      numberOfPlayers,
      startingNumber,
      toggleRoundOfOne
    } = this.props
    return  <form onSubmit={this.handleSubmit} className="Settings">
              <label>Number of Players:
                <input
                  type="number"
                  name="numberOfPlayers"
                  onChange={this.handleChange}
                  value={numberOfPlayers} />
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

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      settings: false,
      numberOfPlayers: 4,
      startingNumber: 7,
      toggleRoundOfOne: false,
      players: []
    }
    this.updateSettings = this.updateSettings.bind(this)
    this.applySettings = this.applySettings.bind(this)
  }
  updateSettings (event) {
    const t = event.target
    // not using the ~~fancy~~ syntax here for consistency with `value`
    const name = t.name
    const value = t.type === 'checkbox' ? t.checked : Number(t.value)

    this.setState({[name]: value});
  }
  applySettings (event) {
    this.setState((settings) => ({settings: true}))
  }

  render () {
    const {settings} = this.state
    return (
      <div className="App">
        <header className="App-header">
            <h1 className="App-title">Stepping Stones Scoring</h1>
        </header>
        {!settings ? (
          <Settings
            {...this.state}
            updateSettings={this.updateSettings}
            applySettings={this.applySettings}/>
        ) : (
          <Board {...this.state}/>
        ) }
      </div>
    )
  }
}

export default App;
