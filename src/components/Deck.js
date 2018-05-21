import React from "react";
import Card from "./Card.js";

// https://stackoverflow.com/questions/35905988/react-js-how-to-append-a-component-on-click
export default class Deck extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      childIds: []
    };

    this.addChild(props.topCard);
  }

  addChild(childId){
    this.setState(prevState => ({
      childIds: [...prevState.childIds, childId]
    }));
  }

  render() {
    const children = [];

    for (let i = 0; i < this.state.childIds.length; i++) {
      children.push(<Card holder={"card-deck"} key={this.state.childIds[i]} />);
    }

    return <div className={"deck"}>{children}</div>;
  }
}
