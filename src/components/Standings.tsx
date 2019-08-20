import React from "react";
import Game from "../models/Game";
import Team from "../models/Team";
import { standings } from "../stats";

type StandingsProps = {
  teams: Team[];
  games: Game[];
};

export default function Standings({ teams, games }: StandingsProps) {
  const calculatedStandings = standings(teams, games);
  calculatedStandings.sort((a, b) => (a.wins > b.wins ? -1 : 1));

  return (
    <table>
      <thead>
        <tr>
          <th>Team</th>
          <th>Wins</th>
          <th>Losses</th>
          <th>RF</th>
          <th>RA</th>
        </tr>
      </thead>
      <tbody>
        {calculatedStandings.map(teamStandings => (
          <tr>
            <td>{teamStandings.team.name}</td>
            <td>{teamStandings.wins}</td>
            <td>{teamStandings.losses}</td>
            <td>{teamStandings.runsScored}</td>
            <td>{teamStandings.runsAgainst}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
