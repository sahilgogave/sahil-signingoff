import React, { useState } from "react";
import { useSprings } from "react-spring/hooks";
import { useGesture } from "react-with-gesture";
import Card from "./Card";
import running from '../img/running.gif'
import laptop from '../img/laptopshutdown.gif'
import seat from '../img/seat.gif'
import drumroll from '../img/drumroll.gif'
import requestdrum from '../img/requestdrum.gif'
import leaving from '../img/leaving.gif'
import salute from '../img/salute.gif'
import thankskid from '../img/thankskid.gif'
import roll from '../img/roll.gif'
import fistbump from '../img/fistbump.gif'
import goodluck from '../img/goodluck.gif'
import smile from '../img/smile.gif'
import later from '../img/later.gif'
import touch from '../img/touch.gif'
import thankyou from '../img/thankyou.gif'
import dwight from '../img/dwight.gif'
import bye from '../img/bye.gif'
import runningdoor from '../img/runningdoor.gif'
import hug from '../img/hug.gif'
import "../styles/Deck.css";


const cards = [1, 2, 3, 4,5,6,7,8,9];

const objs = [

  {
    pics: [
      laptop,
      // bye,
      runningdoor,
      running,
    ],
    name: "Signing Off",
    text: "-Sahil Gogave"
  },

  {
    pics: [
      // miclook,
      hug,
      later
      
    ],
    name: "Later Guys",
    text: "It's not a goodbye; it's a see you later. I hope our paths cross again. "
  },

  {
    pics: [
      touch,
      
    ],
    name: "Stay in Touch",
    text: "email - sahilgogavelm@gmail.com,   Phone-9763410719"
  },

  {
    pics: [
      goodluck,
      fistbump
    ],
    name: "Good Luck",
    text: "Wishing each of you the best of health and lots of wonderful opportunities in life."
  },



  {
    pics: [
      roll,
      salute,
    ],
    name: "You",
    // text: "Many thanks to my talented, bright, and committed colleagues and work friends."
    text:"Without your friendship, support and collaboration, my time here would not have been the same."
  },

  {
    pics: [
      thankskid,
      thankyou,
    ],
    name: "Thanks Partner",
    // text: "Many thanks to my talented, bright, and committed colleagues and work friends."
    text:"It was pleasure for being able to get to know you both professionally and personally."
  },

 
  {
    pics: [
      leaving,
      smile

    ],
    name: "This is it",
    text: "Today I bid my farewell to you and Capgemini."
  },
  {
    pics: [
      requestdrum,
      drumroll
    ],
    name: "Before We Start",
    text:
      "*da-dum-da-dum*"
  },
  {
    pics: [
      // "https://media.giphy.com/media/3o84Ubkv5Lta7SnMek/giphy-downsized-large.gif",
      // "https://media.giphy.com/media/1luXLMeNxsaNFMUuOe/giphy.gif",
      
      dwight,
      seat
      
      // "https://media.giphy.com/media/VQdtxkDIioW4udmvyZ/giphy.gif"
    ],
    name: "Greetings All!",
    text:
      "This is my farewell message."
  }
];

const to = i => ({
  x: 0,
  y: i * -10,
  scale: 1,
  rot: -10 + Math.random() * 20,
  delay: i * 100
});
const from = i => ({ rot: 0, scale: 1.5, y: -1000 });

const trans = (r, s) =>
  `perspective(1500px) rotateX(30deg) rotateY(${r /
    10}deg) rotateZ(${r}deg) scale(${s})`;

function Deck() {
  const [gone] = useState(() => new Set());

  const [props, set] = useSprings(cards.length, i => ({
    ...to(i),
    from: from(i)
  }));

  const bind = useGesture(
    ({
      args: [index],
      down,
      delta: [xDelta],
      distance,
      direction: [xDir],
      velocity
    }) => {
      const trigger = velocity > 0.2;

      const dir = xDir < 0 ? -1 : 1;

      if (!down && trigger) gone.add(index);

      set(i => {
        if (index !== i) return;
        const isGone = gone.has(index);

        const x = isGone ? (200 + window.innerWidth) * dir : down ? xDelta : 0;

        const rot = xDelta / 100 + (isGone ? dir * 10 * velocity : 0);

        const scale = down ? 1.1 : 1;
        return {
          x,
          rot,
          scale,
          delay: undefined,
          config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 }
        };
      });

      if (!down && gone.size === cards.length)
        setTimeout(() => gone.clear() || set(i => to(i)), 600);
    }
  );

  return props.map(({ x, y, rot, scale }, i) => (
    <Card
      i={i}
      x={x}
      y={y}
      rot={rot}
      scale={scale}
      trans={trans}
      cards={cards}
      objs={objs}
      bind={bind}
    />
  ));
  
}

export default Deck;
