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

export function isGameOver(game) {
  const { awayInnings, homeInnings } = game;
  const homeRuns = runs(homeInnings);
  const awayRuns = runs(awayInnings);

  return (
    (homeInnings.length >= 9 &&
      homeInnings.length === awayInnings.length &&
      homeRuns !== awayRuns) ||
    (awayInnings.length === 9 &&
      homeInnings.length === 8 &&
      homeRuns > awayRuns)
  );
}

export function hits(innings) {
  return innings.map(inning => inning.hits).reduce((x, y) => x + y, 0) || 0;
}

export function runs(innings) {
  return innings.map(inning => inning.runs).reduce((x, y) => x + y, 0) || 0;
}
