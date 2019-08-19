import { PlayerID } from "../models/Player";
import Bases, { createBases } from "../models/Bases";
import Action from "./Action";
import { ActionOutcome } from "../models/Play";

const homeRun: Action = {
  name: "homeRun",
  isPossible: (bases: Bases): boolean => true,

  perform: (batter: PlayerID, bases: Bases): ActionOutcome => {
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
    runs.push(batter);

    return {
      batter,
      bases: createBases(),
      runs,
      isAtBat: true,
      isHit: true,
      numberOfErrors: 0,
      numberOfOuts: 0,
      causesBatterChange: true
    };
  }
};

export default homeRun;
