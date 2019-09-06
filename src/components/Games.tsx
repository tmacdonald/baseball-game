import React, { useState } from "react";
import Game from "../models/Game";
import Team from "../models/Team";
import Player from "../models/Player";

import useInterval from "../useInterval";

import scheduler from "../scheduling/bergerTablesScheduler";

import analyzer from "../scheduling/analyzer";

import {
  createGame,
  simulateAction,
  simulateGame,
  isGameOver,
  splitArrayByPredicate
} from "../gameEngine";

import GameSummary from "./GameSummary";
import GamesDebugger from "./GamesDebugger";
import _ from "lodash";

import createDiceAction from "../DiceActionCreator";
//import createDiceActionCreator from "../SkilledDiceActionCreator";
import Standings from "./Standings";
import TopPlayers from "./TopPlayers";
import FilterByTeam from "./FilterByTeam";

const teamNames = [
  "Blue Jays",
  "Yankees",
  "Red Sox",
  "Orioles",
  "Rays",
  "White Sox",
  "Astros",
  "Rangers",
  "Athletics",
  "Angels",
  "Mariners",
  "Brewers",
  "Tigers",
  "Indians"
  // "Twins",
  // "Nationals",
  // "Cubs",
  // "Mets",
  // "Pirates",
  // "Marlins",
  // "Braves",
  // "Dodgers",
  // "Padres",
  // "Diamondbacks",
  // "Cardinals",
  // "Reds",
  // "Giants",
  // "Rockies",
  // "Phillies",
  // "Royals"
];

const players: Player[] = [];

const teams: Team[] = teamNames.map(teamName => ({
  name: teamName,
  roster: _.range(9).map(i => {
    const playerID = `${teamName} Player ${i + 1}`;
    const player: Player = {
      playerID,
      firstName: `${teamName} Player`,
      lastName: `${i + 1}`,
      skill: Math.random()
    };
    players.push(player);
    return playerID;
  })
}));

//const createDiceAction = createDiceActionCreator(players);

const teamByNames = _.keyBy(teams, team => team.name);

const rounds = scheduler(teamNames);

let date = new Date("April 4, 2019");

const initialGames = _.range(2).flatMap((j, i) =>
  rounds.flatMap(round => {
    return _.range(3).flatMap(() => {
      const roundMatchups = round.flatMap(matchup => {
        const [team1, team2] = matchup;

        // Switches home/away matchup per round repetition to avoid unbalanced schedule
        // const awayTeam = iterator % 2 === 0 ? team1 : team2;
        // const homeTeam = iterator % 2 === 0 ? team2 : team1;
        const awayTeam = team1;
        const homeTeam = team2;

        const gameDate = date;

        return createGame(
          teamByNames[awayTeam],
          teamByNames[homeTeam],
          gameDate
        );
      });
      date = new Date(date);
      date.setDate(date.getDate() + 1);
      return roundMatchups;
    });
  })
);

const gamesAnalysis = analyzer(teams, initialGames);
console.log(gamesAnalysis);

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

    if (!!gameToComplete) {
      setGames([
        ...completedGames,
        simulateGame(gameToComplete, createDiceAction),
        ...otherGames
      ]);
    }
  }

  // TODO Move this import to utils
  function simulateDate() {
    const [completedGames, remainingGames] = splitArrayByPredicate(
      games,
      isGameOver
    );
    const nextGame = _.first(remainingGames);

    if (!!nextGame) {
      const [gamesToPlay, otherGames] = splitArrayByPredicate(
        remainingGames,
        game => game.date === nextGame.date
      );

      setGames([
        ...completedGames,
        ...gamesToPlay.map(game => simulateGame(game, createDiceAction)),
        ...otherGames
      ]);
    }
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
              <Standings teams={teams} games={games} />
              <button onClick={simulateAtBat}>Simulate at bat</button>
              <button onClick={simulateSingleGame}>Simulate Game</button>
              <button onClick={simulateDate}>Simulate Date</button>
              <button onClick={simulateGames}>Simulate All Games</button>
              <TopPlayers
                games={filteredGames}
                players={filteredTeams.flatMap(team => team.roster)}
                numberOfPlayersToShow={20}
              />
              <GamesDebugger team={selectedTeam} games={filteredGames} />
              {/* {filteredGames.map(game => (
                <GameSummary game={game} />
              ))} */}
            </>
          );
        }}
      </FilterByTeam>
    </>
  );
}
