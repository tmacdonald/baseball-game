import AtBatState from "../models/AtBatState";

export default function error(state: AtBatState): AtBatState {
  const { bases, errors, runs } = state;

  return {
    ...state,
    errors: errors + 1,
    bases: {
      first: true,
      second: bases.first,
      third: bases.second
    },
    runs: runs + (bases.third ? 1 : 0),
    balls: 0,
    strikes: 0
  };
}
