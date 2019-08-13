import single from "./single";
import { createBases } from "../models/Bases";

const batter = "A";
const runner1 = "B";
const runner2 = "C";
const runner3 = "D";

it("should put a runner on first base", () => {
  const { bases, runs, out } = single(batter, createBases());

  expect(bases).toEqual(createBases(batter));
  expect(runs).toEqual([]);
  expect(out).toBe(false);
});

it("should advance a runner from first to second", () => {
  const { bases, runs, out } = single(batter, createBases(runner1));

  expect(bases).toEqual(createBases(batter, runner1));
  expect(runs).toEqual([]);
  expect(out).toBe(false);
});

it("should advance a runner from second to third", () => {
  const { bases, runs, out } = single(batter, createBases(undefined, runner1));

  expect(bases).toEqual(createBases(batter, undefined, runner1));
  expect(runs).toEqual([]);
  expect(out).toBe(false);
});
it("should score a runner from third", () => {
  const { bases, runs, out } = single(
    batter,
    createBases(undefined, undefined, runner1)
  );

  expect(bases).toEqual(createBases(batter));
  expect(runs).toEqual([runner1]);
  expect(out).toBe(false);
});
