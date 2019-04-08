import React from "react";
import sizeMe from "react-sizeme";
import style from "./Svg.scss";

import tfmc from "../assets/tfmc.jpg";
import Odometer from "./odometer/Odometer";
import Pointer from "./pointer/Pointer";

class Svg extends React.Component {
  state = {
    x: 100,
    y: 100,
    endX: 490,
    endY: 450,
    radius: 50
  };

  render() {
    const { size, boxes } = this.props;

    return (
      <div className={style.root}>
        <img src={tfmc} alt="" width="100%" height="100%" />
        <svg width={size.width} height={size.height}>
          {boxes.map(box => {
            const x1 = size.width * box.info.dx;
            const y1 = size.height * box.info.dy;

            const x2 = size.width * box.pointer.dx;
            const y2 = size.height * box.pointer.dy;

            const lineFromX = x1 + 200 / 2 < x2 ? x1 + 200 : x1 + 20;
            const lineFromY = y1 + 56 / 2;

            return (
              <g key={box.id}>
                <Pointer
                  x={x2}
                  y={y2}
                  radius={box.pointer.radius}
                  callback={(x, y) =>
                    this.props.updatePointer(
                      box.id,
                      x,
                      y,
                      size.height,
                      size.width
                    )
                  }
                  color={box.color}
                />
                <line
                  x1={lineFromX}
                  y1={lineFromY}
                  x2={x2}
                  y2={y2}
                  style={{ stroke: box.color, strokeWidth: "2" }}
                />
              </g>
            );
          })}
        </svg>
        {boxes.map(box => {
          const x1 = size.width * box.info.dx;
          const y1 = size.height * box.info.dy;

          return (
            <div
              key={box.id}
              style={{
                maxWidth: "220px",
                minWidth: "200px",
                minHeight: "56",
                padding: "10px",
                borderRadius: "30px",
                backgroundColor: box.color,
                color: "white",
                position: "absolute",
                top: 0,
                left: 0,
                transform: `translate3d(
                              ${x1}px, 
                              ${y1}px,
                               0px) rotate(0deg)`
              }}
            >
              <Odometer
                name={box.tag.name}
                description={box.tag.description}
                unit={box.tag.unit}
                color={box.color}
              />
            </div>
          );
        })}
      </div>
    );
  }
}

const SvgSized = sizeMe({
  monitorHeight: true
})(Svg);

export default SvgSized;
