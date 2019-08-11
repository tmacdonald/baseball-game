import Inning from "./models/Inning";
import { inningState } from "./utils";

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
