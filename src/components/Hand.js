import React from "react";
import Card from "./Card.js";

export default class Hand extends React.Component {

  render() {
    return (
      <div className={"hand board-row"}>
        <Card holder={"card"} />
      </div>
    );
  }
}