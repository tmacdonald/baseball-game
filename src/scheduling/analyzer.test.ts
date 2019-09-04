import analyzer, { TeamScheduleBlock } from "./analyzer";
import { createGame } from "../gameEngine";
import _ from "lodash";

const A = { name: "A", roster: [] };
const B = { name: "B", roster: [] };

it("should handle no games", () => {
  const games = [];
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
