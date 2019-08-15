import { Player } from "../models/Game";
import Bases from "../models/Bases";
//import Count from "../models/Count";

export default interface Action {
  // Is this considered a hit on the scoresheet (ie. error is not)
  isHit(): boolean;
  // Is this considered an at bat on the scoresheet (ie. walk is not)
  isAtBat(): boolean;
  // The number of outs this action represents (ie. double play is two)
  numberOfOuts(): number;
  // Based on the bases, is it possible to perform this action (ie. double play must have a force out)
  isPossible(bases: Bases<Player | undefined>): boolean;
  // Does the action cause the batter to pulled from the on deck circle
  causesBatterChange(): boolean;

  // Given a batter and the state of the bases, return the modification of the bases based on the action
  updateBases: (
    batter: Player,
    bases: Bases<Player | undefined>
  ) => Bases<Player | undefined>;
  // Given a batter and the state of the bases, return the players that would score a run
  updateRuns: (batter: Player, bases: Bases<Player | undefined>) => Player[];
  // Future: Given a count (balls, strikes), return the modification to the count
  // updateCount: (beforeCount: Count) => Count;
}
