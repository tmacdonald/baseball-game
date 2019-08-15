import { Player } from "../models/Game";
import Action from "./Action";
import Bases, { createBases, isLoaded } from "../models/Bases";

const doublePlay: Action = {
  isHit: () => false,
  isAtBat: () => true,
  numberOfOuts: () => 2,
  causesBatterChange: () => true,

  isPossible: function isDoublePlayPossible(
    bases: Bases<Player | undefined>
  ): boolean {
    // is a force available
    return !!bases.first;
  },

  updateRuns: () => [],

  updateBases: function(
    batter: Player,
    bases: Bases<Player | undefined>
  ): Bases<Player | undefined> {
    let nextBases = bases;

    if (isLoaded(bases)) {
      nextBases = createBases(undefined, bases.first, bases.second);
    } else if (!!bases.first && !!bases.second) {
      nextBases = createBases(undefined, bases.first);
    } else if (!!bases.first) {
      nextBases = createBases(undefined, undefined, bases.third);
    }

    return nextBases;
  }
};

export default doublePlay;
