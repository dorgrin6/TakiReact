import React from "react";
import "../css/style.css";

export default class Card extends React.Component {
  constructor(props) {
    super(props);
    this.backCardImgSrc = "card_back";
    this.cardsDir = "../src/textures/cards/";
    this.imageFormat = ".png";
  }

  //TODO: this is not good because it enables the animation even when its not the user's turn

  render() {
    const image =
      this.props.holder === "user" || this.props.holder === "playZone"
        ? this.props.frontImg
        : this.backCardImgSrc;
    const imgSrc = this.cardsDir + image + this.imageFormat;
    const angle = this.props.rotate ? this.props.rotate : 0;
    const styles = { transform: "rotate(" + angle + "deg)" };
    // const className = this.props.legal ? "legal-card" : "illegal-card";

    return (
      <img
        className={`${ this.props.cardStyle }`}
        src={imgSrc}
        style={styles}
        onClick={this.props.onclick}
      />
    );
  }
}
