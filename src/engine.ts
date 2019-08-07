import { Inning, Game } from "./models/Game";
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

function createInning(): Inning {
  const hits = Math.floor(Math.random() * 3);
  const runs = Math.floor(Math.random() * 1.4 * hits);

  return { hits, runs };
}

function simulateNextInning(game: Game): Game {
  const { awayInnings, homeInnings } = game;
  if (awayInnings.length === homeInnings.length) {
    return {
      ...game,
      awayInnings: [...awayInnings, createInning()]
    };
  } else {
    return {
      ...game,
      homeInnings: [...homeInnings, createInning()]
    };
  }
}
