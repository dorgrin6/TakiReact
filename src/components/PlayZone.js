import React from "react";
import Card from "./Card.js";

export default class PlayZone extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cards: props.playZone.cards
    };
  }

  createPlayZoneCard(card) {
    const sign = Math.random() > 0.5 ? 1 : -1;
    const angleAbs = Math.random() * 20;
    const angle = angleAbs * sign;

    return (
      <Card
        key={card.cardId}
        holder={"card-playZone"}
        rotate={angle}
      />
    );
  }

  render() {
    console.log(this.state);
    const playCard = this.createPlayZoneCard(this.state.cards[0]);
    return (
      <div className={"playZone"} id={"playZone"}>
        {playCard}
      </div>
    );
  }
}
