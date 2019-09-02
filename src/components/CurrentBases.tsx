import React from "react";
import Game from "../models/Game";
import Bases from "./Bases";

type CurrentBasesProps = {
  game: Game;
};

export default function CurrentBases({ game }: CurrentBasesProps) {
  const currentPlay = game.plays[game.plays.length - 1];

  let first = false;
  let second = false;
  let third = false;

  if (!!currentPlay) {
    first = !!currentPlay.bases.first;
    second = !!currentPlay.bases.second;
    third = !!currentPlay.bases.third;
  }

  return <Bases first={first} second={second} third={third} />;
}
