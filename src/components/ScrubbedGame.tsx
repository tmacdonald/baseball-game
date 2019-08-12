import React, { useState, useEffect, ReactChildren } from "react";
import Game from "../models/Game";

type ScrubbedGameProps = {
  game: Game;
  children: (game: Game) => JSX.Element;
};

export default function ScrubbedGame({ game, children }: ScrubbedGameProps) {
  const [scrubbedGame, setScrubbedGame] = useState(game);
  const [scrub, setScrub] = useState(0);

  useEffect(() => {
    setScrubbedGame(game);
    setScrub(game.states.length);
  }, [game]);

  function changeScrub(newScrub: number) {
    setScrub(newScrub);
    setScrubbedGame({
      ...game,
      states: game.states.slice(0, newScrub)
    });
  }

  return (
    <>
      {children(scrubbedGame)}
      <input
        type="range"
        min="0"
        max={game.states.length}
        value={scrub}
        onChange={e => changeScrub(parseInt(e.target.value))}
      />
    </>
  );
}
