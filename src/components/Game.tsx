import React, { useState } from "react";
import useInterval from "../useInterval";

import {
  createGame,
  simulateInning,
  simulateGame,
  simulateAction,
  isGameOver
} from "../gameEngine";

import GameScore from "./GameScore";

import createDiceAction from "../DiceActionCreator";
import ScrubbedGame from "./ScrubbedGame";

export default function Game() {
  const [game, setGame] = useState(createGame("Orioles", "Bluejays"));

  const [simulating, setSimulating] = useState(false);
  const [ms, setMs] = useState(1000);

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
        {scrubbedGame => <GameScore game={scrubbedGame} />}
      </ScrubbedGame>

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
