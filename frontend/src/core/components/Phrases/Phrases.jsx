import { useState, useEffect } from "react";

import { DEFAULT_DURATION } from "@/core/constants/general";

const Phrases = ({ phrases, duration = DEFAULT_DURATION, large }) => {
  const RATIO = duration / 6;

  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setLoading(true);

      setTimeout(() => {
        setIndex((previousIndex) => ++previousIndex % phrases.length);

        setLoading(false);
      }, RATIO);
    }, duration);

    return () => clearInterval(interval);
  }, [phrases]);

  return (
    <p
      className={`mw-65ch text-center ${
        large ? "fs-5" : "fs-6"
      } text-muted fade ${loading ? "opacity-0" : "opacity-100 show"}`}
      style={{ transition: "opacity 0.5s ease-in-out" }}
    >
      {phrases[index]}
    </p>
  );
};

export default Phrases;
