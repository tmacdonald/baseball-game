export function createGame() {
  return {
    awayInnings: [],
    homeInnings: []
  };
}

export function tickGame(game) {
  return nextInning(game);
}

function simulateInning() {
  const hits = Math.floor(Math.random() * 3);
  const runs = Math.floor(Math.random() * 1.4 * hits);

  return { hits, runs };
}

function nextInning(game) {
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
