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

    this.stats = {
      userHand: this.userHand,
      pcHand: this.pcHand,
      stats: this.stats,
      playZone: this.playZone,
      deck: this.deck
    };

    manager.updateUI = this.updateComponents.bind(this);
    manager.initBoardComponents();
  }

  // Receives a map of the UI components to update.
  updateComponents(UIComponents) {
    if (!UIComponents) console.error("empty UIComponents sent");
    if (UIComponents.userHand) this.userHand = UIComponents.userHand;
    if (UIComponents.pcHand) this.pcHand = UIComponents.pcHand;
    if (UIComponents.stats) this.stats = UIComponents.stats;
    if (UIComponents.playZone) this.playZone = UIComponents.playZone;
    if (UIComponents.deck) this.deck = UIComponents.deck;
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
