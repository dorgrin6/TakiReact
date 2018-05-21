import React from "react";
import "../css/styleStatsMenu.css";
import stats from "../engine/Stats.js";

export default class Stats extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      turnAmount: 1,
      time: "",
      turnIndicator: "",
      elapsedTimeInterval: {}
    };
    this.init();
  }

  init() {}

  componentDidMount() {
    const elapsedTimeInterval = setInterval(() => {
      this.setState(() => {
        return { time: stats.getElapsedTime() };
      });
    }, 1000);

    this.setState(() => {
      return { elapsedTimeInterval: elapsedTimeInterval };
    });
  }

  render() {
    return (
      <div className={"stats"}>
        <img src={"../src/textures/board.png"} id={"stats-board"} />
        <div className={"stats-text"}>
          <p>Turns: {this.state.turnAmount}</p>
          <p>Time: {this.state.time}</p>
          <p>Your Turn: {this.state.turnIndicator}</p>
          <button className={"stats-button button-UI"} id={"quit-button"}>
            Quit
          </button>
        </div>
      </div>
    );
  }
}
