import { isPossible, perform } from "./out";
import Action from "./Action";

const popOut: Action = {
  name: "popOut",
  isPossible,
  perform
};

export default popOut;
