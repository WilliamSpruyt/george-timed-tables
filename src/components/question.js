import React from "react";
import { AnswerBox } from "./answerBox";

export class Question extends React.Component {
  render() {
    return (
      <tr>
        <td>
          {this.props.x} {"\u00D7"} {this.props.y} =
        </td>
        <td>
          <AnswerBox
            focMe={this.props.focMe}
            id={this.props.id}
            handleChange={this.props.handleChange}
            answer={this.props.x * this.props.y}
          />
        </td>
      </tr>
    );
  }
}
