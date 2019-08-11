import React, { useState, useEffect } from "react";

import {
  createGame,
  simulateInning,
  simulateGame,
  simulateAction,
  isGameOver
} from "../gameEngine";

import GameScore from "./GameScore";

import createDiceAction from "../DiceActionCreator";

function useInterval(callback: (...args: any[]) => void, duration: number) {
  let interval: NodeJS.Timeout;
  useEffect(() => {
    interval = setInterval(callback, duration);
    return () => {
      clearInterval(interval);
    };
  }, [callback, duration]);
}

export default function Game() {
  const [game, setGame] = useState(createGame());
  const [simulating, setSimulating] = useState(false);
  const [ms, setMs] = useState(1000);
  const gameIsOver = isGameOver(game);
  useInterval(() => {
    if (!gameIsOver && simulating) {
      setGame(simulateAction(game, createDiceAction));
    }
  }, ms);

  return (
    <>
      <GameScore game={game} />
      <button
        disabled={gameIsOver}
        onClick={() => setGame(simulateAction(game, createDiceAction))}
      >
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
