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
    const current = this.state.history.slice(-1)[0].squares;
    console.log('Current:');
    console.log(current);
    const winner = calculateWinner(current);
    if (winner !== null) return;
    if (current[i] !== null) return;
    current[i] = this.state.player1 ? 'X' : 'O';
    console.log('History: ');
    console.log(this.state.history);
    const squares = current.slice();
    this.setState(state => ({
      history: state.history.concat([{squares: squares}]),
      player1: !state.player1,
      steps: state.history.length
    }));
  }

  jumpTo(move) {
    this.setState(state => ({
      steps: move,
      player1: (move % 2) === 0
    }));
    console.log('Number of steps:');
    console.log(move);
  }

  render() {
    let status = '';
    const winner = calculateWinner(this.state.history.slice(-1)[0].squares);
    if (winner !== null) status = 'Winner: ' + winner;
    else status = `Next player: ${this.state.player1 ? 'X' : 'O'}`;

    const moves = this.state.history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    const current = this.state.history[this.state.steps];
    // console.log('Current:');
    // console.log(current);
    // console.log('History: ');
    // console.log(this.state.history);
    return (
      <div className="game">
        <div className="game-board">
          <Board squares={current.squares}
          onClick={i => this.handleClick(i)}/>
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
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