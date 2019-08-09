import AtBatState from "../models/AtBatState";

export default function double(state: AtBatState): AtBatState {
  const { runs, hits, bases } = state;

  return {
    ...state,
    bases: {
      first: false,
      second: true,
      third: bases.first
    },
    hits: hits + 1,
    runs: runs + (bases.third ? 1 : 0) + (bases.second ? 1 : 0),
    balls: 0,
    strikes: 0
  };
}
