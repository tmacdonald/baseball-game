import React from "react";
import Play from "../models/Play";

type PlayLogProps = {
  plays: Play[];
};

export default function PlayLog({ plays }: PlayLogProps) {
  return (
    <ul>
      {plays.map(play => {
        return (
          <li>
            {play.batter} {play.action}
          </li>
        );
      })}
    </ul>
  );
}
