import Bases from "./Bases";

export enum Team {
  Away,
  Home
}

export type GameState = {
  inning: number;
  team: Team;
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
