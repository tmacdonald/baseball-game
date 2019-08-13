import { Player } from "../models/Game";
import Bases, { createBases } from "../models/Bases";

export default function double(
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
  if (!!bases.second) {
    runs.push(bases.second);
  }

  return {
    bases: createBases(undefined, batter, bases.first),
    runs,
    out: false
  };
}

// export default function double(state: GameState): GameState {
//   const { runs, doubles, bases } = state;

//   return {
//     ...state,
//     bases: {
//       first: false,
//       second: true,
//       third: bases.first
//     },
//     doubles: doubles + 1,
//     runs: runs + (bases.third ? 1 : 0) + (bases.second ? 1 : 0),
//     balls: 0,
//     strikes: 0
//   };
// }
