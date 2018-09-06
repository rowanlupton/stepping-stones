import React, { Component } from 'react';
import './App.css';

const NAME = 'Rowan';

function Box (props) {
    return <div className="Box">
        <div className="score">0</div>
        <div className="bid">null</div>
        <div className="tricks-taken">null</div>
        <div className="difference">null</div>
    </div>;
}
Box.defaultProps = {
    what: 'box'
}

function Row (props) {
    return <div className="Row">
        <div className="round-information">
            <div className="dealer">Dealer</div>
        <div className="trump" data-trump="heart">&#9829;</div>
        <div className="cards-number">{props.cardsNumber}</div>        
        </div>
        
        <Box />
        <Box />
        <Box />
    </div>;
}

class App extends Component {
    render() {
        const startingNumber = 7;
        let iterator = [...Array(startingNumber)];
        let roundNumbers = [];
        for (let i = iterator.length; i >= 2; i--) {
            roundNumbers.push(i);
        }
        roundNumbers = roundNumbers.concat([...roundNumbers].reverse());
        // don't add the round of one
        //roundNumbers.splice(startingNumber-1,0,1);        
        
    return (
      <div className="App">
        <header className="App-header">
            <h1 className="App-title">Stepping Stones Scoring</h1>
        </header>
        <p className="App-intro">
            hi there, {NAME}
        </p>
        <div id="board">
            {roundNumbers.map((x,i) =>
                                <Row key={i} cardsNumber={x} />
                               )}
        </div>
      </div>
    );
  }
}

export default App;
