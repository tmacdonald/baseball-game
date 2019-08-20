import React, { useState } from "react";
import Game from "../models/Game";
import Team from "../models/Team";

import useInterval from "../useInterval";

import scheduler from "../scheduling/bergerTablesScheduler";

import {
  createGame,
  simulateAction,
  simulateGame,
  isGameOver
} from "../gameEngine";

import GameSummary from "./GameSummary";
import _ from "lodash";

import createDiceAction from "../DiceActionCreator";
import Standings from "./Standings";
import TopPlayers from "./TopPlayers";
import FilterByTeam from "./FilterByTeam";

const teamNames = [
  // "Unicorns",
  // "Toronto",
  // "Dinos",
  // "Toronto Raptors",
  // "Dragons",
  // "Christmas Trees",
  // "Stars",
  // "Jurassic Park",
  // "Flowers",
  // "Planets",
  // "Mars",
  // "Earth",
  // "Sun",
  // "Sunny",
  // "Adams",
  // "Alyssas",
  // "Tims",
  // "Timothys",
  // "Robyns",
  // "Ladybugs",
  // "Bugs"

  // "Orioles",
  // "Blue Jays",
  "Red Sox",
  "Yankees",
  "Tigers",
  // "White Sox",
  "Giants",
  "Dodgers",
  "Cubs",
  "Mets",
  "Pirates"
  // "Nationals",
  // "Rays",
  // "Marlins",
  // "Braves",
  // "Phillies",
  // "Astros"
];

const teams: Team[] = teamNames.map(teamName => ({
  name: teamName,
  roster: _.range(9).map(i => `${teamName} Player ${i + 1}`)
}));

const teamByNames = _.keyBy(teams, team => team.name);

const rounds = scheduler(teamNames);

const initialGames = _.range(6).flatMap(() =>
  rounds.flatMap(round => {
    return _.range(3).flatMap(() => {
      return round.flatMap(matchup => {
        const [team1, team2] = matchup;
        return createGame(teamByNames[team1], teamByNames[team2]);
      });
    });
  })
);

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

  function simulateSingleGame() {
    const completedGames = games.filter(isGameOver);
    const [gameToComplete, ...otherGames] = games.filter(
      game => !isGameOver(game)
    );

    setGames([
      ...completedGames,
      simulateGame(gameToComplete, createDiceAction),
      ...otherGames
    ]);
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
      <FilterByTeam teams={teams}>
        {selectedTeam => {
          const filteredGames = !!selectedTeam
            ? games.filter(
                game =>
                  game.teams.filter(team => team.name === selectedTeam).length >
                  0
              )
            : games;
          const filteredTeams = !!selectedTeam
            ? teams.filter(team => team.name === selectedTeam)
            : teams;
          return (
            <>
              {filteredGames.map(game => (
                <GameSummary game={game} />
              ))}
              <Standings teams={teams} games={games} />
              <TopPlayers
                games={filteredGames}
                players={filteredTeams.flatMap(team => team.roster)}
                numberOfPlayersToShow={20}
              />
            </>
          );
        }}
      </FilterByTeam>
      {/* <FilterByTeamGames games={games} teams={teams} /> */}

      <button onClick={simulateAtBat}>Simulate at bat</button>
      {/* <button
        disabled={gameIsOver}
        onClick={() => setGame(simulateInning(game, createDiceAction))}
      >
        Simulate Inning
      </button> */}
      <button
        //onClick={() => setGame(simulateGame(game, createDiceAction))}
        onClick={simulateSingleGame}
        //onClick={() => setSimulating(true)}
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
