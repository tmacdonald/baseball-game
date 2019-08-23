import React, { useState } from "react";
import Game from "../models/Game";
import Team from "../models/Team";
import Player from "../models/Player";

import useInterval from "../useInterval";

import scheduler from "../scheduling/bergerTablesScheduler";

import {
  createGame,
  simulateAction,
  simulateGame,
  isGameOver
} from "../gameEngine";

import GameSummary from "./GameSummary";
import GamesDebugger from "./GamesDebugger";
import _ from "lodash";

import createDiceAction from "../DiceActionCreator";
import createDiceActionCreator from "../SkilledDiceActionCreator";
import Standings from "./Standings";
import TopPlayers from "./TopPlayers";
import FilterByTeam from "./FilterByTeam";

const teamNames = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

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

console.log(players);
//const createDiceAction = createDiceActionCreator(players);

const teamByNames = _.keyBy(teams, team => team.name);

const rounds = scheduler(teamNames);

const initialGames = _.range(4).flatMap((j, i) =>
  rounds.flatMap(round => {
    return _.range(3).flatMap(() => {
      return round.flatMap(matchup => {
        const [team1, team2] = matchup;

        // Switches home/away matchup per round repetition to avoid unbalanced schedule
        const awayTeam = i % 2 === 0 ? team1 : team2;
        const homeTeam = i % 2 === 0 ? team2 : team1;

        return createGame(teamByNames[awayTeam], teamByNames[homeTeam]);
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
              <Standings teams={teams} games={games} />
              <button onClick={simulateAtBat}>Simulate at bat</button>
              <button onClick={simulateSingleGame}>Simulate Game</button>
              <button onClick={simulateGames}>Simulate All Games</button>
              <TopPlayers
                games={filteredGames}
                players={filteredTeams.flatMap(team => team.roster)}
                numberOfPlayersToShow={20}
              />
              <GamesDebugger games={filteredGames} />
              {filteredGames.map(game => (
                <GameSummary game={game} />
              ))}
            </>
          );
        }}
      </FilterByTeam>
    </>
  );
}
