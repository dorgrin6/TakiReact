import React from "react";
import "../css/style.css";
import Board from "./Board";
import manager from "../engine/Manager.js";
import ColorMenu from "./ColorMenu";

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      board: {},
      history: [],
      stepNumber: 0,
      colorMenuShown: false,
    };

    this.runGame();
  }

  runGame() {
    manager.create();
    manager.init();
  }

  componentWillMount() {
    manager.setCBUIUpdateFunction(this.updateUI.bind(this));
    manager.setUIChangeColorFunction(this.toggleColorMenu.bind(this));
    manager.updateUI();
  }

  updateUI(boardState) {
    this.setState(() => ({ board: boardState }));
  }

  render() {
    // let board = <Board board={this.state.board}/>;
    // this.state.history.push(board);

    return (
      <div>
        <Board board={this.state.board} />
        {this.renderColorMenu()}
      </div>
    );
  }

  toggleColorMenu() {
    this.setState(prevState => ({ colorMenuShown: !prevState.colorMenuShown }));
  }

  renderColorMenu() {
    if (this.state.colorMenuShown) {
      return <ColorMenu onColorSelected={this.toggleColorMenu.bind(this)} />;
    }
    return null;
  }
}
