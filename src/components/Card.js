import React from "react";
import "../css/style.css";

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
    let styles = {};
    if (angle > 0) {
      styles = {
        transform: "rotate(" + angle + "deg)"
      };
    }
    let className = "card";
    if (this.props.holder === "user") {
      className = this.props.legal ? "legal-card" : "illegal-card";
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
