import { Player } from "../models/Game";
import Bases, { createBases } from "../models/Bases";

export default function error(
  batter: Player,
  bases: Bases<Player | undefined>
): {
  bases: Bases<Player | undefined>;
  runs: Player[];
} {
  return {
    bases: createBases(batter, bases.first, bases.second),
    runs: !!bases.third ? [bases.third] : []
  };
}
