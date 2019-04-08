import React from "react";

class Pointer extends React.Component {
  state = { xCoord: this.props.x, yCoord: this.props.y };

  componentWillReceiveProps(nextProps) {
    if (nextProps.y !== this.props.y || nextProps.x !== this.props.x) {
      this.setState({ xCoord: nextProps.x, yCoord: nextProps.y });
    }
  }

  handleMouseDown = e => {
    this.coords = {
      x: e.pageX,
      y: e.pageY
    };
    document.addEventListener("mousemove", this.handleMouseMove);
  };

  handleMouseUp = () => {
    document.removeEventListener("mousemove", this.handleMouseMove);
    this.props.callback(this.state.xCoord, this.state.yCoord);
    this.coords = {};
  };

  handleMouseMove = e => {
    const xDiff = this.coords.x - e.pageX;
    const yDiff = this.coords.y - e.pageY;

    this.coords.x = e.pageX;
    this.coords.y = e.pageY;

    this.setState({
      xCoord: this.state.xCoord - xDiff,
      yCoord: this.state.yCoord - yDiff
    });
  };

  render() {
    const { xCoord: x, yCoord: y } = this.state;

    return (
      <g>
        <circle
          r={this.props.radius}
          cx={x}
          cy={y}
          fill={this.props.color}
          onMouseDown={this.handleMouseDown}
          onMouseUp={this.handleMouseUp}
        />
        <circle
          r={this.props.radius + 3}
          cx={x}
          cy={y}
          stroke={this.props.color}
          fill="transparent"
          onMouseDown={this.handleMouseDown}
          onMouseUp={this.handleMouseUp}
        />
      </g>
    );
  }
}

export default Pointer;
