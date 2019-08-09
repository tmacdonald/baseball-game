import triple from "./triple";
import { createState, bases } from "../utils";

it("should put a runner on third base", () => {
  const state = createState();

  const newState = triple(state);

  expect(newState.bases).toEqual(bases(false, false, true));
});

it("should increase hits", () => {
  const state = createState();

  const newState = triple(state);

  expect(newState.hits).toEqual(state.hits + 1);
});

it("should score a runner from first", () => {
  const state = createState({
    bases: bases(true, false, false)
  });

  const newState = triple(state);

  expect(newState.bases).toEqual(bases(false, false, true));
  expect(newState.runs).toEqual(state.runs + 1);
});

it("should score runner from first and second", () => {
  const state = createState({
    bases: bases(true, true, false)
  });

  const newState = triple(state);

  expect(newState.bases).toEqual(bases(false, false, true));
  expect(newState.runs).toEqual(state.runs + 2);
});
it("should score runners first, second, and third", () => {
  const state = createState({
    bases: bases(true, true, true)
  });

  const newState = triple(state);

  expect(newState.bases).toEqual(bases(false, false, true));
  expect(newState.runs).toEqual(state.runs + 3);
});
