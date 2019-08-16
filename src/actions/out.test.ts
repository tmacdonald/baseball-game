import out from "./out";
import { createBases } from "../models/Bases";

const batter = "A";
const runner1 = "B";
const runner2 = "C";
const runner3 = "D";

const { perform } = out;

const startingBases = createBases(runner3, runner2, runner1);

it("should not moved base runners", () => {
  const { bases } = perform(batter, startingBases);
  expect(bases).toEqual(startingBases);
});

it("should not score any runners", () => {
  const { runs } = perform(batter, startingBases);
  expect(runs).toEqual([]);
});
