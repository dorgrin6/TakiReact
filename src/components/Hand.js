import React from "react";
import Card from "./Card.js";
import HandFactory from "../engine/HandFactory.js";
import manager from "../engine/Manager";

export default class Hand extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cards: this.props.hand.cards,
      legalCards: this.props.hand.legalCards
    };
  }

  cardSelected(cardId) {
    console.log("in card selected for ", cardId);
    const player = manager.getActivePlayer();
    const cards = player.hand.cards;

    for (let i = 0; i < cards.length; i++) {
      if (cards[i].cardId === cardId) {
        const card = player.hand.getCardById(cardId);
        player.playCard(card);
        break;
      }
    }
  }

  render() {
    const cards = [];

    for (let i = 0; i < this.state.cards.length; i++) {
      let currentCard = this.state.cards[i];
      let frontImg = currentCard.frontImg;
      let legalCard =
        this.state.legalCards.find(
          card => card.cardId === currentCard.cardId
        ) !== undefined;
      let handleClick = function() {
        this.cardSelected(currentCard.cardId);
      };
      cards.push(
        <Card
          holder={this.props.id}
          key={this.state.cards[i].cardId}
          legal={legalCard}
          frontImg={frontImg}
          onclick={handleClick.bind(this)}
        />
      );
    }

    return <div className={"hand board-row"}>{cards}</div>;
  }
}
