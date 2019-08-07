import React, { useState } from "react";

import { createGame, tickGame, simulateGame } from "../engine";
import { isGameOver } from "../stats";

import GameScore from "./GameScore";

export default function Game() {
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
      <button disabled={gameIsOver} onClick={() => setGame(simulateGame(game))}>
        Simulate
      </button>
    </>
  );
}
