import React, { useState } from "react";
import { useSprings } from "react-spring/hooks";
import { useGesture } from "react-with-gesture";
import Card from "./Card";

import "../styles/Deck.css";

const cards = [1, 2, 3, 4,5,6,7];

const objs = [

  {
    pics: [
      "https://media.giphy.com/media/qqQHsZ7WtSNjlmsUqO/giphy-downsized-large.gif",
      "https://media.giphy.com/media/w89ak63KNl0nJl80ig/giphy.gif",
      
    ],
    name: "Signing Off",
    // age: 18,
    // distance: "1 mile away",
    text: "-Sahil Gogave"
  },

  {
    pics: [
      "https://media.giphy.com/media/090VWZvZoOyn0xFtXo/giphy.gif",
      "https://media.giphy.com/media/yhEnePHuGY3eO0HaQL/giphy.gif",
      
    ],
    name: "Adios",
    // age: 18,
    // distance: "1 mile away",
    text: "Its time to say Goodbye."
  },

  {
    pics: [
      "https://media.giphy.com/media/26gBjoKLSCQKQ2qOc/giphy.gif",
      "https://media.giphy.com/media/3o6nUQqlowTVIkz5XW/giphy.gif"
    ],
    name: "You were awesome",
    // age: 18,
    // distance: "1 mile away",
    text: "Wishing each of you the best of health and some of the wonderful opportunities ahead"
  },

  {
    pics: [
      "https://media.giphy.com/media/l3q2wJsC23ikJg9xe/giphy.gif",
      "https://media.giphy.com/media/kVaj8JXJcDsqs/giphy.gif",
      "https://media.giphy.com/media/asXCujsv7ddpm/giphy.gif"
    ],
    name: "Arigato",
    // age: 18,
    // distance: "1 mile away",
    text: "I want to thank my talented, bright, and committed colleagues and work friends."
  },


 
  {
    pics: [
      "https://media.giphy.com/media/YoTgLLUTSQiRnvrRth/giphy.gif",
      "https://media.giphy.com/media/4KCLTHGZJDvyJmgHwA/giphy.gif",
      "https://media.giphy.com/media/3oEjI8Kq5HhZLCrqBW/giphy.gif"

    ],
    name: "This is it",
    // age: 29,
    // distance: "3 miles away",
    text: "Today is my last working day in Capgemini"
  },
  {
    pics: [
      "https://media.giphy.com/media/l1IY282PDsSDtBjLa/giphy-downsized-large.gif",
      "https://media.giphy.com/media/13cptIwW9bgzk6UVyr/giphy-downsized-large.gif"
    ],
    name: "Are you ready?",
    // age: 24,
    // distance: "5 miles away",
    text:
      "I request everyone to take thier seats and take a deep breath."
  },
  {
    pics: [
      // "https://media.giphy.com/media/3o84Ubkv5Lta7SnMek/giphy-downsized-large.gif",
      // "https://media.giphy.com/media/1luXLMeNxsaNFMUuOe/giphy.gif",
      "https://media.giphy.com/media/BXOEmFSzNkOObZhIA3/giphy.gif",
      "https://media.giphy.com/media/VQdtxkDIioW4udmvyZ/giphy.gif"
    ],
    name: "Hello Everyone",
    // age: 22,
    // distance: "2 miles away",
    text:
      "I have an announcement to make."
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
