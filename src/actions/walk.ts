import AtBatState from "../models/AtBatState";

export default function walk(state: AtBatState): AtBatState {
  const { runs, bases } = state;

  return {
    ...state,
    bases: {
      first: true,
      second: bases.first || bases.second,
      third: (bases.second && bases.first) || bases.third
    },
    runs: runs + (bases.first && bases.second && bases.third ? 1 : 0),
    balls: 0,
    strikes: 0
  };
}
