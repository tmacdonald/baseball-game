import { PlayerID } from "../models/Player";
import Bases, { createBases } from "../models/Bases";
import { ActionOutcome } from "../models/Play";
import Action from "./Action";

const walk: Action = {
  name: "walk",
  isPossible: (bases: Bases): boolean => true,

  perform: (batter: PlayerID, bases: Bases): ActionOutcome => {
    return {
      batter,
      bases: createBases(
        batter,
        !!bases.first ? bases.first : bases.second,
        !!bases.first && bases.second ? bases.second : bases.third
      ),
      runs:
        !!bases.first && !!bases.second && !!bases.third ? [bases.third] : [],
      isAtBat: false,
      isHit: false,
      numberOfErrors: 0,
      numberOfOuts: 0,
      causesBatterChange: true
    };
  }
};

export default walk;
