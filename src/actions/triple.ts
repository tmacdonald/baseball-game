import { GameState } from "../models/GameState";

export default function triple(state: GameState): GameState {
  const { runs, triples, bases } = state;

  return {
    ...state,
    bases: {
      first: false,
      second: false,
      third: true
    },
    triples: triples + 1,
    runs:
      runs +
      (bases.third ? 1 : 0) +
      (bases.second ? 1 : 0) +
      (bases.first ? 1 : 0),
    balls: 0,
    strikes: 0
  };
}
