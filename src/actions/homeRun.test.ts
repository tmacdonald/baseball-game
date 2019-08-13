import { createBases } from "../models/Bases";
import homeRun from "./homeRun";

const batter = "A";
const runner1 = "B";
const runner2 = "C";
const runner3 = "D";

it("should handle a solo home run", () => {
  const { bases, runs, out } = homeRun(batter, createBases());

  expect(bases).toEqual(createBases());
  expect(runs).toEqual([batter]);
  expect(out).toBe(false);
});

it("should handle a two run home run", () => {
  const { bases, runs, out } = homeRun(batter, createBases(runner1));

  expect(bases).toEqual(createBases());
  expect(runs).toEqual([runner1, batter]);
  expect(out).toBe(false);
});

it("should handle a three run home run", () => {
  const { bases, runs, out } = homeRun(batter, createBases(runner1, runner2));

  expect(bases).toEqual(createBases());
  expect(runs).toEqual([runner2, runner1, batter]);
  expect(out).toBe(false);
});

it("should handle a grand slam", () => {
  const { bases, runs, out } = homeRun(
    batter,
    createBases(runner1, runner2, runner3)
  );

  expect(bases).toEqual(createBases());
  expect(runs).toEqual([runner3, runner2, runner1, batter]);
  expect(out).toBe(false);
});

// it("should increase homeRuns", () => {
//   const state = createState();

//   const newState = homeRun(state);

//   expect(newState.homeRuns).toEqual(state.homeRuns + 1);
// });

// it("should score a runner from first", () => {
//   const state = createState({
//     bases: bases(true, false, false)
//   });

//   const newState = homeRun(state);

//   expect(newState.bases).toEqual(bases(false, false, false));
//   expect(newState.runs).toEqual(state.runs + 2);
// });

// it("should score runner from first and second", () => {
//   const state = createState({
//     bases: bases(true, true, false)
//   });

//   const newState = homeRun(state);

//   expect(newState.bases).toEqual(bases(false, false, false));
//   expect(newState.runs).toEqual(state.runs + 3);
// });
// it("should score runners first, second, and third", () => {
//   const state = createState({
//     bases: bases(true, true, true)
//   });

//   const newState = homeRun(state);

//   expect(newState.bases).toEqual(bases(false, false, false));
//   expect(newState.runs).toEqual(state.runs + 4);
// });
