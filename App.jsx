import { useState } from 'react';
import { calculateWinner, isDraw } from './game.js';

export default function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xTurn, setXTurn] = useState(true);
  const [score, setScore] = useState({ X: 0, O: 0, Draw: 0 });

  const win = calculateWinner(board);
  const draw = isDraw(board);

  function play(i) {
    if (board[i] || win) return;
    const next = board.slice();
    next[i] = xTurn ? 'X' : 'O';
    setBoard(next);
    setXTurn(!xTurn);

    const w = calculateWinner(next);
    if (w) setScore((s) => ({ ...s, [w.player]: s[w.player] + 1 }));
    else if (isDraw(next)) setScore((s) => ({ ...s, Draw: s.Draw + 1 }));
  }

  function newRound() {
    setBoard(Array(9).fill(null));
    setXTurn(true);
  }

  const status = win ? `🎉 ${win.player} wins!` : draw ? "It's a draw!" : `Turn: ${xTurn ? 'X' : 'O'}`;

  return (
    <main className="app">
      <h1>Tic Tac Toe</h1>
      <p className="status">{status}</p>

      <div className="board">
        {board.map((cell, i) => (
          <button
            key={i}
            className={`cell ${cell || ''} ${win && win.line.includes(i) ? 'win' : ''}`}
            onClick={() => play(i)}
          >
            {cell}
          </button>
        ))}
      </div>

      <div className="score">
        <span>X: {score.X}</span>
        <span>Draw: {score.Draw}</span>
        <span>O: {score.O}</span>
      </div>

      <button className="reset" onClick={newRound}>New Round</button>
    </main>
  );
}
