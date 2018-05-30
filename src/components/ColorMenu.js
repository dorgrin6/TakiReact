import React from "react";
import "../css/style.css";
import "../css/styleColorMenu.css";
import manager from "../engine/Manager";
import ColorOption from "./ColorOption";

export default class ColorMenu extends React.Component {
  colorSelected(color) {
    manager.getActivePlayer().selectColor(color);
    this.props.onColorSelected();
  }

  render() {
    return (
      <div className="menu-background" id="color-menu">
        <div className="menu-content">
          <h2>Choose color</h2>
          <div className="color-panel">
            <ColorOption
              color="red"
              onColorSelected={this.colorSelected.bind(this)}
            />
            <ColorOption
              color="yellow"
              onColorSelected={this.colorSelected.bind(this)}
            />
            <ColorOption
              color="green"
              onColorSelected={this.colorSelected.bind(this)}
            />
            <ColorOption
              color="blue"
              onColorSelected={this.colorSelected.bind(this)}
            />
          </div>
        </div>
      </div>
    );
  }
}
