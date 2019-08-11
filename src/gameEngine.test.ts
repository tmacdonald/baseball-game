import { simulateAction, createGame, isGameOver } from "./gameEngine";
import { out, homeRun } from "./actions";
import { createState } from "./utils";
import _ from "lodash";

const halfInnings = (innings: number) => 3 * innings;
const fullInnings = (innings: number) => 3 * 2 * innings;

it("should create an away inning after the first action", () => {
  const game = createGame();
  const createAction = () => out;

  const nextGame = simulateAction(game, createAction);

  expect(nextGame.homeInnings).toEqual([]);
  expect(nextGame.awayInnings.length).toEqual(game.awayInnings.length + 1);
});

it("should create a home inning if the away inning is over", () => {
  const createAction = () => out;

  const game = _.range(1, 3 + 1).reduce(
    (game, _) => simulateAction(game, createAction),
    createGame()
  );

  const nextGame = simulateAction(game, createAction);

  expect(nextGame.homeInnings.length).toEqual(game.homeInnings.length + 1);
});

describe("isGameOver", () => {
  it("should not consider a game that hasn't started as over", () => {
    const game = createGame();

    expect(isGameOver(game)).toBe(false);
  });

  it("should not consider a game over after 4 innings if the away team is winning", () => {
    const actions = [
      ..._.range(fullInnings(3)).map(() => () => out),
      () => homeRun,
      ..._.range(fullInnings(1)).map(() => () => out)
    ];

    const game = actions.reduce(
      (game, action) => simulateAction(game, action),
      createGame()
    );

    expect(isGameOver(game)).toBe(false);
  });

  it("should consider a game over if 8 1/2 innings are played and the home team is winning", () => {
    const actions = [
      ..._.range(halfInnings(1)).map(() => () => out), // 3 outs for the away team in the top of the 1st
      () => homeRun, // home for the home team in the bottom of the first
      ..._.range(fullInnings(8)).map(() => () => out)
    ]; // 3 outs from the bottom of the first through the top of the ninth

    const game = actions.reduce(
      (game, action) => simulateAction(game, action),
      createGame()
    );

    expect(isGameOver(game)).toBe(true);
  });

  it("should not consider a game tied after 9 innings to be over", () => {
    const actions = _.range(fullInnings(9)).map(() => () => out);

    const game = actions.reduce(
      (game, action) => simulateAction(game, action),
      createGame()
    );

    expect(isGameOver(game)).toBe(false);
  });

  it("should consider the home team taking the lead in the bottom of the 9th to be over", () => {
    const actions = [..._.range(1, 53 + 1).map(() => () => out), () => homeRun];

    const game = actions.reduce(
      (game, action) => simulateAction(game, action),
      createGame()
    );

    expect(isGameOver(game)).toBe(true);
  });

  it("should not consider the away team taking the lead in the top of the 10th to be over", () => {
    const actions = [
      ..._.range(fullInnings(9)).map(() => () => out),
      () => homeRun
    ];

    const game = actions.reduce(
      (game, action) => simulateAction(game, action),
      createGame()
    );

    expect(isGameOver(game)).toBe(false);
  });

  it("should consider the home team taking the lead in the bottom of the 10th to be over", () => {
    const actions = [
      ..._.range(fullInnings(9) + halfInnings(1)).map(() => () => out),
      () => homeRun
    ];

    const game = actions.reduce(
      (game, action) => simulateAction(game, action),
      createGame()
    );

    expect(isGameOver(game)).toBe(true);
  });

  it("should not consider the away team leading after the top of the 9th to be over", () => {
    const actions = [
      () => homeRun,
      ..._.range(fullInnings(8) + halfInnings(1)).map(() => () => out)
    ];

    const game = actions.reduce(
      (game, action) => simulateAction(game, action),
      createGame()
    );

    expect(isGameOver(game)).toBe(false);
  });

  it("should consider the away team leading after 9 innings to be over", () => {
    const actions = [
      () => homeRun,
      ..._.range(fullInnings(9)).map(() => () => out)
    ];

    const game = actions.reduce(
      (game, action) => simulateAction(game, action),
      createGame()
    );

    expect(isGameOver(game)).toBe(true);
  });

  it("should consider the away team leading after 10 innings to be over", () => {
    const actions = [
      ..._.range(fullInnings(9)).map(() => () => out),
      () => homeRun,
      ..._.range(fullInnings(1)).map(() => () => out)
    ];

    const game = actions.reduce(
      (game, action) => simulateAction(game, action),
      createGame()
    );

    expect(isGameOver(game)).toBe(true);
  });
});
