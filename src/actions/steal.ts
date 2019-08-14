import { Player } from "../models/Game";
import Bases, { createBases, isEmpty, isLoaded } from "../models/Bases";

export default function steal(
  batter: Player,
  bases: Bases<Player | undefined>
): {
  bases: Bases<Player | undefined>;
  runs: Player[];
} {
  return {
    bases: createBases(
      undefined,
      bases.first,
      !!bases.second && !bases.third ? bases.second : bases.third
    ),
    runs: []
  };
}

export function isStealPossible(bases: Bases<Player | undefined>): boolean {
  return !isEmpty(bases) && !isLoaded(bases);
}
