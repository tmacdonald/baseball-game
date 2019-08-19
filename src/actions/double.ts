import { PlayerID } from "../models/Player";
import Action from "./Action";
import Bases, { createBases } from "../models/Bases";
import { ActionOutcome } from "../models/Play";

const double: Action = {
  name: "double",

  isPossible: (bases: Bases) => true,

  perform: (batter: PlayerID, bases: Bases): ActionOutcome => {
    const runs: PlayerID[] = [];
    if (!!bases.third) {
      runs.push(bases.third);
    }
    if (!!bases.second) {
      runs.push(bases.second);
    }
    return {
      batter,
      bases: createBases(undefined, batter, bases.first),
      isHit: true,
      isAtBat: true,
      numberOfOuts: 0,
      numberOfErrors: 0,
      causesBatterChange: true,
      runs
    };
  }
};

export default double;
