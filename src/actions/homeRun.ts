import { Player } from "../models/Game";
import Bases, { createBases } from "../models/Bases";

export default function homeRun(
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
  if (!!bases.first) {
    runs.push(bases.first);
  }
  runs.push(batter);

  return {
    bases: createBases(),
    runs
  };
}
