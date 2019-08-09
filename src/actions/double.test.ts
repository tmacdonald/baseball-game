import double from "./double";
import { createState, bases } from "../utils";

it("should put a runner on second base", () => {
  const state = createState();

  const newState = double(state);

  expect(newState.bases).toEqual(bases(false, true, false));
});

it("should increase hits", () => {
  const state = createState();

  const newState = double(state);

  expect(newState.hits).toEqual(state.hits + 1);
});

it("should move a runner from first to third", () => {
  const state = createState({
    bases: bases(true, false, false)
  });

  const newState = double(state);

  expect(newState.bases).toEqual(bases(false, true, true));
});

it("should score a runner from second", () => {
  const state = createState({
    bases: bases(false, true, false)
  });

  const newState = double(state);

  expect(newState.bases).toEqual(bases(false, true, false));
  expect(newState.runs).toEqual(state.runs + 1);
});
it("should score runners from second and third", () => {
  const state = createState({
    bases: bases(false, true, true)
  });

  const newState = double(state);

  expect(newState.bases).toEqual(bases(false, true, false));
  expect(newState.runs).toEqual(state.runs + 2);
});
