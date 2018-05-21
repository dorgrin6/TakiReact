import React from 'react';
import ReactDOM from 'react-dom';
import styles from "./css/style.css";
import {Card} from "./components/Card/Card";


const element = (<div className={"styles.Card"}>
    <Card />
</div>);


/* Directly adding react element */
ReactDOM.render(
    element,
    document.getElementById("root")
);
