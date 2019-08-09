import { Inning, Game } from "./models/Game";
import AtBatState from "./models/AtBatState";
import { walk, single, double, triple, homeRun, out, error } from "./actions";
import Action from "./actions/Action";

import { isGameOver } from "./stats";

export function createGame(): Game {
  return {
    awayInnings: [],
    homeInnings: []
  };
}

export function simulateInning(game: Game): Game {
  return simulateNextInning(game);
}

export function simulateGame(game: Game): Game {
  let simulatedGame = game;
  while (!isGameOver(simulatedGame)) {
    simulatedGame = simulateNextInning(simulatedGame);
  }
  return simulatedGame;
}

function isInningOver(state: AtBatState): boolean {
  return state.outs === 3;
}

function createAction(): Action {
  const die1 = Math.ceil(Math.random() * 6);
  const die2 = Math.ceil(Math.random() * 6);
  //console.log(die1, die2);

  // 1/1 home run
  if (die1 === 1 && die2 === 1) {
    return homeRun;
  }
  // 1/2 double
  if ((die1 === 1 && die2 === 2) || (die1 === 2 && die2 === 1)) {
    return double;
  }
  // 1/3 single
  if ((die1 === 1 && die2 === 3) || (die1 === 3 && die2 === 1)) {
    return single;
  }
  // 1/4 pop out
  // 1/5 ground out
  // 1/6 strike out
  // 2/2 single
  if (die1 === 2 && die2 === 2) {
    return single;
  }
  // 2/3 pop out
  // 2/4 ground out
  // 2/5 strike out
  // 2/6 ground out
  // 3/3 single
  if (die1 === 3 && die2 === 3) {
    return single;
  }
  // 3/4 strike out
  // 3/5 ground out
  // 3/6 fly out
  // 4/4 walk
  if (die1 === 4 && die2 === 4) {
    return walk;
  }
  // 4/5 fly out
  // 4/6 fly out
  // 5/5 base on error
  if (die1 === 5 && die2 === 5) {
    return error;
  }
  // 5/6 single
  if ((die1 === 5 && die2 === 6) || (die1 === 6 && die2 === 5)) {
    return single;
  }
  // 6/6 triple
  if (die1 === 6 && die2 === 6) {
    return triple;
  }

  return out;
}

function simulateAction(state: AtBatState): AtBatState {
  const action = createAction();
  console.log(action.name);

  const newState = action(state);
  console.log(newState.bases);

  return newState;
}

function createInning(): Inning {
  let state: AtBatState = {
    bases: { first: false, second: false, third: false },
    runs: 0,
    hits: 0,
    balls: 0,
    strikes: 0,
    outs: 0,
    errors: 0
  };

  while (!isInningOver(state)) {
    state = simulateAction(state);
  }

  return {
    runs: state.runs,
    hits: state.hits,
    errors: state.errors
  };
}

function simulateNextInning(game: Game): Game {
  const { awayInnings, homeInnings } = game;
  if (awayInnings.length === homeInnings.length) {
    console.log(`top of ${awayInnings.length + 1}`);
    return {
      ...game,
      awayInnings: [...awayInnings, createInning()]
    };
  } else {
    console.log(`bottom of ${homeInnings.length + 1}`);
    return {
      ...game,
      homeInnings: [...homeInnings, createInning()]
    };
  }
}
