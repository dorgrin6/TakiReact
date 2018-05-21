import React from "react";
import "../css/style.css";
import Board from "./Board";

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: {},
      stepNumber: 0
    };
  }

  render() {
    return (
      <Board/>
    );
  }
}
