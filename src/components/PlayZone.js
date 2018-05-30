import React from "react";
import Card from "./Card.js";
import manager from "../engine/Manager.js";

export default class PlayZone extends React.Component {
  constructor(props) {
    super(props);

    this.playZoneCards = [];

    this.state = {};
  }

  componentWillMount() {
    manager.setUIColorChangedFunction(this.replaceColorfulWithColor.bind(this));
  }

  replaceColorfulWithColor(color) {
    const cards = this.props.playZone.cards;
    const topCard = cards[cards.length - 1];

  }

  createPlayZoneCard(card) {
    const sign = Math.random() > 0.5 ? 1 : -1;
    const angleAbs = Math.random() * 20;
    const angle = angleAbs * sign;
    return (
      <Card
        key={card.cardId}
        holder="playZone"
        cardStyle="card-playZone"
        frontImg={card.frontImg}
        rotate={angle}
      />
    );
  }

  putPlayZoneCard(card) {
    this.playZoneCards.push(card);
  }

  render() {
    if (this.props.playZone.cards.length !== this.playZoneCards.length) {
      const topCard = this.props.playZone.cards[
        this.props.playZone.cards.length - 1
      ];
      const newCard = this.createPlayZoneCard(topCard);
      this.putPlayZoneCard(newCard);
    }

    return (
      <div className="playZone" id="playZone">
        {this.playZoneCards}
      </div>
    );
  }
}
