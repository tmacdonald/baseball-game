import React from "react";
import Game from "../models/Game";
import { PlayerID } from "../models/Player";
import { playerStatisticsByGames } from "../stats";

type PlayerStatisticsProps = {
  games: Game[];
  roster: PlayerID[];
};

export default function PlayerStatistics({
  games,
  roster
}: PlayerStatisticsProps) {
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
        {roster.map(player => {
          const stats = playerStatisticsByGames(games, player);
          return (
            <tr>
              <td>{player}</td>
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
