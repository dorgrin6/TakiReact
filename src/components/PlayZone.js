import React from "react";
import Card from "./Card.js";

export default class PlayZone extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cards: props.playZone.cards
    };
  }

  createPlayZoneCard(card, isTop) {
    const sign = Math.random() > 0.5 ? 1 : -1;
    const angleAbs = Math.random() * 20;
    const angle = isTop ? 0 : angleAbs * sign;

    return (
      <Card
        key={card.cardId}
        holder={"playZone"}
        frontImg={card.frontImg}
        rotate={angle}
      />
    );
  }

  render() {
    //TODO: just showing top card for now, need to show the rest as well
    const topCard = this.createPlayZoneCard(this.state.cards[0], true);
    return (
      <div className={"playZone"} id={"playZone"}>
        {topCard}
      </div>
    );
  }
}
