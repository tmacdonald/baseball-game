import Bases from "./Bases";

type CurrentState = {
  bases: Bases;
  runs: number;
  hits: number;
  errors: number;
  outs: number;
  strikes: number;
  balls: number;
};

export default CurrentState;
