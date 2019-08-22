import React from "react";
import Game from "../models/Game";
import { statisticsByGames } from "../stats";

type GamesDebuggerProps = {
  games: Game[];
};

export default function GamesDebugger({ games }: GamesDebuggerProps) {
  const stats = statisticsByGames(games);

  return <pre>{JSON.stringify(stats, null, 2)}</pre>;
}
