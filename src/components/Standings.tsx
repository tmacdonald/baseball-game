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
  calculatedStandings.sort((a, b) =>
    a.wins - a.losses > b.wins - b.losses ? -1 : 1
  );

  const firstPlaceTeam = calculatedStandings[0];

  return (
    <table>
      <thead>
        <tr>
          <th>Team</th>
          <th>Wins</th>
          <th>Losses</th>
          <th>GB</th>
          <th>RF</th>
          <th>RA</th>
        </tr>
      </thead>
      <tbody>
        {calculatedStandings.map(teamStandings => {
          const gamesBack =
            (firstPlaceTeam.wins -
              teamStandings.wins +
              (teamStandings.losses - firstPlaceTeam.losses)) /
            2;
          return (
            <tr>
              <td>{teamStandings.team.name}</td>
              <td>{teamStandings.wins}</td>
              <td>{teamStandings.losses}</td>
              <td>{gamesBack}</td>
              <td>{teamStandings.runsScored}</td>
              <td>{teamStandings.runsAgainst}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
