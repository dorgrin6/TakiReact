import React from "react";
import "../css/style.css";

export default class Card extends React.Component {
  constructor(props) {
    super(props);
    this.backCardImgSrc = "card_back";
    this.cardsDir = "../src/textures/cards/";
    this.imageFormat = ".png";
  }

  getCardTitle() {
    const cardFile = this.props.frontImg;
    const untilUnderscore = cardFile.substr(0, cardFile.indexOf("_"));
    let res = "";

    switch (untilUnderscore) {
      case "change":
        res = "Choose the color of the cards the next player plays";
        break;
      case "stop":
        res = "Stop next player from playing";
        break;
      case "plus":
        res = "Add another card with this one";
        break;
      case "superTaki":
        res = "Play as many cards as you want, in the color of your choice";
        break;
      case "taki":
        res = "Play as many cards as you want in the taki color";
        break;
      case "take2":
        res = "The next player will have to pick up two cards";
        break;
      default:
        res = untilUnderscore;
    }

    return res;
  }

  render() {
    //TODO: change it back, after debugging
    // const image =
    //   this.props.holder === "user" || this.props.holder === "playZone"
    //     ? this.props.frontImg
    //     : this.backCardImgSrc;
    const image = this.props.frontImg;
    const imgSrc = this.cardsDir + image + this.imageFormat;
    const angle = this.props.rotate ? this.props.rotate : 0;
    const styles = { transform: "rotate(" + angle + "deg)" };
    const title = this.getCardTitle();

    return (
      <img
        className={`${this.props.cardStyle}`}
        src={imgSrc}
        style={styles}
        onClick={this.props.onclick}
        title={title}
      />
    );
  }
}
