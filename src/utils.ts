import AtBatState from "./models/AtBatState";
import Bases from "./models/Bases";
import Inning from "./models/Inning";

export function createState(initialState = {}) {
  const defaultState: AtBatState = {
    bases: { first: false, second: false, third: false },
    runs: 0,
    hits: 0,
    errors: 0,
    outs: 0,
    balls: 0,
    strikes: 0
  };
  return { ...defaultState, ...initialState };
}

export function bases(first: boolean, second: boolean, third: boolean): Bases {
  return { first, second, third };
}

export function inningState(inning: Inning): AtBatState {
  if (inning.events.length === 0) {
    return createState();
  }
  return inning.events[inning.events.length - 1];
}
