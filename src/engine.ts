import { Inning, Game } from "./models/Game";
import { isGameOver } from "./stats";

export function createGame(): Game {
  return {
    awayInnings: [],
    homeInnings: []
  };
}

export function tickGame(game: Game): Game {
  return nextInning(game);
}

export function simulateGame(game: Game): Game {
  let simulatedGame = game;
  while (!isGameOver(simulatedGame)) {
    simulatedGame = nextInning(simulatedGame);
  }
  return simulatedGame;
}

function simulateInning(): Inning {
  const hits = Math.floor(Math.random() * 3);
  const runs = Math.floor(Math.random() * 1.4 * hits);

  return { hits, runs };
}

function nextInning(game: Game): Game {
  const { awayInnings, homeInnings } = game;
  if (awayInnings.length === homeInnings.length) {
    return {
      ...game,
      awayInnings: [...awayInnings, simulateInning()]
    };
  } else {
    return {
      ...game,
      homeInnings: [...homeInnings, simulateInning()]
    };
  }
}
