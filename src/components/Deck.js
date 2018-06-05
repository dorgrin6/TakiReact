import React from "react";
import manager from "../engine/Manager.js";

export default class Deck extends React.Component {
  constructor(props){
    super(props);
    this.backCardImgSrc = "../src/textures/cards/card_back.png";
  }

  getCardStyle() {
    let res = "card-deck";
    const activePlayer = manager.getActivePlayer();
    if (!this.props.inShowMode && activePlayer.playerType === "user") {
      if (activePlayer.isAbleToDrawFromDeck()) {
        res += " legal-card";
      } else {
        res += " illegal-card";
      }
    }

    res += " tooltip";
    return res;
  }

  handleClick() {
    manager.getActivePlayer().drawWhenNoLegalCards();
  }

  render() {
    const cardStyle = this.getCardStyle();

    return (
      <div className={"deck"}>
        <img
          className={cardStyle}
          src={this.backCardImgSrc}
          onClick={this.props.inShowMode ? null : this.handleClick.bind(this)}
        />
      </div>
    );
  }
}
