import { Player } from "../models/Game";
import Bases from "../models/Bases";
import { ActionOutcome } from "../models/Play";
//import Count from "../models/Count";

export default interface Action {
  // Based on the bases, is it possible to perform this action (ie. double play must have a force out and less than 2 outs already)
  isPossible(bases: Bases<Player | undefined>, numberOfOuts: number): boolean;

  perform(batter: Player, bases: Bases<Player | undefined>): ActionOutcome;
}
