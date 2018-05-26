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

    this.state = {
      userHand: {},
      pcHand: {},
      stats: {},
      playZone: {},
      deck: {}
    };

    manager.updateUI = this.updateUI.bind(this);
  }

  componentWillMount() {
    manager.initBoardComponents();
  }

  // Receives a map of the UI components to update.
  updateUI(UIComponents) {
    if (!UIComponents) console.error("empty UIComponents sent");
    if (UIComponents.userHand)
      this.setState(() => ({ userHand: UIComponents.userHand }));
    if (UIComponents.pcHand)
      this.setState(() => ({ pcHand: UIComponents.pcHand }));
    if (UIComponents.stats)
      this.setState(() => ({ stats: UIComponents.stats }));
    if (UIComponents.playZone)
      this.setState(() => ({ playZone: UIComponents.playZone }));
    if (UIComponents.deck) this.setState(() => ({ deck: UIComponents.deck }));
  }

  render() {
    return (
      <div>
        <Hand id={"pc"} hand={this.state.pcHand} />

        <div className={"container board-row"}>
          <Stats stats={this.state.stats} />
          <PlayZone playZone={this.state.playZone} />
          <Deck deck={this.state.deck} />
        </div>

        <Hand id={"user"} hand={this.state.userHand} />
      </div>
    );
  }
}
