import AtBatState from "./models/AtBatState";

export interface AtBatAction {
  (state: AtBatState): AtBatState;
}

export const strike: AtBatAction = function(state: AtBatState): AtBatState {
  const { strikes, balls, outs } = state;

  return {
    ...state,
    strikes: (strikes + 1) % 3,
    balls: strikes + 1 === 3 ? 0 : balls,
    outs: outs + (strikes + 1 === 3 ? 1 : 0)
  };
};

export function walk(state: AtBatState): AtBatState {
  const { runs, bases } = state;

  return {
    ...state,
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

export function out(state: AtBatState): AtBatState {
  const { outs } = state;

  return {
    ...state,
    strikes: 0,
    balls: 0,
    outs: outs + 1
  };
}

export function single(state: AtBatState): AtBatState {
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

export function double(state: AtBatState): AtBatState {
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

export function triple(state: AtBatState): AtBatState {
  const { runs, hits, bases } = state;

  return {
    ...state,
    bases: {
      first: false,
      second: false,
      third: true
    },
    hits: hits + 1,
    runs:
      runs +
      (bases.third ? 1 : 0) +
      (bases.second ? 1 : 0) +
      (bases.first ? 1 : 0),
    balls: 0,
    strikes: 0
  };
}

export function homeRun(state: AtBatState): AtBatState {
  const { runs, hits, bases } = state;

  return {
    ...state,
    bases: {
      first: false,
      second: false,
      third: false
    },
    hits: hits + 1,
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
