import walk from "./walk";
import { createState, bases } from "../utils";

it("should advance runner from first", () => {
  const state = createState({
    bases: bases(true, false, false)
  });

  const newState = walk(state);

  expect(newState.bases).toEqual(bases(true, true, false));
});

it("should not advance runners on second and third if no runner is no first", () => {
  const state = createState({
    bases: bases(false, true, true)
  });

  const newState = walk(state);

  expect(newState.bases).toEqual(bases(true, true, true));
  expect(newState.runs).toEqual(state.runs);
});

it("should reset balls and strikes", () => {
  const state = createState({
    balls: 3,
    strikes: 2
  });

  const newState = walk(state);

  expect(newState.balls).toEqual(0);
  expect(newState.strikes).toEqual(0);
});

it("should advance runners on first and second", () => {
  const state = createState({
    bases: bases(true, true, false)
  });

  const newState = walk(state);

  expect(newState.bases).toEqual(bases(true, true, true));
});

it("should score a runner when the bases are loaded", () => {
  const state = createState({
    bases: bases(true, true, true)
  });

  const newState = walk(state);

  expect(newState.bases).toEqual(bases(true, true, true));
  expect(newState.runs).toEqual(state.runs + 1);
});
