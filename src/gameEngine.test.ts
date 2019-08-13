import { simulateAction, createGame, isGameOver, innings } from "./gameEngine";
import { out, homeRun } from "./actions";
import Action from "./actions/Action";
import _ from "lodash";

const team1 = {
  name: "Team 1",
  roster: _.range(9).map(i => `Team 1 Player ${i + 1}`)
};

const team2 = {
  name: "Team 2",
  roster: _.range(9).map(i => `Team 2 Player ${i + 1}`)
};

const halfInnings = (innings: number) => 3 * innings;
const fullInnings = (innings: number) => 3 * 2 * innings;

const createTestGame = () => createGame(team1, team2);

function playGameActions(actions: Action[]) {
  return actions.reduce(
    (game, action) => simulateAction(game, () => action),
    createTestGame()
  );
}

describe("simulateAction", () => {
  it("should switch to bottom half of inning after the away team has three outs", () => {
    const actions = [..._.range(halfInnings(1) + 1).map(() => out)];

    const game = playGameActions(actions);

    expect(game.awayAtBats.length).toEqual(3);
    expect(game.homeAtBats.length).toEqual(1);
  });

  it("should switch to the top half of the next inning after the home team has three outs", () => {
    const actions = [..._.range(fullInnings(1) + 1).map(() => out)];

    const game = playGameActions(actions);

    expect(game.awayAtBats.length).toEqual(4);
    expect(game.homeAtBats.length).toEqual(3);
  });
});

describe("isGameOver", () => {
  it("should not consider a game that hasn't started as over", () => {
    const game = createTestGame();

    expect(isGameOver(game)).toBe(false);
  });

  it("should not consider a game over after 4 innings if the away team is winning", () => {
    const actions = [
      ..._.range(fullInnings(3)).map(() => out),
      homeRun,
      ..._.range(fullInnings(1)).map(() => out)
    ];

    const game = playGameActions(actions);

    expect(isGameOver(game)).toBe(false);
  });

  it("should consider a game over if 8 1/2 innings are played and the home team is winning", () => {
    const actions = [
      ..._.range(halfInnings(1)).map(() => out), // 3 outs for the away team in the top of the 1st
      homeRun, // home for the home team in the bottom of the first
      ..._.range(fullInnings(8)).map(() => out)
    ]; // 3 outs from the bottom of the first through the top of the ninth

    const game = playGameActions(actions);

    expect(isGameOver(game)).toBe(true);
  });

  it("should not consider a game tied after 9 innings to be over", () => {
    const actions = _.range(fullInnings(9)).map(() => out);

    const game = playGameActions(actions);

    expect(isGameOver(game)).toBe(false);
  });

  it("should consider the home team taking the lead in the bottom of the 9th to be over", () => {
    const actions = [..._.range(1, 53 + 1).map(() => out), homeRun];

    const game = playGameActions(actions);

    expect(isGameOver(game)).toBe(true);
  });

  it("should not consider the away team taking the lead in the top of the 10th to be over", () => {
    const actions = [..._.range(fullInnings(9)).map(() => out), homeRun];

    const game = playGameActions(actions);

    expect(isGameOver(game)).toBe(false);
  });

  it("should consider the home team taking the lead in the bottom of the 10th to be over", () => {
    const actions = [
      ..._.range(fullInnings(9) + halfInnings(1)).map(() => out),
      homeRun
    ];

    const game = playGameActions(actions);

    expect(isGameOver(game)).toBe(true);
  });

  it("should not consider the away team leading after the top of the 9th to be over", () => {
    const actions = [
      homeRun,
      ..._.range(fullInnings(8) + halfInnings(1)).map(() => out)
    ];

    const game = playGameActions(actions);

    expect(isGameOver(game)).toBe(false);
  });

  it("should not consider the away team leading after the top of the 9th and a play in the bottom of the ninth to be over", () => {
    const actions = [
      homeRun,
      ..._.range(fullInnings(8) + halfInnings(1) + 1).map(() => out)
    ];

    const game = playGameActions(actions);

    expect(isGameOver(game)).toBe(false);
  });

  it("should consider the away team leading after 9 innings to be over", () => {
    const actions = [homeRun, ..._.range(fullInnings(9)).map(() => out)];

    const game = playGameActions(actions);

    expect(isGameOver(game)).toBe(true);
  });

  it("should consider the away team leading after 10 innings to be over", () => {
    const actions = [
      ..._.range(fullInnings(9)).map(() => out),
      homeRun,
      ..._.range(fullInnings(1)).map(() => out)
    ];

    const game = playGameActions(actions);

    expect(isGameOver(game)).toBe(true);
  });
});
