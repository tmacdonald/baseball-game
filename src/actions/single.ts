import { Player } from "../models/Game";
import Bases, { createBases } from "../models/Bases";

export default function single(
  batter: Player,
  bases: Bases<Player | undefined>
): {
  bases: Bases<Player | undefined>;
  runs: Player[];
  out: boolean;
} {
  const runs = [];
  if (!!bases.third) {
    runs.push(bases.third);
  }

  return {
    bases: createBases(batter, bases.first, bases.second),
    runs,
    out: false
  };
}

// export default function single(state: GameState): GameState {
//   const { runs, singles, bases } = state;

//   return {
//     ...state,
//     bases: {
//       first: true,
//       second: bases.first,
//       third: bases.second
//     },
//     singles: singles + 1,
//     runs: runs + (bases.third ? 1 : 0),
//     balls: 0,
//     strikes: 0
//   };
// }
