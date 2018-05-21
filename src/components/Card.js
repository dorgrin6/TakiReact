import React from "react";
import "../css/style.css";

export default class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      faceUp: true,
      legal: true,
      holder: props.holder
    };
  }

  render() {
    return <img className={this.props.holder} src="../src/textures/cards/card_back.png" />;
  }
}
