import React, { Component } from "react";
import sizeMe from "react-sizeme";
import Svg from "./svg/Svg";
import "./App.css";

const Wrapper = sizeMe({
  monitorHeight: true
})(Svg);

const response = {
  square: {
    x: 100,
    y: 200,
    radius: 25
  },
  circle: {
    x: 300,
    y: 270
  },
  size: {
    width: 1200,
    height: 676.9
  }
};

class App extends Component {
  render() {
    const { square, circle, size } = response;
    const box = {
      dx: square.x / size.width,
      dy: square.y / size.height,
      dx2: circle.x / size.width,
      dy2: circle.y / size.height,
      elements: response
    };

    return (
      <div className="App">
        <Wrapper box={box} />
      </div>
    );
  }
}

export default App;
