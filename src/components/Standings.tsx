import React from "react";
import Game from "../models/Game";
import Team from "../models/Team";
import {
  teamRecord,
  homeTeamRecord,
  awayTeamRecord,
  streak,
  lastNGamesRecord
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
  const last10GamesRecords = lastNGamesRecord(teams, games, 10);
  const streaks = streak(teams, games);

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
          <th>Last 10 Games</th>
          <th>Streak</th>
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
          const [last10GamesRecord] = last10GamesRecords.filter(
            record => record.team.name === teamStandings.team.name
          );

          const [streak] = streaks.filter(
            streak => streak.team.name === teamStandings.team.name
          );
          const streakDescription =
            streak.wins > 0 ? `W${streak.wins}` : `L${streak.losses}`;

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
              <td>
                {last10GamesRecord.wins} - {last10GamesRecord.losses}
              </td>
              <td>{streakDescription}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
