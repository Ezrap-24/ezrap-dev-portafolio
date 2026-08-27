"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

/**
 * Fondo del Hero: personaje como atmósfera detrás del texto.
 * - Desktop (pointer fino, sin reduced-motion): video avatar-sonriendo.mp4
 * - Mobile/tablet o reduced-motion: imagen estática avatar-saludo.jpg
 * Siempre con overlay oscuro + gradiente radial para legibilidad del texto.
 */
export default function HeroBackground() {
  const [useVideo, setUseVideo] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine) and (min-width: 1024px)");
    const motionOk = window.matchMedia("(prefers-reduced-motion: no-preference)");
    const update = () => setUseVideo(fine.matches && motionOk.matches);
    update();
    fine.addEventListener("change", update);
    motionOk.addEventListener("change", update);
    return () => {
      fine.removeEventListener("change", update);
      motionOk.removeEventListener("change", update);
    };
  }, []);

  return (
    <motion.div
      aria-hidden
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="absolute inset-0 -z-10 overflow-hidden"
    >
      {useVideo ? (
        <video
          src="/videos/avatar/avatar-sonriendo.mp4"
          poster="/images/avatar/avatar-saludo.jpg"
          muted
          autoPlay
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: "grayscale(35%) brightness(0.55) blur(1px)" }}
        />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src="/images/avatar/avatar-saludo.jpg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: "grayscale(40%) brightness(0.5) blur(2px)" }}
        />
      )}

      {/* Overlay plano para bajar todo el fondo */}
      <div
        className="absolute inset-0"
        style={{ background: "rgba(7, 7, 15, 0.72)" }}
      />
      {/* Gradiente radial: zona del texto (izquierda-centro) casi opaca, bordes dejan ver al personaje */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 40% 55%, transparent 0%, var(--bg) 85%)",
        }}
      />
    </motion.div>
  );
}
