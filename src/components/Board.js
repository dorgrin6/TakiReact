import React from "react";
import "../css/style.css";
import "../css/styleStatsMenu.css";
import Hand from "./Hand.js";
import PlayZone from "./PlayZone.js";
import Stats from "./Stats.js";
import manager from "../engine/Manager";
import Deck from "./Deck";

export default class Board extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div>
        <Hand id={"pc"} hand={this.props.board.pcPlayer.hand} />

        <div className={"container board-row"}>
          <Stats stats={this.props.board.stats} />
          <PlayZone playZone={this.props.board.playZone} />
          <Deck deck={this.props.board.deck} />
        </div>

        <Hand id={"user"} hand={this.props.board.userPlayer.hand} />
      </div>
    );
  }
}
