import { Player } from "../models/Game";
import Bases, { createBases } from "../models/Bases";
import Action from "./Action";
import { ActionOutcome } from "../models/Play";

const triple: Action = {
  name: "triple",
  isPossible: (bases: Bases): boolean => true,

  perform: (batter: Player, bases: Bases): ActionOutcome => {
    const runs = [];
    if (!!bases.third) {
      runs.push(bases.third);
    }
    if (!!bases.second) {
      runs.push(bases.second);
    }
    if (!!bases.first) {
      runs.push(bases.first);
    }

    return {
      batter,
      bases: createBases(undefined, undefined, batter),
      runs,
      isAtBat: true,
      isHit: true,
      numberOfErrors: 0,
      numberOfOuts: 0,
      causesBatterChange: true
    };
  }
};

export default triple;
