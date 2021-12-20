import React from 'react';
import './Game.css';

function Square(props) {
  //console.log(props);
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    //console.log(this.props);
    return <Square value={this.props.squares[i]} onClick={() => this.props.onClick(i)}/>;
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

function Moves(props){
  //console.log(props);
  return props.history.map((move, index) => {
    console.log(move);
    <li key={index}>
      <button> 'Ah'</button>
    </li>
  }).join('');
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null)
        }
      ],
      player1: true.value,
      steps: 0
    };
    //console.log(this.state);
  }

  handleClick(i) {
    const squares = this.state.history.slice(-1)[0].squares;
    //console.log(squares);
    const winner = calculateWinner(squares);
    if (winner !== null) return;
    //console.log(squares[i]);
    if (squares[i] !== null) return;
    squares[i] = this.state.player1 ? 'X' : 'O';
    //console.log('Squares' + squares);
    //console.log(this.state);
    this.setState(state => ({
      history: state.history.concat([{squares}]),
      player1: !state.player1,
      steps: state.steps + 1
    }));
    //console.log(this.state.history);
    // this.setState(
    // {
    //   history: this.state.history.concat([{squares}]),
    //   player1: !this.state.player1,
    // })
  }

  render() {
    //console.log(this.state.history.slice(-1)[0].squares);
    //console.log(this.state.history.slice(-1)[0]);
    let status = '';
    const winner = calculateWinner(this.state.history.slice(-1)[0].squares);
    if (winner !== null) status = 'Winner: ' + winner;
    else status = `Next player: ${this.state.player1 ? 'X' : 'O'}`;
    return (
      <div className="game">
        <div className="game-board">
          <Board squares={this.state.history.slice(-1)[0].squares}
          onClick={i => this.handleClick(i)}/>
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>
            <Moves history={this.state.history}/>
          </ol>
        </div>
      </div>
    );
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default Game;