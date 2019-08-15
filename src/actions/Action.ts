import { Player } from "../models/Game";
import Bases from "../models/Bases";
import Count from "../models/Count";

export default interface Action {
  isHit(): boolean;
  isAtBat(): boolean;
  numberOfOuts(): number;
  isPossible(bases: Bases<Player | undefined>): boolean;
  causesBatterChange(): boolean;

  updateBases: (
    batter: Player,
    bases: Bases<Player | undefined>
  ) => Bases<Player | undefined>;
  updateRuns: (batter: Player, bases: Bases<Player | undefined>) => Player[];
  // updateCount: (beforeCount: Count) => Count;
}
