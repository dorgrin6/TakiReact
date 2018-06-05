import React from "react";
import "../css/style.css";
import "../css/styleStatsMenu.css";
import Hand from "./Hand.js";
import PlayZone from "./PlayZone.js";
import StatsBoard from "./StatsBoard.js";
import Deck from "./Deck";

export default class Board extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let playerTurn = this.props.board.turn;
    return (
      <div>
        <Hand
          id={"pc"}
          hand={this.props.board.players[1].hand}
          inShowMode={this.props.inShowMode}
        />

        <div className={"container board-row"}>
          <StatsBoard
            statsPlayer={this.props.board.stats}
            activePlayer={this.props.board.players[playerTurn]}
            cbHandleQuit={this.props.cbHandleQuit}
            cbHandlePrevHistory={this.props.cbHandlePrevHistory}
            cbHandleNextHistory={this.props.cbHandleNextHistory}
            inShowMode={this.props.inShowMode}
          />
          <PlayZone
            playZone={this.props.board.playZone}
            inShowMode={this.props.inShowMode}
          />
          <Deck
            inShowMode={this.props.inShowMode}
          />
        </div>

        <Hand
          id={"user"}
          hand={this.props.board.players[0].hand}
          inShowMode={this.props.inShowMode}
        />
      </div>
    );
  }
}
