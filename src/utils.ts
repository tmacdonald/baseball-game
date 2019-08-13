import { GameState } from "./models/GameState";
import Inning from "./models/Inning";
import { Player } from "./models/Game";

export function createState(initialState = {}) {
  const defaultState: GameState = {
    topOfInning: true,
    inning: 1,
    bases: { first: false, second: false, third: false },
    runs: 0,
    singles: 0,
    doubles: 0,
    triples: 0,
    homeRuns: 0,
    walks: 0,
    errors: 0,
    outs: 0,
    balls: 0,
    strikes: 0,
    player: undefined
  };
  return { ...defaultState, ...initialState };
}

// export function bases(first: boolean, second: boolean, third: boolean): Bases {
//   return { first, second, third };
// }

// export function bases<T | undefined>(
//   first: T = undefined,
//   second: T = undefined,
//   third: T = undefined
// ): Bases<T | undefined> {
//   return { first, second, third };
// }

export function inningState(inning: Inning): GameState {
  if (inning.length === 0) {
    return createState();
  }
  return inning[inning.length - 1];
}
