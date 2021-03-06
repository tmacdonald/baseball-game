import Play from "./models/Play";
import Game from "./models/Game";
import Team from "./models/Team";
import { PlayerID } from "./models/Player";
import { splitGameByTeam, isGameOver } from "./gameEngine";
import { single, double, triple, homeRun, error, walk } from "./actions";
import _ from "lodash";
import TeamRecord from "./models/TeamRecord";

function sum(x: number, y: number) {
  return x + y;
}

const isHit = (play: Play): boolean => play.isHit;
const isAtBat = (play: Play): boolean => play.isAtBat;
const isWalk = (play: Play): boolean => play.action === walk.name;
const isError = (play: Play): boolean => play.action === error.name;

function runsPerPlay(play: Play): number {
  return play.runs.length;
}

export function numberOfPlays(game: Game): number {
  return game.plays.length;
}

export function sliceGame(game: Game, numberOfPlays: number): Game {
  return {
    ...game,
    plays: game.plays.slice(0, numberOfPlays)
  };
}

export function hits(game: Game): [number, number] {
  const [awayplays, homeplays] = splitGameByTeam(game);

  const awayHits = awayplays.filter(isHit).length;
  const homeHits = homeplays.filter(isHit).length;

  return [awayHits, homeHits];
}

export function runs(game: Game): [number, number] {
  const [awayplays, homeplays] = splitGameByTeam(game);

  const awayRuns = awayplays.map(runsPerPlay).reduce(sum, 0);
  const homeRuns = homeplays.map(runsPerPlay).reduce(sum, 0);

  return [awayRuns, homeRuns];
}

export function runsByInning(game: Game): [number[], number[]] {
  const [awayplays, homeplays] = splitGameByTeam(game);

  const awayplaysGroupedByInning = _.values(_.groupBy(awayplays, "inning")).map(
    inningplays => inningplays.map(runsPerPlay).reduce(sum, 0)
  );

  const homeplaysGroupedByInning = _.values(_.groupBy(homeplays, "inning")).map(
    inningplays => inningplays.map(runsPerPlay).reduce(sum, 0)
  );

  return [awayplaysGroupedByInning, homeplaysGroupedByInning];
}

export function errors(game: Game): [number, number] {
  const [awayplays, homeplays] = splitGameByTeam(game);

  const awayErrors = awayplays.filter(isError).length;
  const homeErrors = homeplays.filter(isError).length;

  return [homeErrors, awayErrors];
}

interface Statistics {
  atBats: number;
  singles: number;
  doubles: number;
  triples: number;
  homeRuns: number;
  hits: number;
  battingAverage: number;
  rbis: number;
  walks: number;
  runs: number;
}
interface PlayerStatistics extends Statistics {
  player: PlayerID;
  playerRuns: number;
}

function isBatter(player: PlayerID): (play: Play) => boolean {
  return (play: Play): boolean => {
    return play.batter === player;
  };
}

function statsByPlays(plays: Play[]): Statistics {
  const singles = plays.filter(play => play.action === single.name).length;
  const doubles = plays.filter(play => play.action === double.name).length;
  const triples = plays.filter(play => play.action === triple.name).length;
  const homeRuns = plays.filter(play => play.action === homeRun.name).length;
  const hits = plays.filter(isHit).length;

  const rbis = plays
    .filter(a => isHit(a) || isWalk(a))
    .map(play => play.runs.length)
    .reduce(sum, 0);

  const runs = plays.map(play => play.runs.length).reduce(sum, 0);

  const walks = plays.filter(isWalk).length;

  const atBats = plays.filter(isAtBat).length;

  const battingAverage = atBats > 0 ? _.round(hits / atBats, 3) : 0;

  return {
    atBats,
    singles,
    doubles,
    triples,
    homeRuns,
    hits,
    runs,
    rbis,
    walks,
    battingAverage
  };
}

function playerStatsByPlays(plays: Play[], player: PlayerID): PlayerStatistics {
  const playerPlays = plays.filter(isBatter(player));
  const playerStatsByPlays = statsByPlays(playerPlays);
  const runs = plays.flatMap(play => play.runs).filter(run => run === player)
    .length;

  return {
    player,
    ...playerStatsByPlays,
    playerRuns: runs
  };
}

export function playerStatisticsByGame(
  game: Game,
  player: PlayerID
): PlayerStatistics {
  return playerStatsByPlays(game.plays, player);
}

export function playerStatisticsByGames(
  games: Game[],
  player: PlayerID
): PlayerStatistics {
  return playerStatsByPlays(games.flatMap(game => game.plays), player);
}

export function statisticsByGames(
  teamName: string | undefined,
  games: Game[]
): Statistics {
  let plays = [];
  if (teamName !== undefined) {
    plays = games.flatMap(game => {
      if (game.teams[0].name === teamName) {
        return game.plays.filter(play => play.top);
      }
      return game.plays.filter(play => !play.top);
    });
  } else {
    plays = games.flatMap(game => game.plays);
  }
  return statsByPlays(plays);
}

interface TeamStandings extends TeamRecord {
  team: Team;
  runsScored: number;
  runsAgainst: number;
}

const isTeam = (team: Team) => (game: Game) =>
  game.teams.filter(gameTeam => team.name === gameTeam.name).length > 0;

export function teamRecord(teams: Team[], games: Game[]): TeamRecord[] {
  return teams.map(team => {
    const teamGames = games.filter(isTeam(team));
    const completedGames = teamGames.filter(isGameOver);
    const wins = completedGames.filter(game => {
      const [awayTeam, homeTeam] = game.teams;
      const [awayRuns, homeRuns] = runs(game);
      return (
        (awayTeam.name === team.name && awayRuns > homeRuns) ||
        (homeTeam.name === team.name && homeRuns > awayRuns)
      );
    }).length;
    const losses = completedGames.length - wins;
    return {
      team,
      wins,
      losses
    };
  });
}

export function lastNGamesRecord(
  teams: Team[],
  games: Game[],
  numberOfGames: number
): TeamRecord[] {
  return teams.map(team => {
    const teamGames = games.filter(isTeam(team));
    const completedGames = teamGames.filter(isGameOver);
    const lastNGames = _.takeRight(completedGames, numberOfGames);

    const wins = lastNGames.filter(game => {
      const [awayTeam, homeTeam] = game.teams;
      const [awayRuns, homeRuns] = runs(game);
      return (
        (awayTeam.name === team.name && awayRuns > homeRuns) ||
        (homeTeam.name === team.name && homeRuns > awayRuns)
      );
    }).length;
    const losses = lastNGames.length - wins;
    return {
      team,
      wins,
      losses
    };
  });
}

export function homeTeamRecord(teams: Team[], games: Game[]): TeamRecord[] {
  const isHomeTeam = (team: Team) => (game: Game) =>
    game.teams[1].name === team.name;

  return teams.map(team => {
    const teamGames = games.filter(isHomeTeam(team));
    const completedGames = teamGames.filter(isGameOver);
    const wins = completedGames.filter(game => {
      const [awayRuns, homeRuns] = runs(game);
      return homeRuns > awayRuns;
    }).length;
    const losses = completedGames.length - wins;
    return {
      team,
      wins,
      losses
    };
  });
}

export function awayTeamRecord(teams: Team[], games: Game[]): TeamRecord[] {
  const isHomeTeam = (team: Team) => (game: Game) =>
    game.teams[0].name === team.name;

  return teams.map(team => {
    const teamGames = games.filter(isHomeTeam(team));
    const completedGames = teamGames.filter(isGameOver);
    const wins = completedGames.filter(game => {
      const [awayRuns, homeRuns] = runs(game);
      return homeRuns < awayRuns;
    }).length;
    const losses = completedGames.length - wins;
    return {
      team,
      wins,
      losses
    };
  });
}

interface TeamStreak {
  team: Team;
  wins: number;
  losses: number;
}

interface Score {
  runsFor: number;
  runsAgainst: number;
}

function teamScores(team: Team, games: Game[]): Score[] {
  return games.map(game => {
    const [awayTeam, homeTeam] = game.teams;
    const [awayRuns, homeRuns] = runs(game);
    return {
      runsFor: awayTeam.name === team.name ? awayRuns : homeRuns,
      runsAgainst: awayTeam.name === team.name ? homeRuns : awayRuns
    };
  });
}

export function streak(teams: Team[], games: Game[]): TeamStreak[] {
  return teams.map(team => {
    const teamGames = games.filter(isTeam(team));
    const completedGames = teamGames.filter(isGameOver);
    const scores = teamScores(team, completedGames);

    const wins = _.takeRightWhile(
      scores,
      score => score.runsFor > score.runsAgainst
    ).length;
    const losses = _.takeRightWhile(
      scores,
      score => score.runsAgainst > score.runsFor
    ).length;

    return {
      team,
      wins,
      losses
    };
  });
}

function teamStats(team: Team, games: Game[]): TeamStandings {
  const teamGames = games.filter(isTeam(team));
  const completedGames = teamGames.filter(isGameOver);
  const wins = completedGames.filter(game => {
    const [awayTeam, homeTeam] = game.teams;
    const [awayRuns, homeRuns] = runs(game);
    return (
      (awayTeam.name === team.name && awayRuns > homeRuns) ||
      (homeTeam.name === team.name && homeRuns > awayRuns)
    );
  }).length;
  const losses = completedGames.length - wins;

  const runsScored = teamGames.reduce((accumulatedRuns, game) => {
    const [awayTeam] = game.teams;
    const [awayRuns, homeRuns] = runs(game);
    const runsScored = awayTeam.name === team.name ? awayRuns : homeRuns;
    return accumulatedRuns + runsScored;
  }, 0);

  const runsAgainst = teamGames.reduce((accumulatedRuns, game) => {
    const [awayTeam] = game.teams;
    const [awayRuns, homeRuns] = runs(game);
    const runsScored = awayTeam.name === team.name ? homeRuns : awayRuns;
    return accumulatedRuns + runsScored;
  }, 0);

  return {
    team,
    wins,
    losses,
    runsScored,
    runsAgainst
  };
}

export function standings(teams: Team[], games: Game[]): TeamStandings[] {
  return teams.map(team => teamStats(team, games));
}
