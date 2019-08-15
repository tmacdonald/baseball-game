import Action from "./Action";
import { Player } from "../models/Game";
import Bases from "../models/Bases";

export default interface ActionCreator {
  (bases: Bases<Player | undefined>): Action;
}
