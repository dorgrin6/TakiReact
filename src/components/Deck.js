import React from "react";
import Card from "./Card.js";

// https://stackoverflow.com/questions/35905988/react-js-how-to-append-a-component-on-click
export default class Deck extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: props.deck.cards
    };
  }

  render() {
    //TODO: show deck propertly this is just a stub
    const card = (
      <Card
        holder={this.props.id}
        key={this.state.cards[0].cardId}
        frontImg={this.state.cards[0].frontImg}
      />
    );

    return <div className={"deck"}>{card}</div>;
  }
}
