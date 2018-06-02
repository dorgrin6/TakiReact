import React from "react";
import Card from "./Card.js";
import manager from "../engine/Manager.js";

export default class Deck extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      legal: false
    };
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
      <Card
        holder="deck"
        key={this.props.deck.cards[0].cardId}
        frontImg={this.props.deck.cards[0].frontImg}
        cardStyle={cardStyle}
        style={{ position: "absolute" }}
        onClick={this.handleClick.bind(this)}
        inShowMode={this.props.inShowMode}
      />
    );
  }
}
