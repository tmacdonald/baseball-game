import { TeamID } from "../models/Team";
import Matchup from "../models/Matchup";

export type Round = Matchup[];

export default interface RoundRobinScheduler {
  (teams: TeamID[]): Round[];
}
