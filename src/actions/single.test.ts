import single from "./single";
import { createState, bases } from "../utils";

it("should put a runner on first base", () => {
  const state = createState();

  const newState = single(state);

  expect(newState.bases).toEqual(bases(true, false, false));
});

it("should increase hits", () => {
  const state = createState();

  const newState = single(state);

  expect(newState.hits).toEqual(state.hits + 1);
});

it("should move a runner from first to second", () => {
  const state = createState({
    bases: bases(true, false, false)
  });

  const newState = single(state);

  expect(newState.bases).toEqual(bases(true, true, false));
});

it("should move a runner from second to third", () => {
  const state = createState({
    bases: bases(false, true, false)
  });

  const newState = single(state);

  expect(newState.bases).toEqual(bases(true, false, true));
});
it("should move a runner from third to score", () => {
  const state = createState({
    bases: bases(false, false, true)
  });

  const newState = single(state);

  expect(newState.bases).toEqual(bases(true, false, false));
  expect(newState.runs).toEqual(state.runs + 1);
});
