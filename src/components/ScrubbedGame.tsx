import React, { useState, useEffect } from "react";
import Game from "../models/Game";
import { numberOfPlays, sliceGame } from "../stats";

type ScrubbedGameProps = {
  game: Game;
  children: (game: Game, control: JSX.Element) => JSX.Element;
};

export default function ScrubbedGame({ game, children }: ScrubbedGameProps) {
  const [scrubbedGame, setScrubbedGame] = useState(game);
  const [scrub, setScrub] = useState(0);

  useEffect(() => {
    setScrubbedGame(game);
    setScrub(numberOfPlays(game));
  }, [game]);

  function changeScrub(newScrub: number) {
    setScrub(newScrub);
    setScrubbedGame(sliceGame(game, newScrub));
  }

  const control = (
    <input
      type="range"
      min="0"
      max={numberOfPlays(game)}
      value={scrub}
      onChange={e => changeScrub(parseInt(e.target.value))}
    />
  );

  return <>{children(scrubbedGame, control)}</>;
}
