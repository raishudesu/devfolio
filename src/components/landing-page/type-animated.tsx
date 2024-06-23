"use client";

import { TypeAnimation } from "react-type-animation";
import { textAnimation } from "./hero";

const TypeAnimated = () => {
  return (
    <TypeAnimation
      sequence={[
        "Ideate.",
        1000,
        "Develop.",
        1000,
        "Inspire.",
        1000,
        "Get hired ✨",
        1000,
      ]}
      wrapper="span"
      cursor={true}
      repeat={Infinity}
      className={`${textAnimation} text-5xl md:text-6xl font-bold`}
    />
  );
};

export default TypeAnimated;
