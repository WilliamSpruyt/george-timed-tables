import React from "react";

export class Board extends React.Component {
  render() {
    return (
      <svg id="score" width="100" height="100">
        <circle
          cx="50"
          cy="50"
          r="46"
          stroke="green"
          strokeWidth="4"
          fill={this.props.col}
        />
        <text
          fill="#ffff00"
          fontSize="60"
          textAnchor="middle"
          alignmentBaseline="middle"
          fontFamily="Verdana"
          x="50"
          y="50"
        >
          {this.props.score}
        </text>
      </svg>
    );
  }
}
