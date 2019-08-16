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

function log(message: any) {
  //console.log(message);
}

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
    plays: []
  };
}

export function splitPlays(game: Game): [Play[], Play[]] {
  const awayplays = game.plays.filter(play => play.top);
  const homeplays = game.plays.filter(play => !play.top);

  return [awayplays, homeplays];
}

export function innings(game: Game) {
  const { plays: plays } = game;

  const awayplays = plays.filter(play => play.top);
  const homeplays = plays.filter(play => !play.top);

  const awayInnings = _.values(_.groupBy(awayplays, "inning"));
  const homeInnings = _.values(_.groupBy(homeplays, "inning"));

  return { awayInnings, homeInnings };
}

function sum(x: number, y: number) {
  return x + y;
}

export function isGameOver(game: Game): boolean {
  const { plays: plays } = game;

  const awayplays = plays.filter(play => play.top);
  const homeplays = plays.filter(play => !play.top);

  const awayRuns = awayplays.map(play => play.runs.length).reduce(sum, 0);
  const awayOuts = awayplays.map(numberOfOuts).reduce(sum, 0);
  const homeRuns = homeplays.map(play => play.runs.length).reduce(sum, 0);

  const lastAwayplay = _.last(awayplays);
  const lastHomeplay = _.last(homeplays);

  if (!lastAwayplay || !lastHomeplay) {
    return false;
  }

  const awayInnings = lastAwayplay.inning;
  const homeInnings = lastHomeplay.inning;

  // take a look at the last at bat and get the inning
  // if the away team has less than 3 times the number of innings player, the game can't be over
  if (awayOuts < 3 * 9) {
    return false;
  }

  return (
    (awayInnings >= 9 &&
      isInningOver(awayplays, awayInnings) &&
      homeRuns > awayRuns) ||
    (awayInnings === homeInnings &&
      isInningOver(homeplays, homeInnings) &&
      awayRuns > homeRuns)
  );
}

function getInningInformation(
  game: Game
): {
  inning: number;
  awayTeamBatting: boolean;
  bases: Bases<Player | undefined>;
} {
  const { plays: plays } = game;

  const awayplays = plays.filter(play => play.top);
  const homeplays = plays.filter(play => !play.top);

  const lastAwayplay = _.last(awayplays);
  const lastHomeplay = _.last(homeplays);

  if (!lastAwayplay) {
    return { inning: 1, awayTeamBatting: true, bases: createBases() };
  }
  const awayInnings = lastAwayplay.inning;
  const awayOuts = awayplays.map(numberOfOuts).reduce(sum, 0);

  if (awayOuts < awayInnings * 3) {
    return {
      inning: awayInnings,
      awayTeamBatting: true,
      bases: lastAwayplay.bases
    };
  }

  if (!lastHomeplay) {
    return { inning: 1, awayTeamBatting: false, bases: createBases() };
  }

  const homeInnings = lastHomeplay.inning;
  const homeOuts = homeplays.map(numberOfOuts).reduce(sum, 0);

  if (homeOuts < homeInnings * 3) {
    return {
      inning: homeInnings,
      awayTeamBatting: false,
      bases: lastHomeplay.bases
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

  const team = awayTeamBatting ? "awayTeam" : "homeTeam";

  const action = createAction(beforeBases);

  const [batter, ...remainingRoster] = game[team].roster;

  const actionOutcome = action.perform(batter, beforeBases);

  const play: Play = {
    ...actionOutcome,
    inning,
    top: awayTeamBatting,
    beforeBases,
    action
  };

  return {
    ...game,
    [team]: {
      ...game[team],
      roster: [...remainingRoster, batter]
    },
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
