import React from "react";
import "../css/style.css";

export default class Card extends React.Component {
  constructor(props) {
    super(props);
    this.backCardImgSrc = "card_back";
    this.cardsDir = "../src/textures/cards/";
    this.imageFormat = ".png";
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
    const styles = { transform: `rotate(${angle}deg)` };
    const title = this.props.holder === "user" ? this.props.description : "";

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
