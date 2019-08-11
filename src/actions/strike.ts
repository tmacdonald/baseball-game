import GameState from "../models/GameState";
import Action from "./Action";

const strike: Action = function(state: GameState): GameState {
  const { strikes, balls, outs } = state;

  return {
    ...state,
    strikes: (strikes + 1) % 3,
    balls: strikes + 1 === 3 ? 0 : balls,
    outs: outs + (strikes + 1 === 3 ? 1 : 0)
  };
};

export default strike;
