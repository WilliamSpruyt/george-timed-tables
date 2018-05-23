import React from "react";
import welcome from "./assets/images/welcome.jpg";
import success from "./assets/images/success.JPG";
import fail from "./assets/images/fail.JPG";
import { Switch, Route } from "react-router-dom";
import ReactCountdownClock from "react-countdown-clock";
import { Qlist } from "./components/qlist.js";
import { StatList } from "./components/statList.js";
import { StartBox } from "./components/startBox";
import { Board } from "./components/board";
import { Question } from "./components/question";
import { Header } from "./components/question";

/*
 <StatList
            listy={this.state.stats.map(ele => {
              return (
                <tr key={this.state.stats.toString() + new Date()}>
                  <td>{ele.name}</td>
                  <td>{ele.score}</td>
                  <td>{ele.time}</td>
                  <td>{ele.time / ele.score}</td>
                </tr>
              );
            })}
          />*/
var list = [
  {
    time: 19,
    name: "dildi",
    score: 1900
  }
];
export const App = () => (
  <main>
    <Switch>
      <Route exact path="/" component={Game} />

      <Route
        exact
        path="/stats"
        render={props => (
          <StatList
            listy={list.map(ele => {
              return (
                <tr key={list.toString() + new Date()}>
                  <td>{ele.name}</td>
                  <td>{ele.score}</td>
                  <td>{ele.time}</td>
                  <td>{ele.time / ele.score}</td>
                </tr>
              );
            })}
          />
        )}
      />
    </Switch>
  </main>
);
class Game extends React.Component {
  qlist = [];
  constructor(props) {
    super(props);
    this.state = {
      score: 0,
      qstate: [],
      started: false,
      numQs: "",
      time: "",
      messagePic: welcome,
      message: "Welcome",
      picStyle: "welcome",
      textStyle: "welcometext",
      stats: [],
      startTime: 0,
      playerName: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSlide = this.handleSlide.bind(this);
  }
  gameOver(mess, messPic, styley, txt) {
    var statObj = {
      time: (Date.now() - this.state.startTime) / 1000,
      score: this.state.score,
      name: this.state.playerName
    };
    statObj.score += mess === "Success" ? 1 : 0;
    var tempArr = this.state.stats.slice(0);
    tempArr.push(statObj);

    this.setState(
      {
        message: mess,
        messagePic: messPic,
        score: 0,
        qstate: [],
        picStyle: styley,
        textStyle: txt,
        stats: tempArr
      },
      () => {
        this.setState({ started: false });
      }
    );
  }
  handleChange(id, right) {
    if (right) {
      if (this.state.score === this.state.numQs - 1) {
        this.gameOver("Success", success, "success", "successtext");
        return;
      }
      this.setState({ score: this.state.score + 1 });
      var pos = this.state.score + 1;
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

  handleSubmit() {
    this.qlist.length = 0;

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
    this.setState({ qstate: this.qlist, startTime: Date.now() }, () => {
      this.setState({ started: true });
    });
  }
  handleSlide(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    if (!this.state.started) {
      return (
        <div>
          <StartBox
            qValue={this.state.numQs}
            timeValue={this.state.time}
            playerName={this.state.playerName}
            submitter={this.handleSubmit}
            slideChange={this.handleSlide}
            picture={this.state.messagePic}
            title={this.state.message}
            styley={this.state.picStyle}
            textStyle={this.state.textStyle}
          />
        </div>
      );
    } else {
      return (
        <div>
          {}
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
                this.gameOver("FAILLLLL", fail, "fail", "failtext");
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
