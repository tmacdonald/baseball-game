import { createBases } from "../models/Bases";
import homeRun from "./homeRun";

const batter = "A";
const runner1 = "B";
const runner2 = "C";
const runner3 = "D";

it("should handle a solo home run", () => {
  const { bases, runs } = homeRun(batter, createBases());

  expect(bases).toEqual(createBases());
  expect(runs).toEqual([batter]);
});

it("should handle a two run home run", () => {
  const { bases, runs } = homeRun(batter, createBases(runner1));

  expect(bases).toEqual(createBases());
  expect(runs).toEqual([runner1, batter]);
});

it("should handle a three run home run", () => {
  const { bases, runs } = homeRun(batter, createBases(runner1, runner2));

  expect(bases).toEqual(createBases());
  expect(runs).toEqual([runner2, runner1, batter]);
});

it("should handle a grand slam", () => {
  const { bases, runs } = homeRun(
    batter,
    createBases(runner1, runner2, runner3)
  );

  expect(bases).toEqual(createBases());
  expect(runs).toEqual([runner3, runner2, runner1, batter]);
});
