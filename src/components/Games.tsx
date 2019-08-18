import React, { useState } from "react";
import Game, { Team } from "../models/Game";

import useInterval from "../useInterval";

import {
  createGame,
  simulateAction,
  simulateGame,
  isGameOver
} from "../gameEngine";

import GameScore from "./BoxScore";
import _ from "lodash";

import createDiceAction from "../DiceActionCreator";
import Standings from "./Standings";

const teamNames = [
  "Orioles",
  "Blue Jays",
  "Red Sox",
  "Yankees",
  "Tigers",
  "White Sox",
  "Giants",
  "Dodgers",
  "Cubs",
  "Mets",
  "Nationals",
  "Rays",
  "Marlins",
  "Braves",
  "Phillies",
  "Astros"
];

const teams: Team[] = teamNames.map(teamName => ({
  name: teamName,
  roster: _.range(9).map(i => `${teamName} Player ${i + 1}`)
}));

const initialGames = [
  ..._.range(3).flatMap(() =>
    _.range(teams.length / 2).map(i =>
      createGame(teams[i * 2], teams[i * 2 + 1])
    )
  ),
  ..._.range(3).flatMap(() =>
    _.range(teams.length / 2).map(i =>
      createGame(teams[i], teams[i + teams.length / 2])
    )
  ),
  ..._.range(3).flatMap(() =>
    _.range(teams.length / 2).map(i =>
      createGame(teams[i], teams[teams.length - i - 1])
    )
  )
];

export default function Games() {
  const [games, setGames] = useState<Game[]>(initialGames);
  const [simulating, setSimulating] = useState<boolean>(false);
  const [ms, setMs] = useState<number>(1000);
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

  function simulateGames() {
    setGames(
      games.map(game => {
        return simulateGame(game, createDiceAction);
      })
    );
  }

  return (
    <>
      {games.map(game => (
        <GameScore game={game} />
      ))}
      <Standings teams={teams} games={games} />
      {/* {teams.map(team => (
        <PlayerStatistics games={games} roster={team.roster} />
      ))} */}
      <button onClick={simulateAtBat}>Simulate at bat</button>
      {/* <button
        disabled={gameIsOver}
        onClick={() => setGame(simulateInning(game, createDiceAction))}
      >
        Simulate Inning
      </button> */}
      <button
        //onClick={() => setGame(simulateGame(game, createDiceAction))}
        // onClick={simulateGames}
        onClick={() => setSimulating(true)}
      >
        Simulate Games
      </button>
      <input
        type="number"
        value={ms}
        onChange={e => setMs(parseInt(e.target.value))}
      />
    </>
  );
}
