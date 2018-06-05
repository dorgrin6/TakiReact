import React from "react";
import "../css/styleStatsMenu.css";
import stats from "../engine/Stats";
import manager from "../engine/Manager";

export default class StatsBoard extends React.Component {
  handleQuit() {
    manager.gameEnded();
    this.props.cbHandleQuit();
  }

  render() {
    let statsPlayer = this.props.activePlayer.stats;
    let turnIndicator = this.props.activePlayer.type === "user" ? "Your turn" : "PC turn";

    return (
      <div className="stats">
        <img src="../src/textures/board.png" id="stats-board" />
        <div className="stats-board-content">
          <div className="stats-text">
              {turnIndicator}<br/>
              Last card: {statsPlayer.lastCardCounter}<br/>
              Avg turn time: {statsPlayer.turnsAvgTime}
          </div>

          <button
            className="stats-button button-UI"
            id={"quit-button"}
            onClick={this.handleQuit.bind(this)}
          >
              {this.props.inShowMode ? "Results":"Quit"}
          </button>

          {this.props.inShowMode ? (
            <button
              className="stats-button button-UI"
              id={"prev-button"}
              onClick={this.props.cbHandlePrevHistory}
            >
              Prev
            </button>
          ) : null}
          {this.props.inShowMode ? (
            <button
              className="stats-button button-UI"
              id={"next-button"}
              onClick={this.props.cbHandleNextHistory}
            >
              Next
            </button>
          ) : null}
        </div>
      </div>
    );
  }
}
