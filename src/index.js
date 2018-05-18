import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

import welcome from "./assets/images/welcome.jpg";
import success from "./assets/images/success.JPG";
import fail from "./assets/images/fail.JPG";

import ReactCountdownClock from "react-countdown-clock";
//import { ListGroup, ListGroupItem } from "reactstrap";
//import { Container, Row, Col } from "reactstrap";
import registerServiceWorker from "./registerServiceWorker";
import { MdCheck } from "react-icons/lib/md";
class Board extends React.Component {
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

class Question extends React.Component {
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
            bigBrotherHandleChange={this.props.handleChange}
            answer={this.props.x * this.props.y}
          />
        </td>
      </tr>
    );
  }
}

class AnswerBox extends React.Component {
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
    this.props.bigBrotherHandleChange(
      this.id,
      event.target.value === String(this.props.answer) ? 1 : 0
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

const Qlist = function(props) {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Question</th>
            <th>Answer</th>
          </tr>
        </thead>
        <tbody>{props.listy}</tbody>
      </table>
    </div>
  );
};
class StartBox extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="wrapper">
        <h3>{this.props.title}</h3>
        <img
          className="welcome"
          id="pic"
          //src="https://www.dropbox.com/s/7vh6wrht05329dh/12042011%20032.jpg?raw=1"

          src={this.props.picture}
          alt="friendly"
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

class App extends React.Component {
  qlist = [];

  constructor(props) {
    super(props);
    this.state = {
      score: 0,
      qstate: this.qlist,
      started: false,
      numQs: 10,
      time: 1,
      messagePic: welcome,
      message: "Welcome"
    };
    this.gameOver = this.gameOver.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSlide = this.handleSlide.bind(this);
  }
  handleChange(id, plus) {
    if (plus > 0) {
      this.setState({ score: this.state.score + plus });
      var pos = this.state.score + plus;
      if (pos < this.state.numQs) {
        let qlist = this.state.qstate.slice(0);
        let newlyfocussedQ = (
          <Question
            focMe="autofocus"
            id={qlist[pos].props.id}
            x={qlist[pos].props.x}
            y={qlist[pos].props.y}
            answer={qlist[pos].props.answer}
            key={this.qlist.toString() + new Date()}
            handleChange={qlist[pos].props.handleChange}
          />
        );
        var newlist = this.state.qstate.slice(0, pos);
        newlist.push(newlyfocussedQ);
        this.setState({ qstate: newlist.concat(qlist.slice(pos + 1)) });
      }
    }
  }
  gameOver(mess, messPic) {
    console.log("whar");
    this.setState({
      started: false,
      message: mess,
      messagePic: messPic,
      score: 0
    });
  }
  handleSubmit() {
    this.setState({ started: true });
    for (var i = 0; i < this.state.numQs; i++) {
      var x = Math.floor(Math.random() * 5) + 7;
      var y = Math.floor(Math.random() * 12) + 1;
      var foc = i === 0 ? "autofocus" : "";

      this.qlist.push(
        <Question
          focMe={foc}
          id={i}
          x={String(x)}
          y={String(y)}
          answer={String(x * y)}
          key={this.qlist.toString()}
          handleChange={this.handleChange}
        />
      );
    }
  }
  handleSlide(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    if (this.state.score === this.state.numQs)
      this.gameOver("Success", success);
    if (!this.state.started) {
      return (
        <StartBox
          qValue={this.state.numQs}
          timeValue={this.state.time}
          submitter={this.handleSubmit}
          slideChange={this.handleSlide}
          picture={this.state.messagePic}
          title={this.state.message}
        />
      );
    } else {
      return (
        <div>
          <span className="rowC" id="instruments">
            <Board
              col={
                "rgb(" +
                (255 - 255 / this.state.numQs * this.state.score) +
                "," +
                255 / this.state.numQs * this.state.score +
                ",0)"
              }
              // className="back"
              score={
                this.state.score === this.state.numQs ? "yay" : this.state.score
              }
            />
            <ReactCountdownClock
              seconds={60 * this.state.time}
              color="red"
              alpha={1}
              size={100}
              paused={this.state.score === this.state.numQs}
              onComplete={() => {
                this.gameOver("FAILLLLL", fail);
              }}
            />
          </span>
          <div className="rowC back">
            <Qlist listy={this.state.qstate} />
          </div>
        </div>
      );
    }
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
