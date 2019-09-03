import React, { useState } from "react";
import BoxScore from "./BoxScore";
import Game from "../models/Game";
import GamePlayLog from "./GamePlayLog";
import PlayerStatistics from "./PlayerStatistics";

type GameSummaryProps = {
  game: Game;
};

export default function GameSummary({ game }: GameSummaryProps) {
  const [showingGameLog, setShowingGameLog] = useState(false);

  return (
    <>
      <h3>{game.date.toString()}</h3>
      <BoxScore game={game} />
      {showingGameLog && (
        <>
          <PlayerStatistics games={[game]} roster={game.rosters[0]} />
          <PlayerStatistics games={[game]} roster={game.rosters[1]} />
          <GamePlayLog game={game} />
        </>
      )}
      <button onClick={() => setShowingGameLog(showing => !showing)}>
        Toggle game log
      </button>
    </>
  );
}
