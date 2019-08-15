import groundOut from "./groundOut";
import { createBases } from "../models/Bases";

const batter = "A";
const runner1 = "B";
const runner2 = "C";
const runner3 = "D";

it("should remove the player on third if the bases are loaded", () => {
  const { bases } = groundOut(batter, createBases(runner3, runner2, runner1));
  expect(bases).toEqual(createBases(batter, runner3, runner2));
});

it("should remove the player on second if there are runners on first and second", () => {
  const { bases } = groundOut(batter, createBases(runner2, runner1));
  expect(bases).toEqual(createBases(batter, runner2));
});

it("should remove the player on first if there is a player on first", () => {
  const { bases } = groundOut(batter, createBases(runner1));
  expect(bases).toEqual(createBases(batter));
});

it("should remove the player on first and leave the player on third", () => {
  const { bases } = groundOut(batter, createBases(runner2, undefined, runner1));
  expect(bases).toEqual(createBases(batter, undefined, runner1));
});

it("should leave the bases empty if there is no runner on first", () => {
  const { bases } = groundOut(batter, createBases(undefined, runner2, runner1));
  expect(bases).toEqual(createBases(undefined, runner2, runner1));
});

it("should leave the bases empty if the bases are empty", () => {
  const { bases } = groundOut(batter, createBases());
  expect(bases).toEqual(createBases());
});
