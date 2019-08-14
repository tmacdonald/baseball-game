import Game, { Team, Player } from "./models/Game";
import AtBat from "./models/Play";
import ActionCreator from "./actions/ActionCreator";
import out from "./actions/out";
import _ from "lodash";

import Bases, { createBases } from "./models/Bases";

function log(message: any) {
  //console.log(message);
}

function isOut(atBat: AtBat): boolean {
  return atBat.action === out;
}

export function createGame(awayTeam: Team, homeTeam: Team): Game {
  return {
    awayTeam,
    homeTeam,
    plays: []
  };
}

export function splitAtBats(game: Game): [AtBat[], AtBat[]] {
  const awayAtBats = game.plays.filter(atBat => atBat.top);
  const homeAtBats = game.plays.filter(atBat => !atBat.top);

  return [awayAtBats, homeAtBats];
}

export function innings(game: Game) {
  const { plays: atBats } = game;

  const awayAtBats = atBats.filter(atBat => atBat.top);
  const homeAtBats = atBats.filter(atBat => !atBat.top);

  const awayInnings = _.values(_.groupBy(awayAtBats, "inning"));
  const homeInnings = _.values(_.groupBy(homeAtBats, "inning"));

  return { awayInnings, homeInnings };
}

function sum(x: number, y: number) {
  return x + y;
}

export function isGameOver(game: Game): boolean {
  const { plays: atBats } = game;

  const awayAtBats = atBats.filter(atBat => atBat.top);
  const homeAtBats = atBats.filter(atBat => !atBat.top);

  const awayRuns = awayAtBats.map(atBat => atBat.runs.length).reduce(sum, 0);
  const awayOuts = awayAtBats.filter(isOut).length;
  const homeRuns = homeAtBats.map(atBat => atBat.runs.length).reduce(sum, 0);

  const lastAwayAtBat = _.last(awayAtBats);
  const lastHomeAtBat = _.last(homeAtBats);

  if (!lastAwayAtBat || !lastHomeAtBat) {
    return false;
  }

  const awayInnings = lastAwayAtBat.inning;
  const homeInnings = lastHomeAtBat.inning;

  // take a look at the last at bat and get the inning
  // if the away team has less than 3 times the number of innings player, the game can't be over
  if (awayOuts < 3 * 9) {
    return false;
  }

  return (
    (awayInnings >= 9 &&
      isInningOver(awayAtBats, awayInnings) &&
      homeRuns > awayRuns) ||
    (awayInnings === homeInnings &&
      isInningOver(homeAtBats, homeInnings) &&
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
  const { plays: atBats } = game;

  const awayAtBats = atBats.filter(atBat => atBat.top);
  const homeAtBats = atBats.filter(atBat => !atBat.top);

  const lastAwayAtBat = _.last(awayAtBats);
  const lastHomeAtBat = _.last(homeAtBats);

  if (!lastAwayAtBat) {
    return { inning: 1, awayTeamBatting: true, bases: createBases() };
  }
  const awayInnings = lastAwayAtBat.inning;
  const awayOuts = awayAtBats.filter(isOut).length;

  if (awayOuts < awayInnings * 3) {
    return {
      inning: awayInnings,
      awayTeamBatting: true,
      bases: lastAwayAtBat.bases
    };
  }

  if (!lastHomeAtBat) {
    return { inning: 1, awayTeamBatting: false, bases: createBases() };
  }

  const homeInnings = lastHomeAtBat.inning;
  const homeOuts = homeAtBats.filter(isOut).length;

  if (homeOuts < homeInnings * 3) {
    return {
      inning: homeInnings,
      awayTeamBatting: false,
      bases: lastHomeAtBat.bases
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

  const action = createAction();

  const [batter, ...remainingRoster] = game[team].roster;

  const { bases, runs } = action(batter, beforeBases);

  const atBat: AtBat = {
    inning,
    top: awayTeamBatting,
    beforeBases,
    bases,
    runs,
    batter,
    action
  };

  console.log(atBat);

  return {
    ...game,
    [team]: {
      ...game[team],
      roster: [...remainingRoster, batter]
    },
    plays: [...game.plays, atBat]
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

function isInningOver(atBats: AtBat[], inning: number) {
  const inningAtBats = atBats
    .filter(atBat => atBat.inning === inning)
    .filter(isOut);
  return inningAtBats.length === 3;
}
