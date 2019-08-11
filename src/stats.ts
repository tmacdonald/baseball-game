import Inning from "./models/Inning";
import AtBatState from "./models/AtBatState";
import { inningState } from "./utils";

function sum(x: number, y: number) {
  return x + y;
}

export function inningRuns(inning: Inning): number {
  return inningState(inning).runs;
}

function combineHits(state: AtBatState): number {
  return state.singles + state.doubles + state.triples + state.homeRuns;
}

export function hits(innings: Inning[]): number {
  return (
    innings
      .map(inningState)
      .map(combineHits)
      .reduce(sum, 0) || 0
  );
}

export function runs(innings: Inning[]): number {
  return innings.map(inning => inningRuns(inning)).reduce(sum, 0) || 0;
}

export function errors(innings: Inning[]): number {
  return innings.map(inning => inningState(inning).errors).reduce(sum, 0) || 0;
}
