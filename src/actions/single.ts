import { Player } from "../models/Game";
import Bases, { createBases } from "../models/Bases";

export default function single(
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

  return {
    bases: createBases(batter, bases.first, bases.second),
    runs
  };
}
