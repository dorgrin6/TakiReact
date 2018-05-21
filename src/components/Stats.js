import React from "react";
import "../css/styleStatsMenu.css";

export default class Stats extends React.Component {
  render() {
    return (
      <div className={"stats"}>
        <img src={"../src/textures/board.png"} id={"stats-board"} />
        <div className={"stats-text"}>
          <p id={"turn_amount"}>Turns: 1</p>
          <p id={"turn_elapsed_game"}>Time: 0:00</p>
          <p id={"turn_indicator"}>Your Turn</p>
          <button className={"stats-button button-UI"} id={"quit-button"}>
            Quit
          </button>
        </div>
      </div>
    );
  }
}
