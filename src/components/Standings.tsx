import React from "react";
import Game from "../models/Game";
import Team from "../models/Team";
import {
  standings,
  teamRecord,
  homeTeamRecord,
  awayTeamRecord
} from "../stats";

type StandingsProps = {
  teams: Team[];
  games: Game[];
};

export default function Standings({ teams, games }: StandingsProps) {
  const calculatedStandings = teamRecord(teams, games);
  calculatedStandings.sort((a, b) =>
    a.wins - a.losses > b.wins - b.losses ? -1 : 1
  );

  const homeRecords = homeTeamRecord(teams, games);
  const awayRecords = awayTeamRecord(teams, games);

  const firstPlaceTeam = calculatedStandings[0];

  return (
    <table>
      <thead>
        <tr>
          <th>Team</th>
          <th>Wins</th>
          <th>Losses</th>
          <th>GB</th>
          {/* <th>RF</th>
          <th>RA</th> */}

          <th>Home record</th>
          <th>Away record</th>
        </tr>
      </thead>
      <tbody>
        {calculatedStandings.map(teamStandings => {
          const gamesBack =
            (firstPlaceTeam.wins -
              teamStandings.wins +
              (teamStandings.losses - firstPlaceTeam.losses)) /
            2;

          const [homeRecord] = homeRecords.filter(
            record => record.team.name === teamStandings.team.name
          );

          const [awayRecord] = awayRecords.filter(
            record => record.team.name === teamStandings.team.name
          );
          return (
            <tr>
              <td>{teamStandings.team.name}</td>
              <td>{teamStandings.wins}</td>
              <td>{teamStandings.losses}</td>
              <td>{gamesBack}</td>
              <td>
                {homeRecord.wins} - {homeRecord.losses}
              </td>
              <td>
                {awayRecord.wins} - {awayRecord.losses}
              </td>
              {/* <td>{teamStandings.runsScored}</td>
              <td>{teamStandings.runsAgainst}</td> */}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
