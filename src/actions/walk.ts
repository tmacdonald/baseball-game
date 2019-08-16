import { Player } from "../models/Game";
import Bases, { createBases } from "../models/Bases";
import { ActionOutcome } from "../models/Play";
import Action from "./Action";

const walk: Action = {
  isPossible: (bases: Bases<Player | undefined>): boolean => true,

  perform: (
    batter: Player,
    bases: Bases<Player | undefined>
  ): ActionOutcome => {
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
