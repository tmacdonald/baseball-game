import steal from "./steal";
import { createBases } from "../models/Bases";

const batter = "A";
const runner1 = "B";
const runner2 = "C";
const runner3 = "D";

it("should advance a runner from first to second", () => {
  const { bases, runs } = steal(batter, createBases(runner1));

  expect(bases).toEqual(createBases(undefined, runner1));
  expect(runs).toEqual([]);
});

it("should advance a runner from second to third", () => {
  const { bases, runs } = steal(batter, createBases(undefined, runner1));

  expect(bases).toEqual(createBases(undefined, undefined, runner1));
  expect(runs).toEqual([]);
});

it("should advance runner from first and leave runner at third", () => {
  const { bases, runs } = steal(
    batter,
    createBases(runner2, undefined, runner1)
  );

  expect(bases).toEqual(createBases(undefined, runner2, runner1));
  expect(runs).toEqual([]);
});

it("should score runner from third if runner is on first", () => {});

it("should not score a runner from third", () => {
  const { bases, runs } = steal(
    batter,
    createBases(undefined, undefined, runner1)
  );

  expect(bases).toEqual(createBases(undefined, undefined, runner1));
  expect(runs).toEqual([]);
});
