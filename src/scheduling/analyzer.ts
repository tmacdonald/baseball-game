import Team from "../models/Team";
import Game from "../models/Game";
import _ from "lodash";

// given a list of teams and a list of games, return the blocks of home/away games
// for instance, if team A had 3 home games followed by 6 away games, the result would look like:
// { team: A, blocks: [3, 6] }
export type TeamScheduleBlock = {
  team: Team;
  blocks: number[];
};

export function createBlocks(array: any[]): any[][] {
  const result = [];
  let currentBlock = [];

  if (array.length === 0) {
    return [];
  }

  // push the first element of the array onto the current block
  currentBlock.push(array[0]);

  for (let i = 1; i < array.length; i = i + 1) {
    const current = _.first(currentBlock);
    const next = array[i];
    if (current !== undefined) {
      if (current === next) {
        currentBlock.push(next);
      } else {
        result.push(currentBlock);
        currentBlock = [next];
      }
    }
  }

  result.push(currentBlock);
  return result;
}

function isHomeGame(game: Game, team: Team): boolean {
  return game.teams[1].name === team.name;
}

export default function scheduleAnalyzer(
  teams: Team[],
  games: Game[]
): TeamScheduleBlock[] {
  return teams.map(team => {
    const teamGames = games.filter(
      game =>
        game.teams[0].name === team.name || game.teams[1].name === team.name
    );

    const homeAwayGames = teamGames.map(game => isHomeGame(game, team));

    const rawBlocks = createBlocks(homeAwayGames);
    const blocks = rawBlocks.map(block => block.length);

    return {
      team,
      blocks
    };
  });
}
