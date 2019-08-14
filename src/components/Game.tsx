import React, { useState } from "react";
import useInterval from "../useInterval";
import _ from "lodash";

import {
  createGame,
  simulateInning,
  simulateAction,
  isGameOver
} from "../gameEngine";

import BoxScore from "./BoxScore";

import createDiceAction from "../DiceActionCreator";
import ScrubbedGame from "./ScrubbedGame";
import { playerStatistics } from "../stats";

const orioles = {
  name: "Orioles",
  roster: _.range(9).map(i => `Orioles Player ${i + 1}`)
};
const bluejays = {
  name: "Blue Jays",
  roster: _.range(9).map(i => `Blue Jays Player ${i + 1}`)
};

export default function Game() {
  const [game, setGame] = useState(createGame(orioles, bluejays));

  const [simulating, setSimulating] = useState(false);
  const [ms, setMs] = useState(100);

  const gameIsOver = isGameOver(game);

  useInterval(() => {
    if (!gameIsOver && simulating) {
      const nextGame = simulateAction(game, createDiceAction);
      setGame(nextGame);
    }
  }, ms);

  function simulateAtBat() {
    const nextGame = simulateAction(game, createDiceAction);
    setGame(nextGame);
  }

  return (
    <>
      <ScrubbedGame game={game}>
        {scrubbedGame => <BoxScore game={scrubbedGame} />}
      </ScrubbedGame>
      {/* <BoxScore game={game} /> */}

      <button disabled={gameIsOver} onClick={simulateAtBat}>
        Simulate at bat
      </button>
      <button
        disabled={gameIsOver}
        onClick={() => setGame(simulateInning(game, createDiceAction))}
      >
        Simulate Inning
      </button>
      <button
        disabled={gameIsOver}
        //onClick={() => setGame(simulateGame(game, createDiceAction))}
        onClick={() => setSimulating(true)}
      >
        Simulate Game
      </button>
      <input
        type="number"
        value={ms}
        onChange={e => setMs(parseInt(e.target.value))}
      />
    </>
  );
}
