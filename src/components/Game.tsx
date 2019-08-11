import React, { useState, useEffect, useRef } from "react";

import {
  createGame,
  simulateInning,
  simulateGame,
  simulateAction,
  isGameOver
} from "../gameEngine";

import GameScore from "./GameScore";

import createDiceAction from "../DiceActionCreator";

function useInterval(callback: (...args: any[]) => void, delay: number) {
  const savedCallback = useRef<(...args: any[]) => void>();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      if (savedCallback.current) {
        savedCallback.current();
      }
    }

    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export default function Game() {
  const [game, setGame] = useState(createGame("Orioles", "Bluejays"));
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
