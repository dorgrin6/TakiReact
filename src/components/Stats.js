import React from "react";
import "../css/styleStatsMenu.css";
import stats from "../engine/Stats.js";
import manager from "../engine/Manager.js";

export default class Stats extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      turnAmount: 1,
      time: "",
      elapsedTimeInterval: {},
      activePlayer: {}
    };
  }

  componentDidMount() {
    this.elapsedTimeInterval = setInterval(() => {
      this.setState(() => {
        return {
          time: stats.getElapsedTime(),
          activePlayer: manager.getActivePlayer()
        };
      });
    }, 1000);

    this.setState(() => {
      return { elapsedTimeInterval: this.elapsedTimeInterval };
    });
  }

  handleQuit() {
    stats.gameWatch.stop();
    clearInterval(this.elapsedTimeInterval);
    // TODO: show end game menu
  }

  render() {
    const activePlayer = this.state.activePlayer;

    let turnIndicator = "";
    let lastCardCounter = "";
    let avgTime = "";

    if (activePlayer && activePlayer.stats){
      turnIndicator = activePlayer.playerType === "user" ? "Your turn" : "PC turn";
      lastCardCounter = activePlayer.stats.lastCardCounter;
      avgTime = activePlayer.getAvgTurnTime();
    }

    return (
      <div className={"stats"}>
        <img src={"../src/textures/board.png"} id={"stats-board"} />
        <div className={"stats-text"}>
          <p>Turns: {this.state.turnAmount}</p>
          <p>Time: {this.state.time}</p>
          <p>{turnIndicator}</p>
          <p>Last card:{lastCardCounter}</p>
          <p>Avg time per turn:{avgTime}</p>
          <button
            className={"stats-button button-UI"}
            id={"quit-button"}
            onClick={this.handleQuit.bind(this)}
          >
            Quit
          </button>
        </div>
      </div>
    );
  }
}
