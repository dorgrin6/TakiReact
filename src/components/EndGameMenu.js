import React from "react";
import "../css/style.css";
import manager from "../engine/Manager.js";
import stats from "../engine/Stats.js";

const EndGameMenu = props => {
  const winner = props.quit
    ? manager.getNextPlayer()
    : manager.getActivePlayer();
  const winnerHeadline = winner.playerType === "user" ? "You win!" : "PC wins!";
  const gameTime = "Game time: " + stats.gameWatch.getElapsedTime();
  const tableValues = buildTableValues();

  return (
    <div className={"menu-background"}>
      <div className={"menu-content"}>
        <h2>Game over</h2>
        <h2>{winnerHeadline}</h2>
        <p>{gameTime}</p>
        <table id={"statsTable"}>
          <thead>
            <tr>
              <td />
              {tableValues.map(column =>
                makeTableCell(column, column.headline)
              )}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Average time per turn (this game):</td>
              {tableValues.map(column => makeTableCell(column, column.avg))}
            </tr>
            <tr>
              <td>Average time per turn (all games):</td>
              {tableValues.map(column => makeTableCell(column, column.avgAll))}
            </tr>
            <tr>
              <td>Last card counter:</td>
              {tableValues.map(column => makeTableCell(column, column.last))}
            </tr>
          </tbody>
        </table>
        <div
          className={"play-again-button button-UI"}
          onClick={handleClickReplay.bind(null, props)}
        >
          Play again!
        </div>
      </div>
    </div>
  );
};
function buildTableValues() {
  const tableValues = [];
  for (let i = 0; i < manager.players.length; i++) {
    let column = {
      headline: manager.players[i].playerType,
      avg: manager.players[i].getAvgTurnTime(),
      avgAll: manager.players[i].getAvgTurnTimeAllGames(),
      last: manager.players[i].getLastCardCounter()
    };
    tableValues.push(column);
  }
  return tableValues;
}

function makeTableCell(column, value) {
  let key = column.headline + "_" + value + "_" + stats.gamesAmount;
  return <td key={key}>{value}</td>;
}

function handleClickReplay(props) {
  props.cbRestartGame();
}

export default EndGameMenu;
