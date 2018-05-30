import React from "react";
import "../css/style.css";
import "../css/styleColorMenu.css";

const ColorOption = (props) => {
  const color = props.color;
  const onColorSelected = props.onColorSelected;

  return (
    <div
      className="color-option button-UI"
      id={`${color}-color`}
      onClick={() => onColorSelected(color)}
    />
  );
};

export default ColorOption;
