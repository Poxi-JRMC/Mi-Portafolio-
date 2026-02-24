import React, { useState, useEffect, useRef } from "react";

/**
 * Typewriter effect sin bugs en móvil.
 */
export default function TypewriterText({ strings = [], delay = 80, deleteSpeed = 40, startDelay = 0 }) {
  const [text, setText] = useState("");
  const [started, setStarted] = useState(false);
  const stateRef = useRef({ stringIndex: 0, isDeleting: false });
  const timeoutRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), startDelay);
    return () => clearTimeout(t);
  }, [startDelay]);

  useEffect(() => {
    if (!started || strings.length === 0) return;

    const tick = () => {
      const { stringIndex, isDeleting } = stateRef.current;
      const current = strings[stringIndex];

      setText((prev) => {
        if (isDeleting) {
          const next = prev.slice(0, -1);
          if (next === "") {
            stateRef.current.isDeleting = false;
            stateRef.current.stringIndex = (stringIndex + 1) % strings.length;
            timeoutRef.current = setTimeout(tick, delay);
          } else {
            timeoutRef.current = setTimeout(tick, deleteSpeed);
          }
          return next;
        } else {
          const next = current.slice(0, prev.length + 1);
          if (next === current) {
            stateRef.current.isDeleting = true;
            timeoutRef.current = setTimeout(tick, 1500);
          } else {
            timeoutRef.current = setTimeout(tick, delay);
          }
          return next;
        }
      });
    };

    timeoutRef.current = setTimeout(tick, delay);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [started, strings, delay, deleteSpeed]);

  return (
    <span>
      {text}
      <span style={{ opacity: 1, animation: "blink 1s step-end infinite" }}>|</span>
    </span>
  );
}
