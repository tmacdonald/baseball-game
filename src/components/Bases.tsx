import React from "react";

type BasesProps = {
  first: boolean;
  second: boolean;
  third: boolean;
};

export default function Bases({ first, second, third }: BasesProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <g transform="translate(20 0) scale(1.3 1) rotate(45)">
        <rect
          stroke="black"
          fill={second ? "black" : "none"}
          width="10"
          height="10"
        />
        <rect
          stroke="black"
          fill={first ? "black" : "none"}
          x="12"
          y="0"
          width="10"
          height="10"
        />
        <rect
          stroke="black"
          fill={third ? "black" : "none"}
          x="0"
          y="12"
          width="10"
          height="10"
        />
      </g>
    </svg>
  );
}
