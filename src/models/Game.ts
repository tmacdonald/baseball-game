import Inning from "./Inning";

export default interface Game {
  awayInnings: Inning[];
  homeInnings: Inning[];
}
