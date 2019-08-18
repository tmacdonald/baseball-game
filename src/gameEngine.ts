import Game, { Team, Player } from "./models/Game";
import Play from "./models/Play";
import ActionCreator from "./actions/ActionCreator";
import {
  out,
  flyOut,
  groundOut,
  popOut,
  strikeOut,
  doublePlay
} from "./actions";
import _ from "lodash";

import Bases, { createBases } from "./models/Bases";

function numberOfOuts(play: Play): number {
  const { action } = play;
  if (action === doublePlay) {
    return 2;
  }
  if ([out, flyOut, groundOut, strikeOut, popOut].includes(action)) {
    return 1;
  }
  return 0;
}

export function createGame(awayTeam: Team, homeTeam: Team): Game {
  return {
    teams: [awayTeam, homeTeam],
    rosters: [awayTeam.roster, homeTeam.roster],
    battingOrder: [awayTeam.roster, homeTeam.roster],
    plays: []
  };
}

// TODO This belongs in utils
export function splitArrayByPredicate<T>(
  array: T[],
  predicate: (item: T) => boolean
): [T[], T[]] {
  return [array.filter(predicate), array.filter(item => !predicate(item))];
}

export function splitGameByTeam(game: Game): [Play[], Play[]] {
  return splitPlaysByTeam(game.plays);
}

export function splitPlaysByTeam(plays: Play[]): [Play[], Play[]] {
  return splitArrayByPredicate(plays, play => play.top);
}

function sum(x: number, y: number) {
  return x + y;
}

/**
 * Determine the number of runs that were scored given a list of plays
 */
function runs(plays: Play[]) {
  return plays.map(play => play.runs.length).reduce(sum, 0);
}

/**
 * Determine the number of outs during a given a list of plays
 */
function outs(plays: Play[]) {
  return plays.map(numberOfOuts).reduce(sum, 0);
}

export function isGameOver(game: Game): boolean {
  const { plays } = game;

  const [awayPlays, homePlays] = splitPlaysByTeam(plays);
  const [awayRuns, homeRuns] = [awayPlays, homePlays].map(runs);

  // take a look at the last at bat and get the inning
  // if the away team has less than 3 times the number of innings player, the game can't be over
  const awayOuts = outs(awayPlays);
  if (awayOuts < 3 * 9) {
    return false;
  }

  const [awayInnings, homeInnings] = [awayPlays, homePlays]
    .map(_.last)
    .map(play => (!!play ? play.inning : 0));

  return (
    (awayInnings >= 9 &&
      isInningOver(awayPlays, awayInnings) &&
      homeRuns > awayRuns) ||
    (awayInnings === homeInnings &&
      isInningOver(homePlays, homeInnings) &&
      awayRuns > homeRuns)
  );
}

function getInningInformation(
  game: Game
): {
  inning: number;
  top: boolean;
  bases: Bases;
  numberOfOuts: number;
} {
  const { plays } = game;

  // get the last play
  const lastPlay = _.last(plays);

  // if there is no last play, the game is about to start
  if (lastPlay === undefined) {
    return { inning: 1, top: true, bases: createBases(), numberOfOuts: 0 };
  }

  const { inning, top } = lastPlay;
  const inningPlays = plays.filter(
    play => play.inning === inning && play.top === top
  );

  // if the current inning is over, start the next inning
  const numberOfOuts = outs(inningPlays);
  if (numberOfOuts === 3) {
    if (top) {
      // if we were in the top half of an inning, switch to the bottom half
      return { inning, top: !top, bases: createBases(), numberOfOuts: 0 };
    }
    // otherwise, switch to the top half of the next inning
    return {
      inning: inning + 1,
      top: !top,
      bases: createBases(),
      numberOfOuts: 0
    };
  }

  // default case: ust the current half inning and the last play's bases as the input to the next play
  return { inning, top, bases: lastPlay.bases, numberOfOuts };
}

function getNextBatter(battingOrder: Player[][], top: boolean): Player {
  const [batter] = battingOrder[top ? 0 : 1];
  return batter;
}

function updateBattingOrder(
  battingOrder: Player[][],
  top: boolean
): Player[][] {
  const [batter, ...otherBatters] = battingOrder[top ? 0 : 1];
  if (top) {
    return [[...otherBatters, batter], battingOrder[1]];
  }
  return [battingOrder[0], [...otherBatters, batter]];
}

export function simulateAction(game: Game, createAction: ActionCreator): Game {
  const { battingOrder, plays } = game;
  const {
    inning,
    top,
    bases: beforeBases,
    numberOfOuts
  } = getInningInformation(game);

  const action = createAction(beforeBases, numberOfOuts);

  const batter = getNextBatter(battingOrder, top);

  const actionOutcome = action.perform(batter, beforeBases);

  const play: Play = {
    ...actionOutcome,
    inning,
    top: top,
    beforeBases,
    action
  };

  //console.log(play);

  return {
    ...game,
    battingOrder: updateBattingOrder(battingOrder, top),
    plays: [...plays, play]
  };
}

export function simulateInning(game: Game, createAction: ActionCreator): Game {
  const { inning, top } = getInningInformation(game);
  let nextInning = inning;
  let nextTop = top;
  let nextGame = game;

  while (nextInning === inning && nextTop === top) {
    nextGame = simulateAction(nextGame, createAction);
    const { inning, top } = getInningInformation(nextGame);
    nextInning = inning;
    nextTop = top;
  }

  return nextGame;
}

export function simulateGame(game: Game, createAction: ActionCreator): Game {
  let simulatedGame = game;
  while (!isGameOver(simulatedGame)) {
    simulatedGame = simulateAction(simulatedGame, createAction);
  }
  return simulatedGame;
}

function isInningOver(plays: Play[], inning: number) {
  const outs = plays
    .filter(play => play.inning === inning)
    .map(numberOfOuts)
    .reduce(sum, 0);
  return outs === 3;
}
