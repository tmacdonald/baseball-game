import Bases from "./Bases";

export type GameState = {
  inning: number;
  topOfInning: boolean;
  bases: Bases;
  runs: number;
  singles: number;
  doubles: number;
  triples: number;
  homeRuns: number;
  walks: number;
  errors: number;
  outs: number;
  strikes: number;
  balls: number;
};
