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
    manager.updateUI = this.updateComponents.bind(this);
    manager.initBoardComponents();
  }

  updateComponents(pcHand, userHand, stats, playZone, deck) {
    this.pcHand = pcHand;
    this.userHand = userHand;
    this.stats = stats;
    console.log("playZone:", playZone);
    this.playZone = playZone;
    this.deck = deck;
  }

  render() {
    return (
      <div>
        <Hand id={"pc"} hand={this.pcHand} />

        <div className={"container board-row"}>
          <Stats stats={this.stats} />
          <PlayZone playZone={this.playZone} />
          <Deck deck={this.deck} />
        </div>

        <Hand id={"user"} hand={this.userHand} />
      </div>
    );
  }
}
