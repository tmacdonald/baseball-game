import { createBases } from "../models/Bases";
import walk from "./walk";

const { perform } = walk;

it("should advance runner from first", () => {
  const { bases } = perform("A", createBases("B"));

  expect(bases).toEqual(createBases("A", "B"));
});

it("should not advance runner on second if no runner is on first", () => {
  const { bases } = perform("A", createBases(undefined, "B"));

  expect(bases).toEqual(createBases("A", "B"));
});

it("should not advance runner on third if no runner is on first", () => {
  const { bases } = perform("A", createBases(undefined, undefined, "B"));

  expect(bases).toEqual(createBases("A", undefined, "B"));
});

it("should advance runners on first and second", () => {
  const { bases } = perform("A", createBases("B", "C"));

  expect(bases).toEqual(createBases("A", "B", "C"));
});

it("should not advance runners on second and third if no runner is on first", () => {
  const { bases } = perform("A", createBases(undefined, "B", "C"));

  expect(bases).toEqual(createBases("A", "B", "C"));
});

it("should score a runner when the bases are loaded", () => {
  const { bases, runs } = perform("A", createBases("B", "C", "D"));

  expect(bases).toEqual(createBases("A", "B", "C"));
  expect(runs).toEqual(["D"]);
});
