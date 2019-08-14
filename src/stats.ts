import AtBat from "./models/AtBat";
import Game from "./models/Game";
import { splitAtBats } from "./gameEngine";
import { single, double, triple, homeRun } from "./actions";
import _ from "lodash";

function sum(x: number, y: number) {
  return x + y;
}

function isHit(atBat: AtBat): boolean {
  return (
    atBat.action === single ||
    atBat.action === double ||
    atBat.action === triple ||
    atBat.action === homeRun
  );
}

function runsPerAtBat(atBat: AtBat): number {
  return atBat.runs.length;
}

export function numberOfAtBats(game: Game): number {
  return game.atBats.length;
}

export function gameHistory(game: Game, pointInTime: number): Game {
  return {
    ...game,
    atBats: game.atBats.slice(0, pointInTime)
  };
}

export function hits(game: Game): [number, number] {
  const [awayAtBats, homeAtBats] = splitAtBats(game);

  const awayHits = awayAtBats.filter(isHit).length;
  const homeHits = homeAtBats.filter(isHit).length;

  return [awayHits, homeHits];
}

export function runs(game: Game): [number, number] {
  const [awayAtBats, homeAtBats] = splitAtBats(game);

  const awayRuns = awayAtBats.map(runsPerAtBat).reduce(sum, 0);
  const homeRuns = homeAtBats.map(runsPerAtBat).reduce(sum, 0);

  return [awayRuns, homeRuns];
}

export function runsByInning(game: Game): [number[], number[]] {
  const [awayAtBats, homeAtBats] = splitAtBats(game);

  const awayAtBatsGroupedByInning = _.values(
    _.groupBy(awayAtBats, "inning")
  ).map(inningAtBats => inningAtBats.map(runsPerAtBat).reduce(sum, 0));

  const homeAtBatsGroupedByInning = _.values(
    _.groupBy(homeAtBats, "inning")
  ).map(inningAtBats => inningAtBats.map(runsPerAtBat).reduce(sum, 0));

  return [awayAtBatsGroupedByInning, homeAtBatsGroupedByInning];
}

export function errors(game: Game): [number, number] {
  return [0, 0];
}
