import React from "react";
import Card from "./Card.js";
import manager from "../engine/Manager.js";

export default class Deck extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      legal: false
      // cardsAmount: props.deck.cards.length
    };
  }

  getCardStyle() {
    let res = "card-deck";
    let activePlayer = manager.getActivePlayer();
    if (activePlayer.playerType === "user") {
      if (activePlayer.hand.legalCards.length === 0) {
        res += " legal-card";
      } else {
        res += " illegal-card";
      }
    }

    return res;
  }

  handleClick(){
    console.log(manager.getActivePlayer().hand.legalCards);
    manager.getActivePlayer().drawWhenNoLegalCards();
  }

  render() {
    //TODO: show deck propertly this is just a stub

    const cards = [];
    const cardStyle = this.getCardStyle();

    return (
      <Card
        holder={"deck"}
        key={this.props.deck.cards[0].cardId}
        frontImg={this.props.deck.cards[0].frontImg}
        cardStyle={cardStyle}
        style={{ position: "absolute" }}
        onclick={this.handleClick.bind(this)}
      />
    );
  }
}
