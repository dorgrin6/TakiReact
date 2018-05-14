import React from "react";
import "../../css/style.css";

export class Card extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            legal: true
        };
    }

    render() {
        return (
            <div>
                <img className={'card'} src="../src/textures/cards/card_back.png"/>
            </div>
        );
    }
}


