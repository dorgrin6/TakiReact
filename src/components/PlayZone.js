import React from "react";
import Card from "./Card.js";
import CloseTakiButton from "./CloseTakiButton.js";
import manager from "../engine/Manager.js";

export default class PlayZone extends React.Component {
  constructor(props) {
    super(props);
    this.angleCache = [];
  }

  getCardAngle() {
    const sign = Math.random() > 0.5 ? 1 : -1;
    const angleAbs = Math.random() * 20;
    const angle = angleAbs * sign;

    return angle;
  }

  checkTakiMode() {
    let activePlayer = manager.getActivePlayer();
    return (
      activePlayer.inTakiMode.status === true &&
      activePlayer.playerType === "user"
    );
  }

  closeTaki() {
    manager.getActivePlayer().closeTaki();
  }

  renderPlayZoneCard(card, angle) {
    return (
      <Card
        key={card.cardId}
        holder={"playZone"}
        cardStyle={"card-playZone"}
        frontImg={card.frontImg}
        rotate={angle}
        inShowMode={this.props.inShowMode}
      />
    );
  }

  render() {
    const cardsWithAngle = [];
    const playZoneCards = this.props.playZone.cards;
    const cardsDiff = playZoneCards.length - this.angleCache.length;
    const isInTakiMode = this.checkTakiMode();

    // There are more playZone cards than angles
    for (let i = 0; i < cardsDiff; i++) {
      this.angleCache.push(this.getCardAngle());
    }

    // There are less playZone cards than angles
    for (let i = 0; i < -cardsDiff; i++) {
      this.angleCache.pop();
    }

    for (let i = 0; i < playZoneCards.length; i++) {
      cardsWithAngle.push(
        this.renderPlayZoneCard(playZoneCards[i], this.angleCache[i])
      );
    }

    return (
      <div className={"playZone"} id={"playZone"}>
        {isInTakiMode ? (
          <CloseTakiButton onClick={() => this.closeTaki()} />
        ) : null}
        {cardsWithAngle}
      </div>
    );
  }
}
