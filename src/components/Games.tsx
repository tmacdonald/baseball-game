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

const initialGames = [
  createGame("Orioles", "Blue Jays"),
  createGame("Red Sox", "Yankees"),
  createGame("Tigers", "Indians"),
  createGame("White Sox", "Twins"),
  createGame("Cubs", "Mets"),
  createGame("Braves", "Rays")
];

export default function Game() {
  const [games, setGames] = useState(initialGames);
  const [simulating, setSimulating] = useState(false);
  const [ms, setMs] = useState(1000);
  useInterval(() => {
    if (simulating) {
      setGames(
        games.map(game => {
          if (!isGameOver(game)) {
            return simulateAction(game, createDiceAction);
          }
          return game;
        })
      );
    }
  }, ms);

  function simulateAtBat() {
    setGames(
      games.map(game => {
        if (!isGameOver(game)) {
          return simulateAction(game, createDiceAction);
        }
        return game;
      })
    );
  }

  return (
    <>
      {games.map(game => (
        <GameScore game={game} />
      ))}
      <button onClick={simulateAtBat}>Simulate at bat</button>
      {/* <button
        disabled={gameIsOver}
        onClick={() => setGame(simulateInning(game, createDiceAction))}
      >
        Simulate Inning
      </button> */}
      <button
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
