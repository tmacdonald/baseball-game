import { PlayerID } from "../models/Player";
import Action from "./Action";
import Bases, { createBases } from "../models/Bases";
import { ActionOutcome } from "../models/Play";

const error: Action = {
  name: "error",

  isPossible: (bases: Bases): boolean => true,

  perform: (batter: PlayerID, bases: Bases): ActionOutcome => {
    return {
      batter,
      bases: createBases(batter, bases.first, bases.second),
      runs: !!bases.third ? [bases.third] : [],
      isHit: false,
      isAtBat: true,
      numberOfErrors: 1,
      numberOfOuts: 0,
      causesBatterChange: true
    };
  }
};

export default error;
