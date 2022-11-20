import React from "react";
import { animated, interpolate } from "react-spring/hooks";
import Carousel from "nuka-carousel";

class Card extends React.Component {
  render() {
    const { i, x, y, rot, scale, trans, cards, bind, objs } = this.props;
    const { name,  text, pics } = objs[i];

    return (
      <animated.div
        key={i}
        style={{
          transform: interpolate(
            [x, y],
            (x, y) => `translate3d(${x}px,${y}px,0)`
          )
        }}
      >
        <animated.div
          {...bind(i)}
          style={{
            transform: interpolate([rot, scale], trans)
          }}
        >
          <div className="card">
            <Carousel>
              {pics.map(pic => (
                <img src={pic} alt="profilePicture" />
              ))}
            </Carousel>
            <h1>{name}</h1>
            <h4>{text}</h4>
          </div>
        </animated.div>
      </animated.div>
      
    );
  }
}

export default Card;
