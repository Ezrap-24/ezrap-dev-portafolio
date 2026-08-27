"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Cursor "Cometa" (solo desktop con mouse):
 * núcleo brillante + estela de puntos violeta que persiguen al mouse
 * con resortes progresivamente más blandos. El núcleo crece levemente
 * sobre elementos interactivos.
 */
const N = 8;

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  // Estela: resortes cada vez más "sueltos" (los últimos llegan más tarde)
  /* eslint-disable react-hooks/rules-of-hooks */
  const trail = Array.from({ length: N }, (_, i) => ({
    x: useSpring(x, { stiffness: 320 - i * 32, damping: 26, mass: 0.4 }),
    y: useSpring(y, { stiffness: 320 - i * 32, damping: 26, mass: 0.4 }),
  }));
  /* eslint-enable react-hooks/rules-of-hooks */

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)");
    if (!fine.matches) return;

    setEnabled(true);
    document.documentElement.classList.add("custom-cursor");

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      setHovering(!!t?.closest("a, button, .dashed-card, .glow-card, [data-cursor]"));
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    return () => {
      document.documentElement.classList.remove("custom-cursor");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      {trail.map((s, i) => (
        <motion.div
          key={i}
          aria-hidden
          className="fixed top-0 left-0 z-[9999] pointer-events-none rounded-full"
          animate={i === 0 ? { width: hovering ? 18 : 12, height: hovering ? 18 : 12 } : undefined}
          transition={i === 0 ? { type: "spring", stiffness: 300, damping: 20 } : undefined}
          style={{
            x: s.x,
            y: s.y,
            translateX: "-50%",
            translateY: "-50%",
            width: i === 0 ? 12 : 12 - i,
            height: i === 0 ? 12 : 12 - i,
            background: i === 0 ? "var(--accent-light)" : "var(--accent)",
            opacity: 1 - i * 0.11,
            boxShadow: i === 0 ? "0 0 12px rgba(167,139,250,0.9)" : "none",
          }}
        />
      ))}
    </>
  );
}
