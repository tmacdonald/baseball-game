import Bases from "./Bases";

type CurrentState = {
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

export default CurrentState;
