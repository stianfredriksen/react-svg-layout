import React, { Component } from "react";
import Svg from "./svg/Svg";
import "./App.css";

const response = [
  {
    id: 1,
    color: "#0097e6",
    info: {
      x: 100,
      y: 200
    },
    pointer: {
      x: 310,
      y: 290,
      radius: 7
    },
    size: {
      width: 1200,
      height: 676.9
    },
    tag: {
      name: "Fancy",
      description: "Sjukt fancy",
      unit: "%"
    }
  },
  {
    id: 2,
    color: "#512D6D",
    info: {
      x: 400,
      y: 100
    },
    pointer: {
      x: 470,
      y: 270,
      radius: 7
    },
    size: {
      width: 1200,
      height: 676.9
    },
    tag: {
      name: "Something",
      description: "Sjukt fancy",
      unit: "%"
    }
  }
];

class App extends Component {
  state = { boxes: response };

  updatePointer = (id, x, y, height, width) => {
    const b = this.state.boxes.find(v => v.id === id);

    const test2 = width / b.size.width;
    const newX = x / test2;
    const test3 = height / b.size.height;
    const newY = y / test3;

    b.pointer.x = newX;
    b.pointer.y = newY;
    this.setState(prevState => ({ ...prevState.boxes, b }));
  };

  render() {
    const boxes = this.state.boxes.map(box => {
      const { info, pointer, size } = box;
      const tempBox = {
        ...box,
        pointer: {
          ...box.pointer,
          dx: pointer.x / size.width,
          dy: pointer.y / size.height
        },
        info: {
          ...box.info,
          dx: info.x / size.width,
          dy: info.y / size.height
        }
      };

      return tempBox;
    });

    return (
      <div className="App">
        <Svg boxes={boxes} updatePointer={this.updatePointer} />
      </div>
    );
  }
}

export default App;
