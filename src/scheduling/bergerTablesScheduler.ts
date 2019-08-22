import { TeamID } from "../models/Team";
import RoundRobinScheduler from "./RoundRobinScheduler";
import Matchup from "../models/Matchup";
import _ from "lodash";

const bergerTablesScheduler: RoundRobinScheduler = function(teams: TeamID[]) {
  // Note, this requires that no TeamIDs are blank
  const dummy = "";

  if (teams.some(team => team === "")) {
    throw "Team of '' is not allowed";
  }

  if (teams.length % 2 !== 0) {
    teams.push(dummy);
  }

  const n = teams.length;
  const numberOfRounds = n - 1;
  const gamesPerRound = n / 2;

  let columnA = teams.slice(0, gamesPerRound);
  let columnB = teams.slice(gamesPerRound);
  const fixed = teams[0];

  return _.range(numberOfRounds).map((entry, i) => {
    const round = _.range(gamesPerRound).reduce(
      (matchups: Matchup[], _: number, k: number): Matchup[] => {
        const team1 = columnA[k];
        const team2 = columnB[k];
        if (team1 !== dummy && team2 !== dummy) {
          // special case so that the first team in the list isn't always the away team
          if (k === 0 && i % 2 === 1) {
            return [...matchups, [team2, team1]];
          }
          return [...matchups, [team1, team2]];
        }
        return matchups;
      },
      []
    );

    columnA = [fixed, columnB.shift() || "", ...columnA.slice(1)];
    columnB.push(columnA.pop() || "");
    return round;
  });
};

export default bergerTablesScheduler;
