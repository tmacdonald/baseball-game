import Game from "./models/Game";
import Inning from "./models/Inning";
import AtBatState from "./models/AtBatState";
import { createState } from "./utils";
import ActionCreator from "./actions/ActionCreator";

import { runs } from "./stats";

function log(message: any) {
  console.log(message);
}

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

  if (awayInnings.length < 9) {
    return false;
  }

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
    log("top of 1");
    return {
      ...game,
      awayInnings: [[createState()]]
    };
  }
  if (
    awayInnings.length > homeInnings.length &&
    isInningOver(last(awayInnings))
  ) {
    log(`bottom of ${awayInnings.length}`);
    return {
      ...game,
      homeInnings: [...homeInnings, [createState()]]
    };
  }
  if (
    awayInnings.length === homeInnings.length &&
    isInningOver(last(homeInnings))
  ) {
    log(`top of ${homeInnings.length + 1}`);
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

export function simulateInning(game: Game, createAction: ActionCreator): Game {
  let simulatedGame = game;

  if (isAwayTeamBatting(simulatedGame)) {
    do {
      simulatedGame = simulateAction(simulatedGame, createAction);
    } while (!isInningOver(last(simulatedGame.homeInnings)));
  } else {
    do {
      simulatedGame = simulateAction(simulatedGame, createAction);
    } while (!isInningOver(last(simulatedGame.awayInnings)));
  }

  return simulatedGame;
}

export function simulateGame(game: Game, createAction: ActionCreator): Game {
  let simulatedGame = game;
  while (!isGameOver(simulatedGame)) {
    simulatedGame = simulateAction(simulatedGame, createAction);
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
  log(action.name);

  const newState = action(state);
  log(newState);

  return newState;
}
