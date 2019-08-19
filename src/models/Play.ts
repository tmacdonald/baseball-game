import Bases from "./Bases";
import { PlayerID } from "./Player";
import Action from "../actions/Action";

/**
 * This is a subset of Play without batter, bases, or runs filled out
 */
export interface PrePlay {
  inning: number;
  top: boolean;
  beforeBases: Bases;
  action: string;
}

export interface PostPlay {
  bases: Bases;
  runs: PlayerID[];
  batter: PlayerID;
  // Is this considered a hit on the scoresheet (ie. error is not)
  isHit: boolean;
  // Is this considered an at bat on the scoresheet (ie. walk is not)
  isAtBat: boolean;
  // The number of outs that happened during this play (ie. double play is two)
  numberOfOuts: number;
  // The number of errors that happened during this play
  numberOfErrors: number;
}

export interface ActionOutcome extends PostPlay {
  // Does this play cause the batter to be pulled from the on deck circle
  causesBatterChange: boolean;
}

export default interface Play extends PrePlay, PostPlay {}
