import React from "react";
import Card from "./Card.js";
import manager from "../engine/Manager";

export default class Hand extends React.Component {
  cardSelected(cardId) {
    const activePlayer = manager.getActivePlayer();
    if (activePlayer.playerType === "user" && this.props.id === "user") {
      const card = activePlayer.hand.getCardById(cardId);
      activePlayer.playCard(card);
    }
  }

  createCard(currentCard) {
    const activePlayer = manager.getActivePlayer();
    let cardStyle = "card";
    if (!this.props.inShowMode) {
      if (activePlayer.playerType === "user" && this.props.id === "user") {
        if (manager.isCardLegal(currentCard)) {
          cardStyle = "legal-card";
        } else {
          cardStyle = "illegal-card";
        }
      }
    }

    const handleClick = function() {
      this.cardSelected(currentCard.cardId);
      // this.props.cbSaveHistory();
    };

    return (
      <Card
        holder={this.props.id}
        key={currentCard.cardId}
        description={currentCard.description}
        cardStyle={cardStyle}
        frontImg={currentCard.frontImg}
        onClick={handleClick.bind(this)}
        inShowMode={this.props.inShowMode}
      />
    );
  }

  render() {
    const cards = [];
    const propsCards = this.props.hand.cards;
    for (let i = 0; i < propsCards.length; i++) {
      const newCard = this.createCard(propsCards[i]);
      cards.push(newCard);
    }

    return <div className="hand board-row">{cards}</div>;
  }
}
