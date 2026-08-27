"use client";

import { useEffect, useRef } from "react";
import { useRive, useStateMachineInput, Layout, Fit, Alignment } from "@rive-app/react-canvas";
import { motion } from "framer-motion";

// ─── Compatibilidad con "Animated Login Character" de JcToon ─────────────────
//  Descarga desde: https://rive.app/marketplace/2244-7248-animated-login-character/
//  Guarda como: /public/character.riv
//
//  State Machine : "State Machine 1"
//  Inputs:
//    numLook     (Number)  → -3 (izq) a 3 (der)  — seguimiento de mouse
//    isChecking  (Boolean) → mira al teclado (frente al PC)
//    isHandsUp   (Boolean) → manos arriba / celebración
//    trigSuccess (Trigger) → animación éxito
//    trigFail    (Trigger) → animación fallo
// ─────────────────────────────────────────────────────────────────────────────

const STATE_MACHINE = "State Machine 1";

export default function RiveCharacter() {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const { rive, RiveComponent } = useRive({
    src: "/character.riv",
    stateMachines: STATE_MACHINE,
    layout: new Layout({
      fit: Fit.Contain,
      alignment: Alignment.Center,
    }),
    autoplay: true,
  });

  // ── Inputs ──────────────────────────────────────────────────────────────
  const numLook    = useStateMachineInput(rive, STATE_MACHINE, "numLook");
  const isChecking = useStateMachineInput(rive, STATE_MACHINE, "isChecking");
  const isHandsUp  = useStateMachineInput(rive, STATE_MACHINE, "isHandsUp");
  const trigSuccess = useStateMachineInput(rive, STATE_MACHINE, "trigSuccess");

  // ── Seguimiento de mouse → ojos siguen el cursor ────────────────────────
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!numLook) return;
      // Normaliza X: pantalla izq=-1, der=1 → mapea a rango [-3, 3] del personaje
      const nx = ((e.clientX / window.innerWidth) * 2 - 1) * 3;
      numLook.value = nx;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [numLook]);

  // ── Teclas → isChecking = mira el teclado ──────────────────────────────
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const onKeyDown = () => {
      if (isChecking) isChecking.value = true;
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        if (isChecking) isChecking.value = false;
      }, 1500);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      clearTimeout(timeout);
    };
  }, [isChecking]);

  // ── Hover → manos arriba ────────────────────────────────────────────────
  const handleMouseEnter = () => {
    if (isHandsUp) isHandsUp.value = true;
  };
  const handleMouseLeave = () => {
    if (isHandsUp) isHandsUp.value = false;
  };

  // ── Click → trigSuccess ─────────────────────────────────────────────────
  const handleClick = () => {
    trigSuccess?.fire();
  };

  return (
    <motion.div
      ref={wrapperRef}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.9, delay: 0.4, ease: "easeOut" }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      className="relative w-full h-[520px] lg:h-[620px] cursor-pointer select-none"
    >
      {/* Glow púrpura de fondo */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
          background:
            "radial-gradient(ellipse 72% 60% at 50% 65%, rgba(124,58,237,0.5) 0%, rgba(80,40,200,0.14) 50%, transparent 72%)",
          filter: "blur(32px)",
        }}
      />

      {/* Canvas Rive */}
      <div className="relative z-10 w-full h-full">
        <RiveComponent />
      </div>

      {/* Hint de interacción */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5, duration: 0.5 }}
        className="absolute bottom-5 left-1/2 -translate-x-1/2 pointer-events-none flex gap-2"
      >
        {[
          { key: "hover", label: "Hover → saluda" },
          { key: "click", label: "Click → celebra" },
        ].map(({ key, label }) => (
          <span
            key={key}
            className="text-xs px-3 py-1 rounded-full"
            style={{
              background: "rgba(124,58,237,0.12)",
              border: "1px solid rgba(124,58,237,0.22)",
              color: "var(--muted-light)",
            }}
          >
            {label}
          </span>
        ))}
      </motion.div>
    </motion.div>
  );
}
