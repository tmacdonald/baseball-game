import Action from "./Action";
import Bases from "../models/Bases";

export default interface ActionCreator {
  (bases: Bases, numberOfOuts: number): Action;
}
