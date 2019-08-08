import { Inning, Game } from "./models/Game";
import { isGameOver } from "./stats";

export function createGame(): Game {
  return {
    awayInnings: [],
    homeInnings: []
  };
}

interface Simulator {
  hits(): number;
  runs(hits: number): number;
}

const randomSimulator: Simulator = {
  hits: function(): number {
    return Math.floor(Math.random() * 3);
  },
  runs: function(hits: number): number {
    return Math.floor(Math.random() * 1.4 * hits);
  }
};

export function simulateInning(
  game: Game,
  simulator: Simulator = randomSimulator
): Game {
  return simulateNextInning(game, simulator);
}

export function simulateGame(
  game: Game,
  simulator: Simulator = randomSimulator
): Game {
  let simulatedGame = game;
  while (!isGameOver(simulatedGame)) {
    simulatedGame = simulateNextInning(simulatedGame, simulator);
  }
  return simulatedGame;
}

function createInning(simulator: Simulator): Inning {
  const hits = simulator.hits();
  const runs = simulator.runs(hits);

  return { hits, runs };
}

function simulateNextInning(game: Game, simulator: Simulator): Game {
  const { awayInnings, homeInnings } = game;
  if (awayInnings.length === homeInnings.length) {
    return {
      ...game,
      awayInnings: [...awayInnings, createInning(simulator)]
    };
  } else {
    return {
      ...game,
      homeInnings: [...homeInnings, createInning(simulator)]
    };
  }
}
