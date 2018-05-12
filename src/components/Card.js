import React from "react";
import styles from "../css/style.css";

class Card extends React.Component {
    render() {
        return (
            <img className={styles.Card} src="../src/textures/cards/card_back.png"/>
        );
    }
}

export default Card;