import React from "react";
import style from "./Svg.scss";

import tfmc from "../assets/tfmc.jpg";

class Node extends React.Component {
  handleMouseDown = e => {
    this.coords = {
      x: e.pageX,
      y: e.pageY
    };
    document.addEventListener("mousemove", this.handleMouseMove);
  };

  handleMouseUp = () => {
    document.removeEventListener("mousemove", this.handleMouseMove);
    this.coords = {};
  };

  handleMouseMove = e => {
    const xDiff = this.coords.x - e.pageX;
    const yDiff = this.coords.y - e.pageY;

    this.coords.x = e.pageX;
    this.coords.y = e.pageY;

    this.props.callback(this.props.x - xDiff, this.props.y - yDiff);
  };

  render() {
    const { x, y } = this.props;
    return (
      <circle
        r={this.props.radius}
        cx={x}
        cy={y}
        fill="rebeccapurple"
        onMouseDown={this.handleMouseDown}
        onMouseUp={this.handleMouseUp}
      />
    );
  }
}

class Svg extends React.Component {
  state = {
    x: 100,
    y: 100,
    endX: 490,
    endY: 450,
    radius: 50
  };

  render() {
    // const { x, y, radius, endY, endX } = this.state;
    const { size, box } = this.props;

    const x1 = size.width * box.dx;
    const y1 = size.height * box.dy;

    const x2 = size.width * box.dx2;
    const y2 = size.height * box.dy2;

    const lineFromX = x1 < x2 ? x1 + box.elements.square.radius : x1;
    const lineFromY = y1 < y2 ? y1 + box.elements.square.radius : y1;

    return (
      <div className={style.root}>
        <img src={tfmc} alt="" height="100%" width="100%" />

        <svg width={size.width} height={size.height}>
          <line
            x1={lineFromX}
            y1={lineFromY}
            x2={x2}
            y2={y2}
            style={{ stroke: "rgb(255,0,0)", strokeWidth: "2" }}
          />
        </svg>
        <div
          style={{
            height: box.elements.square.radius,
            width: box.elements.square.radius,
            backgroundColor: "hotpink",
            position: "absolute",
            top: 0,
            left: 0,
            transform: `translate3d(
                ${x1}px, 
                ${y1}px,
                 0px) rotate(0deg)`
          }}
        />
        <div
          style={{
            height: "20px",
            width: "20px",
            backgroundColor: "yellow",
            borderRadius: "50%",
            position: "absolute",
            top: 0,
            left: 0,
            transform: `translate3d(
              ${x2}px, 
              ${y2}px,
                 0px) rotate(0deg)`
          }}
        />
      </div>
    );
  }
}

export default Svg;
