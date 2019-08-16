import { Player } from "../models/Game";
import Bases from "../models/Bases";
import Action from "./Action";
import { ActionOutcome } from "../models/Play";

const out: Action = {
  isPossible: (bases: Bases<Player | undefined>): boolean => true,

  perform: (
    batter: Player,
    bases: Bases<Player | undefined>
  ): ActionOutcome => ({
    batter,
    bases,
    runs: [],
    isHit: false,
    isAtBat: true,
    numberOfErrors: 0,
    numberOfOuts: 1,
    causesBatterChange: true
  })
};

export default out;
