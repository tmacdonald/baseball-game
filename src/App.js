import React, { useState } from "react";
import "./App.css";

import _ from "lodash";

function GameScore() {
  const [awayInnings, setAwayInnings] = useState([]);
  const [homeInnings, setHomeInnings] = useState([]);

  function simulateInning() {
    const hits = Math.floor(Math.random() * 3);
    const runs = Math.floor(Math.random() * 1.4 * hits);

    return { hits, runs };
  }

  function nextInning() {
    if (awayInnings.length === homeInnings.length) {
      setAwayInnings([...awayInnings, simulateInning()]);
    } else {
      setHomeInnings([...homeInnings, simulateInning()]);
    }
  }

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

  const awayHits =
    awayInnings.map(inning => inning.hits).reduce((x, y) => x + y, 0) || 0;
  const awayRuns =
    awayInnings.map(inning => inning.runs).reduce((x, y) => x + y, 0) || 0;
  const homeHits =
    homeInnings.map(inning => inning.hits).reduce((x, y) => x + y, 0) || 0;
  const homeRuns =
    homeInnings.map(inning => inning.runs).reduce((x, y) => x + y, 0) || 0;

  const numberOfInnings = Math.max(
    9,
    Math.max(awayInnings.length, homeInnings.length)
  );
  const innings = _.range(1, numberOfInnings + 1);

  const isGameOver =
    (homeInnings.length >= 9 &&
      homeInnings.length === awayInnings.length &&
      homeRuns !== awayRuns) ||
    (awayInnings.length === 9 &&
      homeInnings.length === 8 &&
      homeRuns > awayRuns);

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
      <button disabled={isGameOver} onClick={nextInning}>
        Next
      </button>
    </>
  );
}

function App() {
  return (
    <div className="App">
      <GameScore />
    </div>
  );
}

export default App;
