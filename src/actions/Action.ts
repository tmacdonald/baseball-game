import GameState from "../models/GameState";

export default interface Action {
  (state: GameState): GameState;
}
