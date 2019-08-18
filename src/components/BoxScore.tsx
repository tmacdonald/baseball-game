import React from "react";
import _ from "lodash";
import Game from "../models/Game";
import { hits, runs, errors, runsByInning } from "../stats";

type BoxScoreProps = {
  game: Game;
};

export default function BoxScore({ game }: BoxScoreProps) {
  const [awayHits, homeHits] = hits(game);
  const [awayRuns, homeRuns] = runs(game);
  const [awayErrors, homeErrors] = errors(game);

  const [awayRunsPerInning, homeRunsPerInning] = runsByInning(game);

  function printInnings(runsByInning: number[], numberOfInnings: number) {
    const printedTeamInnings = runsByInning.map(runs => <td>{runs}</td>);
    const otherInnings = _.range(
      Math.max(0, numberOfInnings - runsByInning.length)
    ).map(() => <td>-</td>);
    return [...printedTeamInnings, ...otherInnings];
  }

  const numberOfInnings = Math.max(
    9,
    Math.max(awayRunsPerInning.length, homeRunsPerInning.length)
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
            {printInnings(awayRunsPerInning, numberOfInnings)}
            <td>{awayRuns}</td>
            <td>{awayHits}</td>
            <td>{awayErrors}</td>
          </tr>
          <tr>
            <td>{game.homeTeam.name}</td>
            {printInnings(homeRunsPerInning, numberOfInnings)}
            <td>{homeRuns}</td>
            <td>{homeHits}</td>
            <td>{homeErrors}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
