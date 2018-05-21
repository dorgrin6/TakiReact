import React from "react";
import "../css/style.css";
import "../css/styleStatsMenu.css";
// import "../css/styleColorMenu.css;"
// import "../css/styleCloseTaki.css"
import Hand from "./Hand.js";
import PlayZone from "./PlayZone.js";
import Deck from "./Deck.js";
import Stats from "./Stats.js";

export default class Board extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Hand id={"pc"} holder={"card"} />

        <div className={"container board-row"}>
          <Stats />
          <PlayZone />
          <Deck />
        </div>

        <Hand id={"user"} holder={"card"} />
      </div>
    );
  }
}
