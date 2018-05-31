import React from "react";
import "../css/style.css";
import manager from "../engine/Manager.js";
import stats from "../engine/Stats.js";

const EndGameMenu = () => {
    const winner = manager.getActivePlayer();
    const winnerHeadline = (winner.playerType === "user" ? "You win!" : "PC wins!");
    const gameTime = "Game time: "+stats.gameWatch.getElapsedTime();
    const tableValues = [];
    buildTableValues(tableValues);

    return (
      <div className={"menu-background"}>
          <div className={"menu-content"}>
              <h2>Game over</h2>
              <h2>{winnerHeadline}</h2>
              <p>{gameTime}</p>
              <table id={"statsTable"}>
                  <thead>
                      <tr>
                          <td></td>
                          {tableValues.map(column => makeTableCell(column, column.headline))}
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
              //TODO: onClick the play again button
              <div className={"play-again-button button-UI"}>
                  Play again!
              </div>
          </div>
      </div>
    );
};

function buildTableValues(tableValues){
    for (var i = 0; i<manager.players.length; i++){
        let column = {
            headline: manager.players[i].playerType,
            avg: manager.players[i].getAvgTurnTime(),
            avgAll: manager.players[i].getAvgTurnTimeAllGames(),
            last: manager.players[i].getLastCardCounter()
        };
        tableValues.push(column);
    }
}

function makeTableCell(column, value){
    let key = column.headline+"_"+value;
    return(
        <td key={key}>
            {value}
        </td>
    );
}

export default EndGameMenu;