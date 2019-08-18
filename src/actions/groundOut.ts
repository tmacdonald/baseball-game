import { Player } from "../models/Game";
import Bases, { createBases, isLoaded } from "../models/Bases";
import Action from "./Action";
import { ActionOutcome } from "../models/Play";

const groundOut: Action = {
  isPossible: (bases: Bases): boolean => true,

  perform: (batter: Player, bases: Bases): ActionOutcome => {
    let nextBases = bases;

    if (isLoaded(bases)) {
      nextBases = createBases(batter, bases.first, bases.second);
    } else if (!!bases.first && !!bases.second && !bases.third) {
      nextBases = createBases(batter, bases.first);
    } else if (!!bases.first && !bases.second && !bases.third) {
      nextBases = createBases(batter);
    } else if (!!bases.first && !bases.second && !!bases.third) {
      nextBases = createBases(batter, undefined, bases.third);
    }

    return {
      batter,
      bases: nextBases,
      runs: [],
      isHit: false,
      isAtBat: true,
      numberOfErrors: 0,
      numberOfOuts: 1,
      causesBatterChange: true
    };
  }
};

export default groundOut;
