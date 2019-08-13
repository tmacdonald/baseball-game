import { Player } from "../models/Game";
import Bases, { createBases } from "../models/Bases";

export default function homeRun(
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
  if (!!bases.first) {
    runs.push(bases.first);
  }
  runs.push(batter);

  return {
    bases: createBases(),
    runs,
    out: false
  };
}

// export default function homeRun(state: GameState): GameState {
//   const { runs, homeRuns, bases } = state;

//   return {
//     ...state,
//     bases: {
//       first: false,
//       second: false,
//       third: false
//     },
//     homeRuns: homeRuns + 1,
//     runs:
//       runs +
//       1 +
//       (bases.third ? 1 : 0) +
//       (bases.second ? 1 : 0) +
//       (bases.first ? 1 : 0),
//     balls: 0,
//     strikes: 0
//   };
// }
