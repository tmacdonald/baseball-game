import { GameState } from "./GameState";

export default interface Game {
  awayTeam: string;
  homeTeam: string;
  states: GameState[];
}
