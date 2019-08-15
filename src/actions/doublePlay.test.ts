import doublePlay from "./doublePlay";
import Bases, { createBases, isLoaded } from "../models/Bases";

const batter = "A";
const runner1 = "B";
const runner2 = "C";
const runner3 = "D";

it("should force out play at home if the bases are loaded", () => {
  const { bases } = doublePlay(batter, createBases(runner3, runner2, runner1));
  expect(bases).toEqual(createBases(undefined, runner3, runner2));
});

it("should force out play at third if there are runners on first and second", () => {
  const { bases } = doublePlay(batter, createBases(runner2, runner1));
  expect(bases).toEqual(createBases(undefined, runner2));
});

it("should force out play at if there is a runner on first", () => {
  const { bases } = doublePlay(batter, createBases(runner1));
  expect(bases).toEqual(createBases());
});

it("should leave runner on third if there are runners at first and third", () => {
  const { bases } = doublePlay(
    batter,
    createBases(runner2, undefined, runner1)
  );
  expect(bases).toEqual(createBases(undefined, undefined, runner1));
});
