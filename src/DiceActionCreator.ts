import Action from "./actions/Action";
import Bases from "./models/Bases";
import {
  walk,
  single,
  double,
  triple,
  homeRun,
  error,
  popOut,
  groundOut,
  strikeOut,
  flyOut,
  doublePlay
} from "./actions";
import _ from "lodash";

type Rule = {
  diceRoll: [number, number];
  action: Action;
};

const rules: Rule[] = [
  { diceRoll: [1, 1], action: homeRun },
  { diceRoll: [1, 2], action: double },
  { diceRoll: [1, 3], action: single },
  { diceRoll: [1, 4], action: popOut },
  { diceRoll: [1, 5], action: doublePlay },
  { diceRoll: [1, 6], action: strikeOut },
  { diceRoll: [2, 2], action: single },
  { diceRoll: [2, 3], action: popOut },
  { diceRoll: [2, 4], action: groundOut },
  { diceRoll: [2, 5], action: strikeOut },
  { diceRoll: [2, 6], action: groundOut },
  { diceRoll: [3, 3], action: single },
  { diceRoll: [3, 4], action: strikeOut },
  { diceRoll: [3, 5], action: groundOut },
  { diceRoll: [3, 6], action: flyOut },
  { diceRoll: [4, 4], action: walk },
  { diceRoll: [4, 5], action: flyOut },
  { diceRoll: [4, 6], action: flyOut },
  { diceRoll: [5, 5], action: error },
  { diceRoll: [5, 6], action: single },
  { diceRoll: [6, 6], action: triple }
];

export default function diceActionCreator(
  bases: Bases,
  numberOfOuts: number
): Action {
  const diceRoll = _.range(2).map(() => Math.ceil(Math.random() * 6));
  diceRoll.sort((a, b) => (a < b ? -1 : 1));

  const rule = _.find(
    rules,
    roll => diceRoll[0] === roll.diceRoll[0] && diceRoll[1] === roll.diceRoll[1]
  );
  if (rule !== undefined) {
    if (rule.action.isPossible(bases, numberOfOuts)) {
      return rule.action;
    }
  }
  return groundOut;
}
