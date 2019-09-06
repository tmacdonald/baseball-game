import React from "react";
import Game from "../models/Game";
import { statisticsByGames } from "../stats";
import Team from "../models/Team";

type GamesDebuggerProps = {
  team: string | undefined;
  games: Game[];
};

export default function GamesDebugger({ team, games }: GamesDebuggerProps) {
  const stats = statisticsByGames(team, games);

  return <pre>{JSON.stringify(stats, null, 2)}</pre>;
}
