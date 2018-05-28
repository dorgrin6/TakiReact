import React from "react";
import Card from "./Card.js";
import manager from "../engine/Manager.js";

//const playZoneCards=[];
export default class PlayZone extends React.Component {
  constructor(props) {
    super(props);

    this.playZoneCards = [];

    this.state = {
    };
  }

  componentWillMount(){
    manager.setUIColorChangedFunction(this.replaceColorfulWithColor.bind(this));
  }

  replaceColorfulWithColor(color){
    let cards = this.props.playZone.cards;
    let topCard = cards[cards.length-1];

    //this.playZoneCards[this.playZoneCards.length-1].props.frontImg = topCard.frontImg.replace("colorful",color);
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
      this.playZoneCards.push(card);
  }

  render() {
    if (this.props.playZone.cards.length != this.playZoneCards.length){
        var topCard = this.props.playZone.cards[this.props.playZone.cards.length-1];
        var newCard = this.createPlayZoneCard(topCard);
        this.putPlayZoneCard(newCard);
    }

    return (
      <div className={"playZone"} id={"playZone"}>
        {this.playZoneCards}
      </div>
    );
  }
}
