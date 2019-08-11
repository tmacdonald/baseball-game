import Game from "./models/Game";
import Inning from "./models/Inning";
import AtBatState from "./models/AtBatState";
import { createState, inningState } from "./utils";
import ActionCreator from "./actions/ActionCreator";

import { runs } from "./stats";

export function createGame(): Game {
  return {
    awayInnings: [],
    homeInnings: []
  };
}

export function isGameOver(game: Game): boolean {
  const { awayInnings, homeInnings } = game;
  const homeRuns = runs(homeInnings);
  const awayRuns = runs(awayInnings);

  return (
    (awayInnings.length >= 9 &&
      isInningOver(last(awayInnings)) &&
      homeRuns > awayRuns) ||
    (awayInnings.length === homeInnings.length &&
      isInningOver(last(homeInnings)) &&
      awayRuns > homeRuns)
  );
}

function createInning(): Inning {
  return [createState()];
}

function last<T>(array: T[]): T {
  return array[array.length - 1];
}

function massageGame(game: Game): Game {
  // if appropriate, add a new inning
  const { awayInnings, homeInnings } = game;

  if (awayInnings.length === 0 && homeInnings.length === 0) {
    //console.log("top of 1");
    return {
      ...game,
      awayInnings: [[createState()]]
    };
  }
  if (
    awayInnings.length > homeInnings.length &&
    isInningOver(last(awayInnings))
  ) {
    //console.log(`bottom of ${awayInnings.length}`);
    return {
      ...game,
      homeInnings: [...homeInnings, [createState()]]
    };
  }
  if (
    awayInnings.length === homeInnings.length &&
    isInningOver(last(homeInnings))
  ) {
    //console.log(`top of ${homeInnings.length + 1}`);
    return {
      ...game,
      awayInnings: [...awayInnings, [createState()]]
    };
  }
  return game;
}

function isAwayTeamBatting(game: Game): boolean {
  return game.awayInnings.length > game.homeInnings.length;
}

export function simulateAction(game: Game, createAction: ActionCreator): Game {
  const massagedGame = massageGame(game);

  if (isAwayTeamBatting(massagedGame)) {
    const { awayInnings } = massagedGame;
    const inning = awayInnings[awayInnings.length - 1];
    const otherInnings = awayInnings.slice(0, awayInnings.length - 1);

    const state = inning[inning.length - 1];
    const nextState = _simulateAction(state, createAction);

    return {
      ...massagedGame,
      awayInnings: [...otherInnings, [...inning, nextState]]
    };
  }

  const { homeInnings } = massagedGame;
  const inning = homeInnings[homeInnings.length - 1];
  const otherInnings = homeInnings.slice(0, homeInnings.length - 1);

  const state = inning[inning.length - 1];
  const nextState = _simulateAction(state, createAction);

  return {
    ...massagedGame,
    homeInnings: [...otherInnings, [...inning, nextState]]
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

function isInningOver(inning: Inning): boolean {
  const mostRecentAction = inning[inning.length - 1];
  return mostRecentAction.outs === 3;
}

function _simulateAction(
  state: AtBatState,
  createAction: ActionCreator
): AtBatState {
  const action = createAction();
  //console.log(action.name);

  const newState = action(state);
  //console.log(newState);

  return newState;
}

function _createInning(createAction: ActionCreator): Inning {
  let state = createState();

  const inning: Inning = [];

  while (!isInningOver(inning)) {
    inning.push(state);
    state = _simulateAction(state, createAction);
  }

  return inning;
}

function simulateNextInning(game: Game): Game {
  const { awayInnings, homeInnings } = game;
  if (awayInnings.length === homeInnings.length) {
    //console.log(`top of ${awayInnings.length + 1}`);
    return {
      ...game,
      awayInnings: [...awayInnings, createInning()]
    };
  } else {
    //console.log(`bottom of ${homeInnings.length + 1}`);
    return {
      ...game,
      homeInnings: [...homeInnings, createInning()]
    };
  }
}
