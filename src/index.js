import React from "react";
import ReactDOM from "react-dom";
import Game from "./components/Game";

const game = (<div>
  <Game/>
</div>);

/* Directly adding react element */
ReactDOM.render(
  game,
  document.getElementById("root")
);
