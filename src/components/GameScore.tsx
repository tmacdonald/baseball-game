import React from "react";
import _ from "lodash";
import Game from "../models/Game";
import Inning from "../models/Inning";
import { Team } from "../models/GameState";
import { innings as getInnings } from "../gameEngine";
import { hits, runs, errors, inningRuns } from "../stats";

function GameLog({ game }: GameScoreProps) {
  const currentState = _.last(game.states);

  if (currentState === undefined) {
    return null;
  }

  const relevantStates = [];
  for (let i = 0; i < game.states.length - 1; i = i + 1) {
    const beforeState = game.states[i];
    const afterState = game.states[i + 1];

    if (
      afterState.team === currentState.team &&
      afterState.inning === currentState.inning
    ) {
      relevantStates.push({ before: beforeState, after: afterState });
    }
  }

  return (
    <ul>
      {relevantStates.map(({ before, after }) => {
        // return (
        //   <li>
        //     <pre>{JSON.stringify({ before, after }, null, 2)}</pre>
        //   </li>
        // );
        if (after.outs === 0 && before.outs === 3) {
          if (after.team === Team.Away) {
            return <li>{`Top of ${after.inning}`}</li>;
          }
          return <li>{`Bottom of ${after.inning}`}</li>;
        }
        if (after.outs > before.outs) {
          return <li>{after.outs} out(s)</li>;
        }
        if (after.homeRuns > before.homeRuns) {
          return <li>home run</li>;
        }
        if (after.triples > before.triples) {
          return <li>triple</li>;
        }
        if (after.doubles > before.doubles) {
          return <li>double</li>;
        }
        if (after.singles > before.singles) {
          return <li>single</li>;
        }
        if (after.walks > before.walks) {
          return <li>walk</li>;
        }
        return <li>something else</li>;
      })}
    </ul>
  );
}

type GameScoreProps = {
  game: Game;
};

export default function GameScore({ game }: GameScoreProps) {
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
            <td>{game.awayTeam}</td>
            {printInnings(awayInnings, numberOfInnings)}
            <td>{awayRuns}</td>
            <td>{awayHits}</td>
            <td>{awayErrors}</td>
          </tr>
          <tr>
            <td>{game.homeTeam}</td>
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
