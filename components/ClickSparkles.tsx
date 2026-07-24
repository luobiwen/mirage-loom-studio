"use client";

import { useEffect, useRef } from "react";

const sparklePalette = ["#1f5a43", "#2f6f4f", "#7a8f3a", "#c99b49", "#f2c86d"];

export function ClickSparkles() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    let id = 0;
    const onPointerDown = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;

      const batch = document.createDocumentFragment();
      const nodes: HTMLElement[] = [];

      for (let index = 0; index < 13; index += 1) {
        const sparkle = document.createElement("i");
        sparkle.style.setProperty("--x", `${event.clientX}px`);
        sparkle.style.setProperty("--y", `${event.clientY}px`);
        sparkle.style.setProperty("--angle", `${index * 27.7}deg`);
        sparkle.style.setProperty("--distance", `${34 + (index % 5) * 8}px`);
        sparkle.style.setProperty("--size", `${5 + (index % 4) * 1.6}px`);
        sparkle.style.color = sparklePalette[(id + index) % sparklePalette.length];
        batch.appendChild(sparkle);
        nodes.push(sparkle);
      }

      id += 13;
      root.appendChild(batch);

      // 与原先一致：最多保留约 50 个火花节点
      while (root.childElementCount > 63) {
        root.firstElementChild?.remove();
      }

      window.setTimeout(() => {
        nodes.forEach((node) => node.remove());
      }, 900);
    };

    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    return () => window.removeEventListener("pointerdown", onPointerDown);
  }, []);

  return <div ref={rootRef} className="click-sparkles" aria-hidden="true" />;
}
