import { Player } from "../models/Game";
import Bases, { createBases } from "../models/Bases";
import { ActionOutcome } from "../models/Play";
import Action from "./Action";

const single: Action = {
  name: "single",
  isPossible: (bases: Bases): boolean => true,

  perform: (batter: Player, bases: Bases): ActionOutcome => {
    const runs = [];
    if (!!bases.third) {
      runs.push(bases.third);
    }

    return {
      batter,
      bases: createBases(batter, bases.first, bases.second),
      runs,
      isAtBat: true,
      isHit: true,
      numberOfErrors: 0,
      numberOfOuts: 0,
      causesBatterChange: true
    };
  }
};

export default single;
