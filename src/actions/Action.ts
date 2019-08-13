import { Player } from "../models/Game";
import Bases from "../models/Bases";

export default interface Action {
  (batter: Player, bases: Bases<Player | undefined): {
    bases: Bases<Player | undefined>;
    runs: Player[];
    out: boolean;
  };
}
