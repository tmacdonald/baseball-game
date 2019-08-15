import doublePlay from "./doublePlay";
import Bases, { createBases, isLoaded } from "../models/Bases";

const batter = "A";
const runner1 = "B";
const runner2 = "C";
const runner3 = "D";

describe("isPossible", () => {
  it("should be possible if the bases are loaded", () => {
    const isPossible = doublePlay.isPossible(
      createBases(runner3, runner2, runner1)
    );

    expect(isPossible).toBe(true);
  });

  it("should be possible if there are runners at first and second", () => {
    const isPossible = doublePlay.isPossible(createBases(runner2, runner1));

    expect(isPossible).toBe(true);
  });

  it("should be possible if there is a runner at first", () => {
    const isPossible = doublePlay.isPossible(createBases(runner1));

    expect(isPossible).toBe(true);
  });

  it("should not be possible if there is a runner at third", () => {
    const isPossible = doublePlay.isPossible(
      createBases(undefined, undefined, runner1)
    );

    expect(isPossible).toBe(false);
  });

  it("should not be possible if there is a runner at second", () => {
    const isPossible = doublePlay.isPossible(createBases(undefined, runner1));

    expect(isPossible).toBe(false);
  });

  it("should not be possible if there are runners at second and third", () => {
    const isPossible = doublePlay.isPossible(
      createBases(undefined, runner2, runner1)
    );

    expect(isPossible).toBe(false);
  });
});

describe("perform", () => {
  it("should force out play at home if the bases are loaded", () => {
    const { bases } = doublePlay.perform(
      batter,
      createBases(runner3, runner2, runner1)
    );
    expect(bases).toEqual(createBases(undefined, runner3, runner2));
  });

  it("should force out play at third if there are runners on first and second", () => {
    const { bases } = doublePlay.perform(batter, createBases(runner2, runner1));
    expect(bases).toEqual(createBases(undefined, runner2));
  });

  it("should force out play at if there is a runner on first", () => {
    const { bases } = doublePlay.perform(batter, createBases(runner1));
    expect(bases).toEqual(createBases());
  });

  it("should leave runner on third if there are runners at first and third", () => {
    const { bases } = doublePlay.perform(
      batter,
      createBases(runner2, undefined, runner1)
    );
    expect(bases).toEqual(createBases(undefined, undefined, runner1));
  });
});
