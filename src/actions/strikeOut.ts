import { isPossible, perform } from "./out";
import Action from "./Action";

const strikeOut: Action = {
  name: "strikeOut",
  isPossible,
  perform
};

export default strikeOut;
