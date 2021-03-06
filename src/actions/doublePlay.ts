import { PlayerID } from "../models/Player";
import Action from "./Action";
import Bases, { createBases, isLoaded } from "../models/Bases";
import { ActionOutcome } from "../models/Play";

const doublePlay: Action = {
  name: "doublePlay",

  isPossible: function isDoublePlayPossible(
    bases: Bases,
    numberOfOuts: number
  ): boolean {
    // is a force available
    return !!bases.first && numberOfOuts < 2;
  },

  perform: (batter: PlayerID, bases: Bases): ActionOutcome => {
    let nextBases = bases;

    if (isLoaded(bases)) {
      nextBases = createBases(undefined, bases.first, bases.second);
    } else if (!!bases.first && !!bases.second) {
      nextBases = createBases(undefined, bases.first);
    } else if (!!bases.first) {
      nextBases = createBases(undefined, undefined, bases.third);
    }

    return {
      batter,
      bases: nextBases,
      runs: [],
      isHit: false,
      isAtBat: false,
      numberOfOuts: 2,
      numberOfErrors: 0,
      causesBatterChange: true
    };
  }
};

export default doublePlay;
