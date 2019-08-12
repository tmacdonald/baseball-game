import Game, { Team } from "./models/Game";
import Inning from "./models/Inning";
import { GameState } from "./models/GameState";
import { createState } from "./utils";
import ActionCreator from "./actions/ActionCreator";
import _ from "lodash";

import { runs } from "./stats";

function log(message: any) {
  //console.log(message);
}

export function createGame(awayTeam: Team, homeTeam: Team): Game {
  return {
    awayTeam,
    homeTeam,
    states: []
  };
}

export function innings(game: Game) {
  const awayStates = game.states.filter(state => state.topOfInning);
  const homeStates = game.states.filter(state => !state.topOfInning);

  const awayInnings = _.values(_.groupBy(awayStates, "inning"));
  const homeInnings = _.values(_.groupBy(homeStates, "inning"));

  return { awayInnings, homeInnings };
}

export function isGameOver(game: Game): boolean {
  const { awayInnings, homeInnings } = innings(game);
  const homeRuns = runs(homeInnings);
  const awayRuns = runs(awayInnings);

  if (awayInnings.length < 9) {
    return false;
  }

  return (
    (awayInnings.length >= 9 &&
      isInningOver(_.last(awayInnings)) &&
      homeRuns > awayRuns) ||
    (awayInnings.length === homeInnings.length &&
      isInningOver(_.last(homeInnings)) &&
      awayRuns > homeRuns)
  );
}

function massageGame(game: Game): Game {
  const state = _.last(game.states);

  if (state !== undefined) {
    if (state.outs === 3) {
      if (state.topOfInning) {
        return {
          ...game,
          states: [
            ...game.states,
            createState({
              topOfInning: false,
              inning: state.inning
            })
          ]
        };
      } else {
        return {
          ...game,
          states: [
            ...game.states,
            createState({
              topOfInning: true,
              inning: state.inning + 1
            })
          ]
        };
      }
    }
  } else {
    return {
      ...game,
      states: [createState({ topOfInning: true, inning: 1 })]
    };
  }

  return game;
}

function populatePlayer(state: GameState, game: Game): [GameState, Game] {
  if (state.topOfInning) {
    const [player, ...roster] = game.awayTeam.roster;
    return [
      {
        ...state,
        player
      },
      {
        ...game,
        awayTeam: {
          ...game.awayTeam,
          roster: [...roster, player]
        }
      }
    ];
  }
  const [player, ...roster] = game.homeTeam.roster;
  return [
    {
      ...state,
      player
    },
    {
      ...game,
      homeTeam: {
        ...game.homeTeam,
        roster: [...roster, player]
      }
    }
  ];
}

export function simulateAction(game: Game, createAction: ActionCreator): Game {
  const massagedGame = massageGame(game);

  const state = _.last(massagedGame.states);

  if (state !== undefined) {
    const nextState = _simulateAction(state, createAction);
    const [nextStateWithPlayer, adjustedRosterGame] = populatePlayer(
      nextState,
      massagedGame
    );
    return {
      ...adjustedRosterGame,
      states: [...adjustedRosterGame.states, nextStateWithPlayer]
    };
  }

  return game;
}

export function simulateInning(game: Game, createAction: ActionCreator): Game {
  let nextGame = game;
  let lastState: GameState | undefined;

  do {
    nextGame = simulateAction(nextGame, createAction);
    lastState = _.last(nextGame.states);
  } while (lastState !== undefined && lastState.outs !== 3);

  return nextGame;
}

export function simulateGame(game: Game, createAction: ActionCreator): Game {
  let simulatedGame = game;
  while (!isGameOver(simulatedGame)) {
    simulatedGame = simulateAction(simulatedGame, createAction);
  }
  return simulatedGame;
}

function isInningOver(inning: Inning | undefined): boolean {
  if (inning === undefined) {
    return false;
  }
  const mostRecentAction = inning[inning.length - 1];
  return mostRecentAction.outs === 3;
}

function _simulateAction(
  state: GameState,
  createAction: ActionCreator
): GameState {
  const action = createAction();
  log(action.name);

  const newState = action(state);
  log(newState);

  return newState;
}
