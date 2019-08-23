import Action from "./Action";
import Bases from "../models/Bases";
import { PlayerID } from "../models/Player";

export default interface ActionCreator {
  (batter: PlayerID, bases: Bases, numberOfOuts: number): Action;
}
