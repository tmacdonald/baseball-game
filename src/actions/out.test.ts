import out from "./out";
import { createState, bases } from "../utils";

it("should increase outs", () => {
  const state = createState();

  const newState = out(state);

  expect(newState.outs).toEqual(state.outs + 1);
});

it("should clear balls and strikes", () => {
  const state = createState({
    balls: 3,
    strikes: 2
  });

  const newState = out(state);

  expect(newState.balls).toEqual(0);
  expect(newState.strikes).toEqual(0);
});
