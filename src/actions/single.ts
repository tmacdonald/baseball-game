import GameState from "../models/GameState";

export default function single(state: GameState): GameState {
  const { runs, singles, bases } = state;

  return {
    ...state,
    bases: {
      first: true,
      second: bases.first,
      third: bases.second
    },
    singles: singles + 1,
    runs: runs + (bases.third ? 1 : 0),
    balls: 0,
    strikes: 0
  };
}
