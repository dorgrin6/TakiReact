import React from "react";
import "../css/styleStatsMenu.css";
import stats from "../engine/Stats";
import manager from "../engine/Manager";

export default class Stats extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      turnAmount: 1,
      time: "",
      activePlayer: {}
    };
  }

  componentDidMount() {
    this.elapsedTimeInterval = setInterval(() => {
      this.setState(() => ({
        time: stats.getElapsedTime(),
        activePlayer: manager.getActivePlayer()
      }));
    }, 1000);

    this.setState(() => ({ elapsedTimeInterval: this.elapsedTimeInterval }));
  }

  handleQuit() {
    stats.gameWatch.stop();
    manager.gameEnded();
    this.props.cbHandleQuit();
  }

  render() {
    const activePlayer = this.state.activePlayer;

    let turnIndicator = "";
    let lastCardCounter = "";
    let avgTime = "";

    if (activePlayer && activePlayer.stats) {
      turnIndicator =
        activePlayer.playerType === "user" ? "Your turn" : "PC turn";
      lastCardCounter = activePlayer.stats.lastCardCounter;
      avgTime = activePlayer.getAvgTurnTime();
    }

    if (manager.isGameEnd()) {
      stats.gameWatch.stop();
    }

    return (
      <div className="stats">
        <img src="../src/textures/board.png" id="stats-board" />
        <div className="stats-text">
          <p>Time: {this.state.time}</p>
          <p>{turnIndicator}</p>
          <p>Last card: {lastCardCounter}</p>
          <p>Avg time per turn: {avgTime}</p>

          <button
            className="stats-button button-UI"
            id="quit-button"
            onClick={this.handleQuit.bind(this)}
          >
            Quit
          </button>
        </div>
      </div>
    );
  }
}
