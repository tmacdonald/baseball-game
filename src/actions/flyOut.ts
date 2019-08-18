import { isPossible, perform } from "./out";
import Action from "./Action";

const flyOut: Action = {
  name: "flyOut",
  isPossible,
  perform
};

export default flyOut;
