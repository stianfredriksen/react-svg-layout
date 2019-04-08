import React from "react";
import style from "./Odometer.scss";

class Odometer extends React.Component {
  render() {
    const { name, description, unit, color } = this.props;
    return (
      <div className={style.root}>
        <div>Get some information / data and show it here + {unit}</div>
        <div className="hidden-text" style={{ backgroundColor: color }}>
          {name}
        </div>
        <div className="hidden-text-2" style={{ backgroundColor: color }}>
          {description}
        </div>
      </div>
    );
  }
}

export default Odometer;
