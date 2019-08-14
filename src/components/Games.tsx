import React, { useState } from "react";

import useInterval from "../useInterval";

import {
  createGame,
  simulateInning,
  simulateGame,
  simulateAction,
  isGameOver
} from "../gameEngine";

import GameScore from "./BoxScore";
import _ from "lodash";

import createDiceAction from "../DiceActionCreator";

const orioles = {
  name: "Orioles",
  roster: _.range(9).map(i => `Orioles Player ${i + 1}`)
};
const bluejays = {
  name: "Blue Jays",
  roster: _.range(9).map(i => `Blue Jays Player ${i + 1}`)
};

const initialGames = _.range(5).map(() => createGame(orioles, bluejays));

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
