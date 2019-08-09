import AtBatState from "../models/AtBatState";

export default function single(state: AtBatState): AtBatState {
  const { runs, hits, bases } = state;

  return {
    ...state,
    bases: {
      first: true,
      second: bases.first,
      third: bases.second
    },
    hits: hits + 1,
    runs: runs + (bases.third ? 1 : 0),
    balls: 0,
    strikes: 0
  };
}
