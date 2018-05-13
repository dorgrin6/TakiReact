import React from "react";
import "../css/style.css";

class Card extends React.Component {
    render() {
        return (
            <img className={'card-deck'} src="../src/textures/cards/card_back.png"/>
        );
    }
}

export default Card;