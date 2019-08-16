import double from "./double";
import { Player } from "../models/Game";
import Bases, { createBases } from "../models/Bases";

const batter = "A";
const runner1 = "B";
const runner2 = "C";
const runner3 = "D";

const { perform } = double;

it("should put a runner on second base", () => {
  const { bases, runs } = perform(batter, createBases());

  expect(bases).toEqual(createBases(undefined, batter));
  expect(runs).toEqual([]);
});

it("should advance a runner from first to third", () => {
  const { bases, runs } = perform(batter, createBases(runner1));

  expect(bases).toEqual(createBases(undefined, batter, runner1));
  expect(runs).toEqual([]);
});

it("should score a runner from second", () => {
  const { bases, runs } = perform(batter, createBases(undefined, runner1));

  expect(bases).toEqual(createBases(undefined, batter));
  expect(runs).toEqual([runner1]);
});
it("should score runners from second and third", () => {
  const { bases, runs } = perform(
    batter,
    createBases(runner3, runner2, runner1)
  );

  expect(bases).toEqual(createBases(undefined, batter, runner3));
  expect(runs).toEqual([runner1, runner2]);
});
