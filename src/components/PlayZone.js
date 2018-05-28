import React from "react";
import Card from "./Card.js";

const playZoneCards=[];

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
        holder={"playZone"}
        frontImg={card.frontImg}
        rotate={angle}
      />
    );
  }

  putPlayZoneCard(card){
      playZoneCards.push(card);
  }

  render() {
    if (this.state.cards.length != playZoneCards.length){
        var topCard = this.state.cards[this.state.cards.length-1];
        var newCard = this.createPlayZoneCard(topCard);
        this.putPlayZoneCard(newCard);
    }

    return (
      <div className={"playZone"} id={"playZone"}>
        {playZoneCards}
      </div>
    );
  }
}
