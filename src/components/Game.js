import React from "react";
import "../css/style.css";
import Board from "./Board";
import manager from "../engine/Manager.js";

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      board: {},
      history: {},
      stepNumber: 0
    };

    this.runGame();
  }

  runGame() {
    manager.create();
    manager.init();
  }

  componentWillMount() {
      manager.setUIUpdateFunction(this.updateUI.bind(this));
      manager.updateUI();
  }

  updateUI(boardState) {
    this.setState(() => ({board: boardState}));
  }

  render() {
    return <Board board={this.state.board}/>;
  }
}
