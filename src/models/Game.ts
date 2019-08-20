import Play from "./Play";
import { PlayerID } from "./Player";
import Team from "./Team";

export default interface Game {
  teams: [Team, Team];
  rosters: [PlayerID[], PlayerID[]];
  battingOrder: PlayerID[][];
  plays: Play[];
}
