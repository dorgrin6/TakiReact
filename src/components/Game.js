import React from "react";
import "../css/style.css";
import Board from "./Board";
import manager from "../engine/Manager.js";
import ColorMenu from "./ColorMenu";
import EndGameMenu from "./EndGameMenu.js";

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.initalState = {
      board: {},
      history: [],
      stepNumber: 0,
      colorMenuShown: false,
      quit: false
    };

    this.state = this.initalState;
    this.runGame();
  }

  runGame() {
    manager.create();
    manager.init();
  }

  restartGame() {
    this.setState(() => this.initalState);
    manager.init();
    manager.updateUI();
  }

  componentWillMount() {
    manager.setCBUIUpdateFunction(this.updateUI.bind(this));
    manager.setUIChangeColorFunction(this.toggleColorMenu.bind(this));
    manager.updateUI();
  }

  updateUI(boardState) {
    this.saveHistory(boardState);
    this.setState(() => ({ board: boardState }));
  }

  handleQuit() {
    this.setState(() => ({ quit: true }));
  }

  saveHistory(boardState) {
    this.setState(prevState => ({
      history: [...prevState.history, boardState]
    }));
  }

  loadHistory(index) {
    this.setState(prevState => ({
      board: prevState.history[1]
    }));
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

  handleUndo() {
    this.loadHistory(this.state.board.length - 1);
  }

  render() {
    return (
      <div>
        <Board
          board={this.state.board}
          cbHandleQuit={this.handleQuit.bind(this)}
          cbHandleUndo={this.handleUndo.bind(this)}
        />
        {this.renderColorMenu()}
        {manager.isGameEnd() ? (
          <EndGameMenu
            cbRestartGame={this.restartGame.bind(this)}
            quit={this.state.quit}
          />
        ) : null}
      </div>
    );
  }
}
