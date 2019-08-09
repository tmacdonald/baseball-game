import AtBatState from "../models/AtBatState";

export default function out(state: AtBatState): AtBatState {
  const { outs } = state;

  return {
    ...state,
    strikes: 0,
    balls: 0,
    outs: outs + 1
  };
}
