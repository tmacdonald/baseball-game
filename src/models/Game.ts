import Play from "./Play";

export type Player = string;

export interface Team {
  name: string;
  roster: Player[];
}

export default interface Game {
  teams: [Team, Team];
  rosters: [Player[], Player[]];
  battingOrder: Player[][];
  plays: Play[];
}
