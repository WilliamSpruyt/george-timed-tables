import React from "react";
import start from "../assets/images/startberniewithalph150px.png";

export class StartBox extends React.Component {
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
          <input
            placeholder="Time"
            name="time"
            type="number"
            value={this.props.timeValue}
            min="1"
            max="10"
            step="1"
            onChange={this.props.slideChange}
          />
          <button type="submit" id="but" onClick={this.props.submitter}>
            <img
              id="butim"
              src={start}
              alt="bernie"
              onClick={this.myfunction}
            />
          </button>

          <input
            placeholder="Questions"
            name="numQs"
            type="number"
            value={this.props.qValue}
            min="10"
            max="100"
            step="5"
            onChange={this.props.slideChange}
          />
          <input
            placeholder="Name"
            name="playerName"
            value={this.props.playerName}
            onChange={this.props.slideChange}
          />
        </form>
      </div>
    );
  }
}
