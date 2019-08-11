import Inning from "./Inning";
import { GameState } from "./GameState";

export default interface Game {
  // awayInnings: Inning[];
  // homeInnings: Inning[];
  states: GameState[];
}
