import AtBatState from "./models/AtBatState";
import Bases from "./models/Bases";
import { single, double, triple, homeRun } from "./stateEngine";

function createState(initialState = {}) {
  const defaultState: AtBatState = {
    bases: { first: false, second: false, third: false },
    runs: 0,
    hits: 0,
    errors: 0,
    outs: 0,
    balls: 0,
    strikes: 0
  };
  return { ...defaultState, ...initialState };
}

// Typescript problems
// expect.extend({
//   toHaveBases(x, first, second, third) {
//     return {
//       pass: x.first === first && x.second === second && x.third === third,
//       message: () => "does not match"
//     };
//   }
// });

function bases(first: boolean, second: boolean, third: boolean): Bases {
  return { first, second, third };
}

describe("single", () => {
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
});

describe("double", () => {
  it("should put a runner on second base", () => {
    const state = createState();

    const newState = double(state);

    expect(newState.bases).toEqual(bases(false, true, false));
  });

  it("should increase hits", () => {
    const state = createState();

    const newState = triple(state);

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
});

describe("triple", () => {
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
});

describe("home run", () => {
  it("should clear the runners", () => {
    const state = createState();

    const newState = homeRun(state);

    expect(newState.bases).toEqual(bases(false, false, false));
    expect(newState.runs).toEqual(state.runs + 1);
  });

  it("should increase hits", () => {
    const state = createState();

    const newState = homeRun(state);

    expect(newState.hits).toEqual(state.hits + 1);
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
});
