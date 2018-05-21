import React from "react";
import Card from "./Card.js";

export default class PlayZone extends React.Component {
  render() {
    return (
      <div className={"playZone"} id={"playZone"}>
        <Card holder={"card-playZone"} />
      </div>
    );
  }
}
