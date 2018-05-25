import React from "react";
import Card from "./Card.js";

export default class Hand extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cards: this.props.hand.cards,
      legalCards: this.props.hand.legalCards
    };
  }

  render() {
    const cards = [];

    for (let i = 0; i < this.state.cards.length; i++) {
      const frontImg =
        this.props.id === "pc" ? undefined : this.state.cards[i].frontImg;
      cards.push(
        <Card
          holder={this.props.id}
          key={this.state.cards[i].cardId}
          frontImg={frontImg}
        />
      );
    }

    return <div className={"hand board-row"}>{cards}</div>;
  }
}
