import { Player } from "../models/Game";
import Bases, { createBases, isLoaded } from "../models/Bases";

export default function out(
  batter: Player,
  bases: Bases
): {
  bases: Bases;
  runs: Player[];
} {
  let nextBases = bases;

  if (isLoaded(bases)) {
    nextBases = createBases(batter, bases.first, bases.second);
  } else if (!!bases.first && !!bases.second && !bases.third) {
    nextBases = createBases(batter, bases.first);
  } else if (!!bases.first && !bases.second && !bases.third) {
    nextBases = createBases(batter);
  } else if (!!bases.first && !bases.second && !!bases.third) {
    nextBases = createBases(batter, undefined, bases.third);
  }

  return { bases: nextBases, runs: [] };
}
