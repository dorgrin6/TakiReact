import React from "react";
import "../css/style.css";

export default class Card extends React.Component {
  constructor(props) {
    super(props);
    this.backCardImgSrc = "card_back";
    this.cardsDir = "../src/textures/cards/";
    this.imageFormat = ".png";

    this.state = {
      faceUp: true,
      legal: true
    };
  }

  render() {
    const image = this.props.frontImg
      ? this.props.frontImg
      : this.backCardImgSrc;
    const imgSrc = this.cardsDir + image + this.imageFormat;
    const angle = this.props.rotate ? this.props.rotate : 0;
    const styles = {
      transform: "rotate(" + angle + "deg)"
    };
    return <img className={"card"} src={imgSrc} style={styles} />;
  }
}
