import Team from "../models/Team";
import Game from "../models/Game";

// given a list of teams and a list of games, return the blocks of home/away games
// for instance, if team A had 3 home games followed by 6 away games, the result would look like:
// { team: A, blocks: [3, 6] }
export type TeamScheduleBlock = {
  team: Team;
  blocks: number[];
};

export default function scheduleAnalyzer(
  teams: Team[],
  games: Game[]
): TeamScheduleBlock[] {
  return teams.map(team => {
    const blocks = [];
    let wasHome = null;
    let count = 0;

    const teamGames = games.filter(
      game =>
        game.teams[0].name === team.name || game.teams[1].name === team.name
    );

    for (let i = 0; i < teamGames.length; i = i + 1) {
      const game = teamGames[i];
      const isHome = game.teams[1].name === team.name;

      if (count === 0) {
        console.log("first iteration");
        wasHome = !isHome;
        count = 1;
      }

      console.log("another iteration", wasHome, isHome);
      if (wasHome !== isHome) {
        blocks.push(count);
        count = 1;
      } else {
        count = count + 1;
      }
      wasHome = isHome;
    }

    return {
      team,
      blocks: blocks
    };
  });
}
