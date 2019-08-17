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
    awayTeam,
    homeTeam,
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
  awayTeamBatting: boolean;
  bases: Bases;
} {
  const { plays } = game;

  const [awayPlays, homePlays] = splitPlaysByTeam(plays);
  const [lastAwayPlay, lastHomePlay] = [awayPlays, homePlays].map(_.last);

  if (!lastAwayPlay) {
    return { inning: 1, awayTeamBatting: true, bases: createBases() };
  }
  const awayInnings = lastAwayPlay.inning;
  const awayOuts = outs(awayPlays);

  if (awayOuts < awayInnings * 3) {
    return {
      inning: awayInnings,
      awayTeamBatting: true,
      bases: lastAwayPlay.bases
    };
  }

  if (!lastHomePlay) {
    return { inning: 1, awayTeamBatting: false, bases: createBases() };
  }

  const homeInnings = lastHomePlay.inning;
  const homeOuts = outs(homePlays);

  if (homeOuts < homeInnings * 3) {
    return {
      inning: homeInnings,
      awayTeamBatting: false,
      bases: lastHomePlay.bases
    };
  } else {
    if (awayInnings > homeInnings) {
      return {
        inning: awayInnings,
        awayTeamBatting: false,
        bases: createBases()
      };
    }
  }

  return {
    inning: homeInnings + 1,
    awayTeamBatting: true,
    bases: createBases()
  };
}

export function simulateAction(game: Game, createAction: ActionCreator): Game {
  const { inning, awayTeamBatting, bases: beforeBases } = getInningInformation(
    game
  );

  const action = createAction(beforeBases);

  const [batter, ...otherBatters] = game.battingOrder[awayTeamBatting ? 0 : 1];

  const actionOutcome = action.perform(batter, beforeBases);

  const play: Play = {
    ...actionOutcome,
    inning,
    top: awayTeamBatting,
    beforeBases,
    action
  };

  let newBattingOrder: Player[][];
  if (awayTeamBatting) {
    newBattingOrder = [[...otherBatters, batter], game.battingOrder[1]];
  } else {
    newBattingOrder = [game.battingOrder[0], [...otherBatters, batter]];
  }

  return {
    ...game,
    battingOrder: newBattingOrder,
    plays: [...game.plays, play]
  };
}

export function simulateInning(game: Game, createAction: ActionCreator): Game {
  const { inning, awayTeamBatting: top } = getInningInformation(game);
  let nextInning = inning;
  let nextTop = top;
  let nextGame = game;

  while (nextInning === inning && nextTop === top) {
    nextGame = simulateAction(nextGame, createAction);
    const { inning, awayTeamBatting: top } = getInningInformation(nextGame);
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
