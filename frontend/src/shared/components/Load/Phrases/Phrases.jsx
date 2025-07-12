import { useState, useEffect } from "react";

import { DEFAULT_DURATION } from "@/core/constants/default";

const Phrases = ({ large }) => {
  const phrases = ["Loading...", "Please, wait..."];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((previous) => (previous + 1) % phrases.length);
    }, DEFAULT_DURATION);
    return () => clearInterval(interval);
  }, []);

  return (
    <p
      className={`mw-65ch text-center ${
        large ? "fs-5" : "fs-6"
      } text-subtitle text-muted`}
    >
      {phrases[index]}
    </p>
  );
};

export default Phrases;
