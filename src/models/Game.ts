import Play from "./Play";
import { PlayerID } from "./Player";

export interface Team {
  name: string;
  roster: PlayerID[];
}

export default interface Game {
  teams: [Team, Team];
  rosters: [PlayerID[], PlayerID[]];
  battingOrder: PlayerID[][];
  plays: Play[];
}
