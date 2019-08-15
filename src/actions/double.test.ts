import double from "./double";
import { Player } from "../models/Game";
import Bases, { createBases } from "../models/Bases";

const batter = "A";
const runner1 = "B";
const runner2 = "C";
const runner3 = "D";

const { updateBases, updateRuns } = double;

it("should put a runner on second base", () => {
  const beforeBases: Bases<Player | undefined> = createBases();
  const bases = updateBases(batter, beforeBases);
  const runs = updateRuns(batter, beforeBases);

  expect(bases).toEqual(createBases(undefined, batter));
  expect(runs).toEqual([]);
});

it("should advance a runner from first to third", () => {
  const beforeBases: Bases<Player | undefined> = createBases(runner1);
  const bases = updateBases(batter, beforeBases);
  const runs = updateRuns(batter, beforeBases);

  expect(bases).toEqual(createBases(undefined, batter, runner1));
  expect(runs).toEqual([]);
});

it("should score a runner from second", () => {
  const beforeBases: Bases<Player | undefined> = createBases(
    undefined,
    runner1
  );
  const bases = updateBases(batter, beforeBases);
  const runs = updateRuns(batter, beforeBases);

  expect(bases).toEqual(createBases(undefined, batter));
  expect(runs).toEqual([runner1]);
});
it("should score runners from second and third", () => {
  const beforeBases: Bases<Player | undefined> = createBases(
    runner3,
    runner2,
    runner1
  );
  const bases = updateBases(batter, beforeBases);
  const runs = updateRuns(batter, beforeBases);

  expect(bases).toEqual(createBases(undefined, batter, runner3));
  expect(runs).toEqual([runner1, runner2]);
});
