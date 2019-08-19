import { PlayerID } from "../models/Player";
import Bases, { createBases, isEmpty, isLoaded } from "../models/Bases";

export default function steal(
  batter: PlayerID,
  bases: Bases
): {
  bases: Bases;
  runs: PlayerID[];
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

export function isStealPossible(bases: Bases): boolean {
  return !isEmpty(bases) && !isLoaded(bases);
}
