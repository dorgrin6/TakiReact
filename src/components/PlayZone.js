import React from "react";
import Card from "./Card.js";

export default class PlayZone extends React.Component {
  constructor(props) {
    super(props);
    this.cardsWithAngle = [];
  }

  putPlayZoneCard(card){
    const sign = Math.random() > 0.5 ? 1 : -1;
    const angleAbs = Math.random() * 20;
    const angle = angleAbs * sign;

    let playZoneCard = {
      data: card,
      angle: angle
    };

    this.cardsWithAngle.push(playZoneCard);
  }

  renderPlayZoneCard(card){
    return (
        <Card
          key={card.data.cardId}
          holder={"playZone"}
          cardStyle={"card-playZone"}
          frontImg={card.data.frontImg}
          rotate={card.angle}
        />
    );
  }

  render() {
    if (this.props.playZone.cards.length != this.cardsWithAngle.length){
      let newCard = this.props.playZone.cards[this.props.playZone.cards.length-1];
      this.putPlayZoneCard(newCard);
    }

    for(var i=0;i<this.cardsWithAngle.length;i++){
        this.cardsWithAngle[i].card=this.props.playZone.cards[i];
    }

    return (
      <div className={"playZone"} id={"playZone"}>
        {this.cardsWithAngle.map(card => this.renderPlayZoneCard(card))}
      </div>
    );
  }
}
