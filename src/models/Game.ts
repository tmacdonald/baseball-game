import { GameState } from "./GameState";

type Player = string;

export interface Team {
  name: string;
  roster: Player[];
}

export default interface Game {
  awayTeam: Team;
  homeTeam: Team;
  states: GameState[];
}
