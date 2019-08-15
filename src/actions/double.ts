import { Player } from "../models/Game";
import Action from "./Action";
import Bases, { createBases } from "../models/Bases";
import Count from "../models/Count";

const double: Action = {
  isHit: () => true,
  isAtBat: () => true,
  numberOfOuts: () => 0,
  isPossible: (bases: Bases<Player | undefined>) => true,
  causesBatterChange: () => true,

  updateBases: (
    batter: Player,
    bases: Bases<Player | undefined>
  ): Bases<Player | undefined> => {
    return createBases(undefined, batter, bases.first);
  },

  updateRuns: (batter: Player, bases: Bases<Player | undefined>): Player[] => {
    const runs: Player[] = [];
    if (!!bases.third) {
      runs.push(bases.third);
    }
    if (!!bases.second) {
      runs.push(bases.second);
    }
    return runs;
  }
};

export default double;
