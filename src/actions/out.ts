import { Player } from "../models/Game";
import Bases, { createBases } from "../models/Bases";

export default function out(
  batter: Player,
  bases: Bases<Player | undefined>
): {
  bases: Bases<Player | undefined>;
  runs: Player[];
  out: boolean;
} {
  return {
    bases,
    runs: [],
    out: true
  };
}
