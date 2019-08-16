import AtBat from "./models/Play";
import Game, { Player } from "./models/Game";
import { splitPlays } from "./gameEngine";
import { single, double, triple, homeRun, error, walk } from "./actions";
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

function isAtBat(atBat: AtBat): boolean {
  return !isWalk(atBat);
}

function isWalk(atBat: AtBat): boolean {
  return atBat.action === walk;
}

function isError(atBat: AtBat): boolean {
  return atBat.action === error;
}

function runsPerAtBat(atBat: AtBat): number {
  return atBat.runs.length;
}

export function numberOfAtBats(game: Game): number {
  return game.plays.length;
}

export function gameHistory(game: Game, pointInTime: number): Game {
  return {
    ...game,
    plays: game.plays.slice(0, pointInTime)
  };
}

export function hits(game: Game): [number, number] {
  const [awayAtBats, homeAtBats] = splitPlays(game);

  const awayHits = awayAtBats.filter(isHit).length;
  const homeHits = homeAtBats.filter(isHit).length;

  return [awayHits, homeHits];
}

export function runs(game: Game): [number, number] {
  const [awayAtBats, homeAtBats] = splitPlays(game);

  const awayRuns = awayAtBats.map(runsPerAtBat).reduce(sum, 0);
  const homeRuns = homeAtBats.map(runsPerAtBat).reduce(sum, 0);

  return [awayRuns, homeRuns];
}

export function runsByInning(game: Game): [number[], number[]] {
  const [awayAtBats, homeAtBats] = splitPlays(game);

  const awayAtBatsGroupedByInning = _.values(
    _.groupBy(awayAtBats, "inning")
  ).map(inningAtBats => inningAtBats.map(runsPerAtBat).reduce(sum, 0));

  const homeAtBatsGroupedByInning = _.values(
    _.groupBy(homeAtBats, "inning")
  ).map(inningAtBats => inningAtBats.map(runsPerAtBat).reduce(sum, 0));

  return [awayAtBatsGroupedByInning, homeAtBatsGroupedByInning];
}

export function errors(game: Game): [number, number] {
  const [awayAtBats, homeAtBats] = splitPlays(game);

  const awayErrors = awayAtBats.filter(isError).length;
  const homeErrors = homeAtBats.filter(isError).length;

  return [awayErrors, homeErrors];
}

interface PlayerStatistics {
  atBats: number;
  singles: number;
  doubles: number;
  triples: number;
  homeRuns: number;
  hits: number;
  runs: number;
  rbis: number;
  walks: number;
}

function isBatter(player: Player): (atBat: AtBat) => boolean {
  return (atBat: AtBat): boolean => {
    return atBat.batter === player;
  };
}

export function playerStatistics(game: Game, player: Player): PlayerStatistics {
  const atBats = game.plays.filter(isBatter(player));
  const singles = atBats.filter(atBat => atBat.action === single).length;
  const doubles = atBats.filter(atBat => atBat.action === double).length;
  const triples = atBats.filter(atBat => atBat.action === triple).length;
  const homeRuns = atBats.filter(atBat => atBat.action === homeRun).length;
  const hits = atBats.filter(isHit).length;
  const runs = game.plays
    .flatMap(atBat => atBat.runs)
    .filter(run => run === player).length;
  const rbis = atBats
    .filter(a => isHit(a) || isWalk(a))
    .map(atBat => atBat.runs.length)
    .reduce(sum, 0);
  const walks = atBats.filter(isWalk).length;

  const countedAtBats = atBats.filter(isAtBat).length;

  return {
    atBats: countedAtBats,
    singles,
    doubles,
    triples,
    homeRuns,
    hits,
    runs,
    rbis,
    walks
  };
}
