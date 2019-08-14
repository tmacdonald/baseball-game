import { Player } from "../models/Game";
import Bases, { createBases } from "../models/Bases";

export default function walk(
  batter: Player,
  bases: Bases<Player | undefined>
): { bases: Bases<Player | undefined>; runs: Player[]; out: boolean } {
  return {
    bases: createBases(
      batter,
      !!bases.first ? bases.first : bases.second,
      !!bases.first && bases.second ? bases.second : bases.third
    ),
    runs: !!bases.first && !!bases.second && !!bases.third ? [bases.third] : [],
    out: false
  };
}
