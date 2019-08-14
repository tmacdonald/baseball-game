import React, { useState, useEffect } from "react";
import Game from "../models/Game";
import { numberOfAtBats, gameHistory } from "../stats";

type ScrubbedGameProps = {
  game: Game;
  children: (game: Game) => JSX.Element;
};

export default function ScrubbedGame({ game, children }: ScrubbedGameProps) {
  const [scrubbedGame, setScrubbedGame] = useState(game);
  const [scrub, setScrub] = useState(0);

  useEffect(() => {
    setScrubbedGame(game);
    setScrub(numberOfAtBats(game));
  }, [game]);

  function changeScrub(newScrub: number) {
    setScrub(newScrub);
    setScrubbedGame(gameHistory(game, newScrub));
  }

  return (
    <>
      {children(scrubbedGame)}
      <input
        type="range"
        min="0"
        max={numberOfAtBats(game)}
        value={scrub}
        onChange={e => changeScrub(parseInt(e.target.value))}
      />
    </>
  );
}
