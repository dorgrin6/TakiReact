import React from "react";
import "../css/style.css";
import manager from "../engine/Manager.js";

export default class Card extends React.Component {
  constructor(props) {
    super(props);
    this.backCardImgSrc = "card_back";
    this.cardsDir = "../src/textures/cards/";
    this.imageFormat = ".png";

    this.state = {
      legal: this.props.legal
    };
  }

  render() {
    const image =
      this.props.holder === "user" || this.props.holder === "playZone"
        ? this.props.frontImg
        : this.backCardImgSrc;
    const imgSrc = this.cardsDir + image + this.imageFormat;
    const angle = this.props.rotate ? this.props.rotate : 0;
    const styles = {transform: "rotate(" + angle + "deg)"};
    let className = "card";

    //TODO: this is not good because it enables the animation even when its not the user's turn
    if (manager.getActivePlayer().playerType ===  "user" && this.props.holder === "user") {
      className = this.props.legal ? "legal-card" : "illegal-card";
    }

    if (this.props.holder === "playZone"){
        className = "card-playZone";
    }
    else if (this.props.holder === "deck"){
        className = "card-deck";
    }

    return (
      <img
        className={className}
        src={imgSrc}
        style={styles}
        onClick={this.props.onclick}
      />
    );
  }
}
