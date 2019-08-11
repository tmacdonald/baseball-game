import GameState from "../models/GameState";

export default function out(state: GameState): GameState {
  const { outs } = state;

  return {
    ...state,
    strikes: 0,
    balls: 0,
    outs: outs + 1
  };
}
