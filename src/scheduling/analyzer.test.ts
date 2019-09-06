import analyzer, { createBlocks, TeamScheduleBlock } from "./analyzer";
import Game from "../models/Game";
import { createGame } from "../gameEngine";
import _ from "lodash";

describe("createBlocks", () => {
  it("should return an empty result if the input array is empty", () => {
    const input: any[] = [];
    const output = createBlocks(input);

    expect(output).toEqual([]);
  });

  it("should handle the case when all elements are equal", () => {
    const input = [1, 1, 1];
    const output = createBlocks(input);

    expect(output).toEqual([[1, 1, 1]]);
  });

  it("should handle the case when there are two types of elements", () => {
    const input = [1, 1, 1, 2, 2, 2];
    const output = createBlocks(input);

    expect(output).toEqual([[1, 1, 1], [2, 2, 2]]);
  });

  it("should handle intermixed elements", () => {
    const input = [1, 1, 2, 2, 1, 1, 2, 2];
    const output = createBlocks(input);

    expect(output).toEqual([[1, 1], [2, 2], [1, 1], [2, 2]]);
  });

  it("should handle 0 as an element", () => {
    const input = [0, 0, 1, 1];
    const output = createBlocks(input);

    expect(output).toEqual([[0, 0], [1, 1]]);
  });

  it("should handle false as an element", () => {
    const input = [false, false, true, true, false, false];
    const output = createBlocks(input);

    expect(output).toEqual([[false, false], [true, true], [false, false]]);
  });
});

const A = { name: "A", roster: [] };
const B = { name: "B", roster: [] };

it("should handle no games", () => {
  const games: Game[] = [];
  const teams = [A];

  const result = analyzer(teams, games);

  expect(result).toEqual([{ team: A, blocks: [] }]);
});

it("should return [1] for a single home game", () => {
  const games = [createGame(B, A, new Date())];
  const teams = [A];

  const result = analyzer(teams, games);

  expect(result).toEqual([{ team: A, blocks: [1] }]);
});

it("should return [1] for a single away game", () => {
  const games = [createGame(A, B, new Date())];
  const teams = [A];

  const result = analyzer(teams, games);

  expect(result).toEqual([{ team: A, blocks: [1] }]);
});

it("should return [n] for n home games", () => {
  const games = _.range(3).map(() => createGame(B, A, new Date()));

  const result = analyzer([A], games);

  expect(result).toEqual([{ team: A, blocks: [3] }]);
});

it("should return [n] for n away games", () => {
  const games = _.range(3).map(() => createGame(A, B, new Date()));

  const result = analyzer([A], games);

  expect(result).toEqual([{ team: A, blocks: [3] }]);
});

it("should return [m, n] for m away games and n home games", () => {
  const games = [
    ..._.range(4).map(() => createGame(A, B, new Date())),
    ..._.range(3).map(() => createGame(B, A, new Date()))
  ];

  const result = analyzer([A], games);

  expect(result).toEqual([{ team: A, blocks: [4, 3] }]);
});

it("should handle two teams", () => {
  const games = [
    ..._.range(4).map(() => createGame(A, B, new Date())),
    ..._.range(3).map(() => createGame(B, A, new Date()))
  ];

  const result = analyzer([A, B], games);

  expect(result).toEqual([
    { team: A, blocks: [4, 3] },
    { team: B, blocks: [4, 3] }
  ]);
});
