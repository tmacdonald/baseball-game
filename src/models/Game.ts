//import { GameState } from "./GameState";
import AtBat from "./AtBat";

export type Player = string;

export interface Team {
  name: string;
  roster: Player[];
}

export default interface Game {
  awayTeam: Team;
  homeTeam: Team;
  awayAtBats: AtBat[];
  homeAtBats: AtBat[];
}
