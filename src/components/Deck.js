import React from "react";
import Card from "./Card.js";

export default class Deck extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: props.deck.cards
    };
  }

  render() {
    //TODO: show deck propertly this is just a stub
    const cards = [];

    return (
      <Card
        holder={"deck"}
        key={this.state.cards[0].cardId}
        frontImg={this.state.cards[0].frontImg}
        style={{ position: "absolute" }}
      />
    );
  }
}
