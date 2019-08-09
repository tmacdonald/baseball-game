import AtBatState from "../models/AtBatState";

export default interface Action {
  (state: AtBatState): AtBatState;
}
