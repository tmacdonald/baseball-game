import React, { useState } from "react";

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
  const [game, setGame] = useState(createGame());
  const gameIsOver = isGameOver(game);

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
        onClick={() => setGame(simulateGame(game, createDiceAction))}
      >
        Simulate Game
      </button>
    </>
  );
}
