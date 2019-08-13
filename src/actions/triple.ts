import { Player } from "../models/Game";
import Bases, { createBases } from "../models/Bases";

export default function triple(
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

  return {
    bases: createBases(undefined, undefined, batter),
    runs,
    out: false
  };
}

// export default function triple(state: GameState): GameState {
//   const { runs, triples, bases } = state;

//   return {
//     ...state,
//     bases: {
//       first: false,
//       second: false,
//       third: true
//     },
//     triples: triples + 1,
//     runs:
//       runs +
//       (bases.third ? 1 : 0) +
//       (bases.second ? 1 : 0) +
//       (bases.first ? 1 : 0),
//     balls: 0,
//     strikes: 0
//   };
// }
