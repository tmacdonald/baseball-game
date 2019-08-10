import Game from "./models/Game";
import Inning from "./models/Inning";
import AtBatState from "./models/AtBatState";
import { createState, inningState } from "./utils";

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

function sum(x: number, y: number) {
  return x + y;
}

export function inningRuns(inning: Inning): number {
  return inningState(inning).runs;
}

export function hits(innings: Inning[]): number {
  return innings.map(inning => inningState(inning).hits).reduce(sum, 0) || 0;
}

export function runs(innings: Inning[]): number {
  return innings.map(inning => inningRuns(inning)).reduce(sum, 0) || 0;
}

export function errors(innings: Inning[]): number {
  return innings.map(inning => inningState(inning).errors).reduce(sum, 0) || 0;
}
