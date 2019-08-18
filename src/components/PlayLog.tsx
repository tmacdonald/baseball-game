import React from "react";
import Play from "../models/Play";

type PlayLogProps = {
  plays: Play[];
};

export default function PlayLog({ plays }: PlayLogProps) {
  return (
    <ul>
      {plays.map(play => {
        const scoring =
          play.runs.length > 0 ? `, scoring ${play.runs.join(",")}` : "";

        return (
          <li>
            {play.batter} {play.action}
            {scoring}
          </li>
        );
      })}
    </ul>
  );
}
