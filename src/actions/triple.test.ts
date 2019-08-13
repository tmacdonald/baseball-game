import triple from "./triple";
import { createBases } from "../models/Bases";

const batter = "A";
const runner1 = "B";
const runner2 = "C";
const runner3 = "D";

it("should put a runner on third base", () => {
  const { bases, runs, out } = triple(batter, createBases());

  expect(bases).toEqual(createBases(undefined, undefined, batter));
  expect(runs).toEqual([]);
  expect(out).toBe(false);
});

it("should score a runner from first", () => {
  const { bases, runs, out } = triple(batter, createBases(runner1));

  expect(bases).toEqual(createBases(undefined, undefined, batter));
  expect(runs).toEqual([runner1]);
  expect(out).toBe(false);
});

it("should score runner from first and second", () => {
  const { bases, runs, out } = triple(batter, createBases(runner2, runner1));

  expect(bases).toEqual(createBases(undefined, undefined, batter));
  expect(runs).toEqual([runner1, runner2]);
  expect(out).toBe(false);
});
it("should score runners first, second, and third", () => {
  const { bases, runs, out } = triple(
    batter,
    createBases(runner3, runner2, runner1)
  );

  expect(bases).toEqual(createBases(undefined, undefined, batter));
  expect(runs).toEqual([runner1, runner2, runner3]);
  expect(out).toBe(false);
});
