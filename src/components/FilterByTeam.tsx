import React, { useState } from "react";
import Team from "../models/Team";

type FilterByTeamGamesProps = {
  teams: Team[];
  children: (team: string | undefined) => JSX.Element;
};

export default function FilterByTeam({
  teams,
  children
}: FilterByTeamGamesProps) {
  const [selectedTeam, setSelectedTeam] = useState<string>();

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
      {children(selectedTeam)}
    </>
  );
}
