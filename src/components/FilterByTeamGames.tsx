import React, { useState, useEffect } from "react";
import Game, { Team } from "../models/Game";
import { numberOfPlays, sliceGame } from "../stats";

type FilterByTeamGamesProps = {
  games: Game[];
  teams: Team[];
  children: (games: Game[]) => JSX.Element;
};

export default function FilterByTeamGames({
  games,
  teams,
  children
}: FilterByTeamGamesProps) {
  const [selectedTeam, setSelectedTeam] = useState<string>();
  const filteredGames = !!selectedTeam
    ? games.filter(
        game => game.teams.filter(team => team.name === selectedTeam).length > 0
      )
    : games;

  return (
    <>
      <select
        value={selectedTeam}
        onChange={e => {
          setSelectedTeam(e.target.value);
        }}
      >
        <option>None</option>
        {teams.map(team => (
          <option value={team.name}>{team.name}</option>
        ))}
      </select>
      {children(filteredGames)}
    </>
  );
}
