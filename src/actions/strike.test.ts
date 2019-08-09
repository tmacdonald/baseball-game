import strike from "./strike";
import { createState, bases } from "../utils";

it("should increase strike count", () => {
  const state = createState({
    strikes: 0
  });

  const newState = strike(state);

  expect(newState.strikes).toEqual(state.strikes + 1);
});

it("should increase outs on strike out", () => {
  const state = createState({
    strikes: 2,
    outs: 0
  });

  const newState = strike(state);

  expect(newState.outs).toEqual(state.outs + 1);
});

it("should clear balls and strikes on strike out", () => {
  const state = createState({
    strikes: 2,
    outs: 0
  });

  const newState = strike(state);

  expect(newState.balls).toEqual(0);
  expect(newState.strikes).toEqual(0);
});
