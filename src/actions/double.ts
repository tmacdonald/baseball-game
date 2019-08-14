import { Player } from "../models/Game";
import Bases, { createBases } from "../models/Bases";

export default function double(
  batter: Player,
  bases: Bases<Player | undefined>
): {
  bases: Bases<Player | undefined>;
  runs: Player[];
} {
  const runs = [];
  if (!!bases.third) {
    runs.push(bases.third);
  }
  if (!!bases.second) {
    runs.push(bases.second);
  }

  return {
    bases: createBases(undefined, batter, bases.first),
    runs
  };
}
