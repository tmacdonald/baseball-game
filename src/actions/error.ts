import { Player } from "../models/Game";
import Action from "./Action";
import Bases, { createBases } from "../models/Bases";
import { ActionOutcome } from "../models/Play";

const error: Action = {
  isPossible: (bases: Bases): boolean => true,

  perform: (batter: Player, bases: Bases): ActionOutcome => {
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
