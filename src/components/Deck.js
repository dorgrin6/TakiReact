import React from "react";
import Card from "./Card.js";

export default class Deck extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // cardsAmount: props.deck.cards.length
    };
  }

  render() {
    //TODO: show deck propertly this is just a stub

    const cards = [];

    return (
      <Card
        holder={"deck"}
        key={this.props.deck.cards[0].cardId}
        frontImg={this.props.deck.cards[0].frontImg}
        style={{ position: "absolute" }}
      />
    );
  }
}
