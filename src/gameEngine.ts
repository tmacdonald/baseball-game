import { Inning, Game } from "./models/Game";
import AtBatState from "./models/AtBatState";
import { walk, single, double, triple, homeRun, out } from "./actions";

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

function simulateAtBat(state: AtBatState): AtBatState {
  const die1 = Math.ceil(Math.random() * 6);
  const die2 = Math.ceil(Math.random() * 6);

  if (die1 === 1 && die2 === 1) {
    console.log("home run");
    return homeRun(state);
  }
  if ((die1 === 1 && die2 === 2) || (die1 === 2 && die2 === 1)) {
    console.log("double");
    return double(state);
  }
  if ((die1 === 1 && die2 === 3) || (die1 === 3 && die2 === 1)) {
    console.log("single");
    return single(state);
  }
  if (die1 === 2 && die2 === 2) {
    console.log("single");
    return single(state);
  }
  if (die1 === 3 && die2 === 3) {
    console.log("single");
    return single(state);
  }
  if (die1 === 4 && die2 === 4) {
    console.log("walk");
    return walk(state);
  }
  if (die1 === 5 && die2 === 5) {
    console.log("walk");
    return walk(state);
  }
  if (die1 === 6 && die2 === 6) {
    console.log("triple");
    return triple(state);
  }
  console.log("out");
  return out(state);
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
    state = simulateAtBat(state);
  }

  return {
    runs: state.runs,
    hits: state.hits
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
