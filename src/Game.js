import React from 'react';
import './Game.css';

class Square extends React.Component {
  render() {
    //console.log(this.props);
    return (
      <button className="square" onClick={this.props.onClick}>
        {this.props.value}
      </button>
    );
  }
}

// function Square(props) {
//   console.log(props);
//   return (
//     <button className="square" onClick={props.onClick}>
//       {props.value}
//     </button>
//   );
// }

class Board extends React.Component {
  renderSquare(i) {
    //console.log(this.props);
    console.log(this.props);
    return <Square value={this.props.squares[i]} onClick={() => this.props.onClick(i)}/>;
  }

  render() {
    let status = '';
    const winner = calculateWinner(this.props.squares);
    if (winner !== null) status = 'Winner: ' + winner;
    else status = `Next player: ${this.props.player1 ? 'X' : 'O'}`;

    return (
      <div>
        <div className="status">{status}</div>
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

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      player1: true
    };
    console.log(this.state);
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    //console.log(squares);
    const winner = calculateWinner(squares);
    if (winner !== null) return;
    //console.log(squares[i]);
    if (squares[i] !== null) return;
    squares[i] = this.state.player1 ? 'X' : 'O';
    console.log('Squares' + squares);
    console.log(this.state);
    this.setState(state => ({
      squares: squares,
      player1: !state.player1
    }));
    // this.setState(
    // {
    //   history: this.state.history.concat([{squares}]),
    //   player1: !this.state.player1,
    // })
  }

  render() {
    //console.log(this.state.history.slice(-1)[0]);
    return (
      <div className="game">
        <div className="game-board">
          <Board squares={this.state.squares}
          onClick={i => this.handleClick(i)}
          player1={this.state.player1}/>
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
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