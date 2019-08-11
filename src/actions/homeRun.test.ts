import homeRun from "./homeRun";
import { createState, bases } from "../utils";

it("should clear the runners", () => {
  const state = createState();

  const newState = homeRun(state);

  expect(newState.bases).toEqual(bases(false, false, false));
  expect(newState.runs).toEqual(state.runs + 1);
});

it("should increase homeRuns", () => {
  const state = createState();

  const newState = homeRun(state);

  expect(newState.homeRuns).toEqual(state.homeRuns + 1);
});

it("should score a runner from first", () => {
  const state = createState({
    bases: bases(true, false, false)
  });

  const newState = homeRun(state);

  expect(newState.bases).toEqual(bases(false, false, false));
  expect(newState.runs).toEqual(state.runs + 2);
});

it("should score runner from first and second", () => {
  const state = createState({
    bases: bases(true, true, false)
  });

  const newState = homeRun(state);

  expect(newState.bases).toEqual(bases(false, false, false));
  expect(newState.runs).toEqual(state.runs + 3);
});
it("should score runners first, second, and third", () => {
  const state = createState({
    bases: bases(true, true, true)
  });

  const newState = homeRun(state);

  expect(newState.bases).toEqual(bases(false, false, false));
  expect(newState.runs).toEqual(state.runs + 4);
});
