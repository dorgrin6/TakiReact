import React from "react";
import "../css/style.css";
import "../css/styleStatsMenu.css";
import Hand from "./Hand.js";
import PlayZone from "./PlayZone.js";
import StatsBoard from "./StatsBoard.js";
import Deck from "./Deck";

const Board = props => {
  let playerTurn = props.board.turn;

  return (
    <div>
      <Hand
        id={"pc"}
        hand={props.board.players[1].hand}
        inShowMode={props.inShowMode}
      />

      <div className={"container board-row"}>
        <StatsBoard
          statsPlayer={props.board.stats}
          activePlayer={props.board.players[playerTurn]}
          cbHandleQuit={props.cbHandleQuit}
          cbHandlePrevHistory={props.cbHandlePrevHistory}
          cbHandleNextHistory={props.cbHandleNextHistory}
          inShowMode={props.inShowMode}
        />
        <PlayZone
          playZone={props.board.playZone}
          inShowMode={props.inShowMode}
        />
        <Deck inShowMode={props.inShowMode} />
      </div>

      <Hand
        id={"user"}
        hand={props.board.players[0].hand}
        inShowMode={props.inShowMode}
      />
    </div>
  );
};

export default Board;
