import React from "react";
import "../css/style.css";
import "../css/styleColorMenu.css";

const ColorOption = (props) => {
    let color = props.color;
    let onColorSelected = props.onColorSelected;

    return (
        <div className={"color-option button-UI"} id={`${color}-color`} onClick={() => onColorSelected(color)}>

        </div>
    );
};

export default ColorOption;
