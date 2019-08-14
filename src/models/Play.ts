import Bases from "./Bases";
import { Player } from "./Game";
import Action from "../actions/Action";

type AtBat = {
  inning: number;
  top: boolean;
  beforeBases: Bases<Player | undefined>;
  bases: Bases<Player | undefined>;
  runs: Player[];
  player: Player | undefined;
  action: Action;
};

export default AtBat;
