import Play from "./Play";
import { PlayerID } from "./Player";
import Team from "./Team";

export default interface Game {
  id: string;
  date: Date;
  teams: [Team, Team];
  rosters: [PlayerID[], PlayerID[]];
  battingOrder: PlayerID[][];
  plays: Play[];
  complete: boolean;
}
