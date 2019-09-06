import React from "react";
import Game from "../models/Game";
import { PlayerID } from "../models/Player";
import { playerStatisticsByGames } from "../stats";
import _ from "lodash";

type TopPlayersStatisticsProps = {
  games: Game[];
  players: PlayerID[];
  numberOfPlayersToShow: number;
};

export default function TopPlayersStatistics({
  games,
  players,
  numberOfPlayersToShow
}: TopPlayersStatisticsProps) {
  const stats = players.map(player => playerStatisticsByGames(games, player));
  stats.sort((a, b) => (a.battingAverage > b.battingAverage ? -1 : 1));
  const topPlayers = _.takeRight(stats, numberOfPlayersToShow);

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>At Bats</th>
          <th>Hits</th>
          <th>Runs</th>
          <th>RBIs</th>
          <th>AVG</th>
          <th>2B</th>
          <th>3B</th>
          <th>HR</th>
          <th>BB</th>
        </tr>
      </thead>
      <tbody>
        {topPlayers.map(stats => {
          return (
            <tr>
              <td>{stats.player}</td>
              <td>{stats.atBats}</td>
              <td>{stats.hits}</td>
              <td>{stats.playerRuns}</td>
              <td>{stats.rbis}</td>
              <td>{stats.battingAverage}</td>
              <td>{stats.doubles}</td>
              <td>{stats.triples}</td>
              <td>{stats.homeRuns}</td>
              <td>{stats.walks}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
