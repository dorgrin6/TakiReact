import React from "react";
import "../css/style.css";
import Board from "./Board";
import manager from "../engine/Manager.js";

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: {},
      stepNumber: 0
    };
    this.runGame();
  }

  runGame() {
    manager.create();
    this.putCardInPlayZone(manager.playZone.getTop());
  }

  putCardInPlayZone(card) {

    const sign = Math.random() > 0.5 ? 1 : -1;
    const angleAbs = Math.random() * 20;
    const angle = (angleAbs * sign) + "deg";
    cardDOM.setAttribute("class", "card-playZone");
    cardDOM.setAttribute("src", cardsDir + card.frontImg + imageFormat);
    cardDOM.setAttribute("style", "transform: rotate(" + angle + ");");
    playZone.appendChild(cardDOM);
  }


  render() {
    return <Board />;
  }
}
