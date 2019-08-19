import { PlayerID } from "../models/Player";
import Bases from "../models/Bases";
import { ActionOutcome } from "../models/Play";

const isPossible = (bases: Bases): boolean => true;

const perform = (batter: PlayerID, bases: Bases): ActionOutcome => ({
  batter,
  bases,
  runs: [],
  isHit: false,
  isAtBat: true,
  numberOfErrors: 0,
  numberOfOuts: 1,
  causesBatterChange: true
});

export { isPossible, perform };
