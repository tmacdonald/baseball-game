import React, { useState } from "react";
import "./App.css";

import _ from "lodash";
import { createGame, tickGame, hits, runs, isGameOver } from "./engine";

function GameScore({ game, onTick }) {
  const { awayInnings, homeInnings } = game;

  function printInnings(teamInnings, numberOfInnings) {
    const printedTeamInnings = teamInnings.map(inning => (
      <td>{inning.runs}</td>
    ));
    const otherInnings = _.range(
      1,
      Math.max(1, numberOfInnings + 1 - teamInnings.length)
    ).map(() => <td>-</td>);
    return [...printedTeamInnings, ...otherInnings];
  }

  const awayHits = hits(awayInnings);
  const awayRuns = runs(awayInnings);
  const homeHits = hits(homeInnings);
  const homeRuns = runs(homeInnings);

  const numberOfInnings = Math.max(
    9,
    Math.max(awayInnings.length, homeInnings.length)
  );
  const innings = _.range(1, numberOfInnings + 1);

  return (
    <>
      <table>
        <thead>
          <tr>
            {innings.map(inning => (
              <th>{inning}</th>
            ))}
            <th>R</th>
            <th>H</th>
            <th>E</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            {printInnings(awayInnings, numberOfInnings)}
            <td>{awayRuns}</td>
            <td>{awayHits}</td>
            <td>0</td>
          </tr>
          <tr>
            {printInnings(homeInnings, numberOfInnings)}
            <td>{homeRuns}</td>
            <td>{homeHits}</td>
            <td>0</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

function Game() {
  const [game, setGame] = useState(createGame());
  const gameIsOver = isGameOver(game);

  function onTick() {
    setGame(tickGame(game));
  }

  return (
    <>
      <GameScore game={game} />
      <button disabled={gameIsOver} onClick={onTick}>
        Next
      </button>
    </>
  );
}

function App() {
  return (
    <div className="App">
      <Game />
      <Game />
      <Game />
      <Game />
      <Game />
    </div>
  );
}

export default App;
