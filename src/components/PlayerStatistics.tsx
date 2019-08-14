import React from "react";
import Game, { Player } from "../models/Game";
import { playerStatistics } from "../stats";

type PlayerStatisticsProps = {
  game: Game;
  roster: Player[];
};

export default function PlayerStatistics({
  game,
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
          const stats = playerStatistics(game, player);
          const avg = stats.atBats > 0 ? stats.hits / stats.atBats : "---";
          return (
            <tr>
              <td>{player}</td>
              <td>{stats.atBats}</td>
              <td>{stats.hits}</td>
              <td>{stats.runs}</td>
              <td>{stats.rbis}</td>
              <td>{avg}</td>
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
