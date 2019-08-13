import Bases from "./Bases";
import { Player } from "./Game";
import Action from "../actions/Action";

type AtBat = {
  inning: number;
  beforeBases: Bases<Player | undefined>;
  bases: Bases<Player | undefined>;
  runs: Player[];
  batter: Player | undefined;
  action: Action;
  out: boolean;
  error: boolean;
};

export default AtBat;
