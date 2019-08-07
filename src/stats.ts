import { Inning, Game } from "./models/Game";

export function isGameOver(game: Game): boolean {
  const { awayInnings, homeInnings } = game;
  const homeRuns = runs(homeInnings);
  const awayRuns = runs(awayInnings);

  return (
    (homeInnings.length >= 9 &&
      homeInnings.length === awayInnings.length &&
      homeRuns !== awayRuns) ||
    (awayInnings.length === 9 &&
      homeInnings.length === 8 &&
      homeRuns > awayRuns)
  );
}

export function hits(innings: Inning[]): number {
  return innings.map(inning => inning.hits).reduce((x, y) => x + y, 0) || 0;
}

export function runs(innings: Inning[]): number {
  return innings.map(inning => inning.runs).reduce((x, y) => x + y, 0) || 0;
}
