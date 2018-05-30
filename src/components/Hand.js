import React from "react";
import Card from "./Card.js";
import manager from "../engine/Manager";

export default class Hand extends React.Component {
  constructor(props) {
    super(props);

    this.cardsInHand = [];
  }

  cardSelected(cardId) {
    const player = manager.getActivePlayer();
    const cards = player.hand.cards;

    if (player.playerType !== this.props.id) {
      return;
    }

    for (let i = 0; i < cards.length; i++) {
      if (cards[i].cardId === cardId) {
        const card = player.hand.getCardById(cardId);
        player.playCard(card);
        break;
      }
    }
  }

  createCard(currentCard) {
    const activePlayer = manager.getActivePlayer();
    let cardStyle = 'card';
    if (activePlayer.playerType === 'user' && this.props.id === 'user') {
      if (manager.isCardLegal(currentCard)) {
        cardStyle = 'legal-card';
      } else {
        cardStyle = 'illegal-card';
      }
    }

    const handleClick = function () {
      this.cardSelected(currentCard.cardId);
    };

    return (
      <Card
        holder={this.props.id}
        key={currentCard.cardId}
        description={currentCard.description}
        cardStyle={cardStyle}
        frontImg={currentCard.frontImg}
        onclick={handleClick.bind(this)}
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
