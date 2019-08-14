import { createBases } from "../models/Bases";
import error from "./error";

const batter = "A";
const runner1 = "B";
const runner2 = "C";
const runner3 = "D";

it("should put a runner on first base", () => {
  const { bases, runs } = error(batter, createBases());

  expect(bases).toEqual(createBases(batter));
  expect(runs).toEqual([]);
});

it("should advance a runner from first to second", () => {
  const { bases, runs } = error(batter, createBases(runner1));

  expect(bases).toEqual(createBases(batter, runner1));
  expect(runs).toEqual([]);
});

it("should advance a runner from second to third", () => {
  const { bases, runs } = error(batter, createBases(undefined, runner1));

  expect(bases).toEqual(createBases(batter, undefined, runner1));
  expect(runs).toEqual([]);
});
it("should score a runner from third", () => {
  const { bases, runs } = error(
    batter,
    createBases(undefined, undefined, runner1)
  );

  expect(bases).toEqual(createBases(batter));
  expect(runs).toEqual([runner1]);
});
