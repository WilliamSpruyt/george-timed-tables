import React from "react";

export class StartBox extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="wrapper">
        <p className={this.props.textStyle}>{this.props.title}</p>
        <img
          className={this.props.styley}
          id="pic"
          //src="https://www.dropbox.com/s/7vh6wrht05329dh/12042011%20032.jpg?raw=1"

          src={this.props.picture}
          alt={this.props.title}
        />
        <form>
          Time<input
            name="time"
            type="number"
            value={this.props.timeValue}
            min="1"
            max="10"
            step="1"
            onChange={this.props.slideChange}
          />
          Questions
          <input
            name="numQs"
            type="number"
            value={this.props.qValue}
            min="10"
            max="100"
            step="5"
            onChange={this.props.slideChange}
          />
          <button type="submit" id="but" onClick={this.props.submitter}>
            START
          </button>
        </form>
      </div>
    );
  }
}
