import out from "./out";
import { Player } from "../models/Game";
import Bases from "../models/Bases";

export default function popOut(
  batter: Player,
  bases: Bases<Player | undefined>
): {
  bases: Bases<Player | undefined>;
  runs: Player[];
} {
  return out(batter, bases);
}
