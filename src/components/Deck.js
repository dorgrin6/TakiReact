import React from "react";
import Card from "./Card.js";

export default class Deck extends React.Component {
  render() {
    return (
      <div className={"deck"}>
        <Card holder={"card-deck"} />
      </div>
    );
  }
}
