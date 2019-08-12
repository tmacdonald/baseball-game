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

export default function Game() {
  const [game, setGame] = useState(createGame("Orioles", "Bluejays"));
  const [scrubbedGame, setScrubbedGame] = useState(game);
  const [simulating, setSimulating] = useState(false);
  const [ms, setMs] = useState(1000);

  const [scrub, setScrub] = useState(0);

  const gameIsOver = isGameOver(game);

  useInterval(() => {
    if (!gameIsOver && simulating) {
      const nextGame = simulateAction(game, createDiceAction);
      setGame(nextGame);
      setScrubbedGame(nextGame);
      setScrub(nextGame.states.length);
    }
  }, ms);

  function simulateAtBat() {
    const nextGame = simulateAction(game, createDiceAction);
    setGame(nextGame);
    setScrubbedGame(nextGame);
    setScrub(nextGame.states.length);
  }

  function changeScrub(newScrub: number) {
    setScrub(newScrub);
    setScrubbedGame({
      ...game,
      states: game.states.slice(0, newScrub)
    });
  }

  return (
    <>
      <pre>{JSON.stringify(scrubbedGame.states.length, null, 2)}</pre>
      <GameScore game={scrubbedGame} />
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
      <input
        type="range"
        min="0"
        max={game.states.length}
        value={scrub}
        onChange={e => changeScrub(parseInt(e.target.value))}
      />
    </>
  );
}
