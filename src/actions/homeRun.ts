import { GameState } from "../models/GameState";

export default function homeRun(state: GameState): GameState {
  const { runs, homeRuns, bases } = state;

  return {
    ...state,
    bases: {
      first: false,
      second: false,
      third: false
    },
    homeRuns: homeRuns + 1,
    runs:
      runs +
      1 +
      (bases.third ? 1 : 0) +
      (bases.second ? 1 : 0) +
      (bases.first ? 1 : 0),
    balls: 0,
    strikes: 0
  };
}
