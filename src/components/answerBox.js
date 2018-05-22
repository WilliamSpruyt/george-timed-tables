import React from "react";
import { MdCheck } from "react-icons/lib/md";
export class AnswerBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState(
      event.target.value !== String(this.props.answer)
        ? { value: event.target.value }
        : { ticked: true }
    );
    this.props.handleChange(
      this.id,
      event.target.value === String(this.props.answer) ? true : false
    );
  }

  render() {
    if (!this.state.ticked) {
      return (
        <form>
          <input
            autoFocus={this.props.focMe}
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
          />
        </form>
      );
    } else
      return (
        <div id="ansDiv">
          {this.props.answer} <MdCheck />{" "}
        </div>
      );
  }
}
