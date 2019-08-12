import React from "react";
import _ from "lodash";
import Game from "../models/Game";
import Inning from "../models/Inning";
import { innings as getInnings } from "../gameEngine";
import { hits, runs, errors, inningRuns } from "../stats";

type BoxScoreProps = {
  game: Game;
};

export default function BoxScore({ game }: BoxScoreProps) {
  const { awayInnings, homeInnings } = getInnings(game);

  function printInnings(teamInnings: Inning[], numberOfInnings: number) {
    const printedTeamInnings = teamInnings.map(inning => (
      <td>{inningRuns(inning)}</td>
    ));
    const otherInnings = _.range(
      Math.max(0, numberOfInnings - teamInnings.length)
    ).map(() => <td>-</td>);
    return [...printedTeamInnings, ...otherInnings];
  }

  const awayHits = hits(awayInnings);
  const awayRuns = runs(awayInnings);
  const awayErrors = errors(homeInnings);
  const homeHits = hits(homeInnings);
  const homeRuns = runs(homeInnings);
  const homeErrors = errors(awayInnings);

  const numberOfInnings = Math.max(
    9,
    Math.max(awayInnings.length, homeInnings.length)
  );
  const innings = _.range(1, numberOfInnings + 1);

  return (
    <>
      <table>
        <thead>
          <tr>
            <td />
            {innings.map(inning => (
              <th>{inning}</th>
            ))}
            <th>R</th>
            <th>H</th>
            <th>E</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{game.awayTeam.name}</td>
            {printInnings(awayInnings, numberOfInnings)}
            <td>{awayRuns}</td>
            <td>{awayHits}</td>
            <td>{awayErrors}</td>
          </tr>
          <tr>
            <td>{game.homeTeam.name}</td>
            {printInnings(homeInnings, numberOfInnings)}
            <td>{homeRuns}</td>
            <td>{homeHits}</td>
            <td>{homeErrors}</td>
          </tr>
        </tbody>
      </table>
      {/* <GameLog game={game} /> */}
    </>
  );
}
