import React, { useState } from "react";

import {
  createGame,
  simulateInning,
  simulateGame,
  simulateAction
} from "../gameEngine";
import { isGameOver } from "../stats";

import GameScore from "./GameScore";

export default function Game() {
  const [game, setGame] = useState(createGame());
  const gameIsOver = isGameOver(game);

  return (
    <>
      <GameScore game={game} />
      <button
        disabled={gameIsOver}
        onClick={() => setGame(simulateAction(game))}
      >
        Simulate at bat
      </button>
      <button
        disabled={gameIsOver}
        onClick={() => setGame(simulateInning(game))}
      >
        Simulate Inning
      </button>
      <button disabled={gameIsOver} onClick={() => setGame(simulateGame(game))}>
        Simulate Game
      </button>
    </>
  );
}
