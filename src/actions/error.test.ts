import error from "./error";
import { createState, bases } from "../utils";

it("should increase the number of errors", () => {
  const state = createState();

  const newState = error(state);

  expect(newState.errors).toEqual(state.errors + 1);
});

it("should advance runner to first", () => {
  const state = createState();

  const newState = error(state);

  expect(newState.bases).toEqual(bases(true, false, false));
});

it("should advance runner from first to second", () => {
  const state = createState({
    bases: bases(true, false, false)
  });

  const newState = error(state);

  expect(newState.bases).toEqual(bases(true, true, false));
});

it("should advance runner from second to third", () => {
  const state = createState({
    bases: bases(false, true, false)
  });

  const newState = error(state);

  expect(newState.bases).toEqual(bases(true, false, true));
});

it("should score runner from third", () => {
  const state = createState({
    bases: bases(false, false, true)
  });

  const newState = error(state);

  expect(newState.bases).toEqual(bases(true, false, false));
  expect(newState.runs).toEqual(state.runs + 1);
});
