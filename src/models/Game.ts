import Play from "./Play";

export type Player = string;

export interface Team {
  name: string;
  roster: Player[];
}

export default interface Game {
  awayTeam: Team;
  homeTeam: Team;
  battingOrder: Player[][];

  plays: Play[];
}
