import React from "react";
import PlayLog from "./PlayLog";
import Game from "../models/Game";

type GamePlayLogProps = {
  game: Game;
};

export default function GamePlayLog({ game }: GamePlayLogProps) {
  return <PlayLog plays={game.plays} />;
}
