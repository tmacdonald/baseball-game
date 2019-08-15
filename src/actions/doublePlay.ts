import { Player } from "../models/Game";
import Bases, { createBases, isLoaded } from "../models/Bases";

export default function doublePlay(
  batter: Player,
  bases: Bases<Player | undefined>
): {
  bases: Bases<Player | undefined>;
  runs: Player[];
} {
  let nextBases = bases;

  if (isLoaded(bases)) {
    nextBases = createBases(undefined, bases.first, bases.second);
  } else if (!!bases.first && !!bases.second) {
    nextBases = createBases(undefined, bases.first);
  } else if (!!bases.first) {
    nextBases = createBases(undefined, undefined, bases.third);
  }

  return { bases: nextBases, runs: [] };
}

export function isDoublePlayPossible(
  bases: Bases<Player | undefined>
): boolean {
  // is a force available
  return !!bases.first;
}
