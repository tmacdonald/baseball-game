import Action from "./actions/Action";
import { walk, single, double, triple, homeRun, out, error } from "./actions";

export default function diceActionCreator(): Action {
  const die1 = Math.ceil(Math.random() * 6);
  const die2 = Math.ceil(Math.random() * 6);
  //console.log(die1, die2);

  // 1/1 home run
  if (die1 === 1 && die2 === 1) {
    return homeRun;
  }
  // 1/2 double
  if ((die1 === 1 && die2 === 2) || (die1 === 2 && die2 === 1)) {
    return double;
  }
  // 1/3 single
  if ((die1 === 1 && die2 === 3) || (die1 === 3 && die2 === 1)) {
    return single;
  }
  // 1/4 pop out
  // 1/5 ground out
  // 1/6 strike out
  // 2/2 single
  if (die1 === 2 && die2 === 2) {
    return single;
  }
  // 2/3 pop out
  // 2/4 ground out
  // 2/5 strike out
  // 2/6 ground out
  // 3/3 single
  if (die1 === 3 && die2 === 3) {
    return single;
  }
  // 3/4 strike out
  // 3/5 ground out
  // 3/6 fly out
  // 4/4 walk
  if (die1 === 4 && die2 === 4) {
    return walk;
  }
  // 4/5 fly out
  // 4/6 fly out
  // 5/5 base on error
  if (die1 === 5 && die2 === 5) {
    return error;
  }
  // 5/6 single
  if ((die1 === 5 && die2 === 6) || (die1 === 6 && die2 === 5)) {
    return single;
  }
  // 6/6 triple
  if (die1 === 6 && die2 === 6) {
    return triple;
  }

  return out;
}
