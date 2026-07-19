"use client";

import type { CSSProperties } from "react";
import { useEffect, useState } from "react";

type Sparkle = {
  id: number;
  x: number;
  y: number;
  color: string;
  angle: number;
  distance: number;
  size: number;
};

const sparklePalette = ["#1f5a43", "#2f6f4f", "#7a8f3a", "#c99b49", "#f2c86d"];

export function ClickSparkles() {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    let id = 0;
    const onPointerDown = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      const next = Array.from({ length: 13 }, (_, index) => ({
        id: id++,
        x: event.clientX,
        y: event.clientY,
        color: sparklePalette[(id + index) % sparklePalette.length],
        angle: index * 27.7,
        distance: 34 + (index % 5) * 8,
        size: 5 + (index % 4) * 1.6
      }));
      setSparkles((current) => [...current.slice(-50), ...next]);
      window.setTimeout(() => {
        setSparkles((current) => current.filter((sparkle) => !next.some((item) => item.id === sparkle.id)));
      }, 900);
    };

    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    return () => window.removeEventListener("pointerdown", onPointerDown);
  }, []);

  return (
    <div className="click-sparkles" aria-hidden="true">
      {sparkles.map((sparkle) => (
        <i
          key={sparkle.id}
          style={
            {
              "--x": `${sparkle.x}px`,
              "--y": `${sparkle.y}px`,
              "--angle": `${sparkle.angle}deg`,
              "--distance": `${sparkle.distance}px`,
              "--size": `${sparkle.size}px`,
              color: sparkle.color
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
