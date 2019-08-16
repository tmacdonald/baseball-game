import triple from "./triple";
import { createBases } from "../models/Bases";

const batter = "A";
const runner1 = "B";
const runner2 = "C";
const runner3 = "D";

const { perform } = triple;

it("should put a runner on third base", () => {
  const { bases, runs } = perform(batter, createBases());

  expect(bases).toEqual(createBases(undefined, undefined, batter));
  expect(runs).toEqual([]);
});

it("should score a runner from first", () => {
  const { bases, runs } = perform(batter, createBases(runner1));

  expect(bases).toEqual(createBases(undefined, undefined, batter));
  expect(runs).toEqual([runner1]);
});

it("should score runner from first and second", () => {
  const { bases, runs } = perform(batter, createBases(runner2, runner1));

  expect(bases).toEqual(createBases(undefined, undefined, batter));
  expect(runs).toEqual([runner1, runner2]);
});
it("should score runners first, second, and third", () => {
  const { bases, runs } = perform(
    batter,
    createBases(runner3, runner2, runner1)
  );

  expect(bases).toEqual(createBases(undefined, undefined, batter));
  expect(runs).toEqual([runner1, runner2, runner3]);
});
