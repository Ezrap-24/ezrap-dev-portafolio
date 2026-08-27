"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Preloader: precarga de verdad los assets pesados del hero (imágenes + videos
 * del avatar, ~7MB) mientras muestra el contador. Así la secuencia de scroll
 * arranca fluida en vez de con saltos por assets a medio bajar.
 *
 * El % combina progreso real de descarga con un mínimo en pantalla de ~1.4s
 * para que no parpadee en conexiones rápidas.
 */

const ASSETS = [
  "/images/avatar/avatar-saludo.jpg",
  "/images/avatar/avatar-programando.jpg",
  "/videos/avatar/avatar-sonriendo.mp4",
  "/videos/avatar/avatar-programando.mp4",
];

const MIN_MS = 1400;

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const started = performance.now();
    let loaded = 0;

    // Bloquear scroll mientras carga
    document.body.style.overflow = "hidden";

    const bump = () => {
      loaded += 1;
      if (!cancelled) {
        setProgress((p) => Math.max(p, Math.round((loaded / ASSETS.length) * 100)));
      }
    };

    const preload = (src: string) =>
      new Promise<void>((resolve) => {
        if (src.endsWith(".mp4")) {
          const v = document.createElement("video");
          v.preload = "auto";
          v.muted = true;
          v.src = src;
          const finish = () => resolve();
          v.addEventListener("canplaythrough", finish, { once: true });
          v.addEventListener("error", finish, { once: true });
          // Red lenta: no dejar al visitante esperando para siempre
          setTimeout(finish, 8000);
        } else {
          const img = new Image();
          img.onload = () => resolve();
          img.onerror = () => resolve();
          img.src = src;
        }
      });

    // Avance "de relleno" para que el número siempre se sienta vivo
    const tick = setInterval(() => {
      if (cancelled) return;
      setProgress((p) => (p < 92 ? p + Math.random() * 3 : p));
    }, 110);

    Promise.all(ASSETS.map((a) => preload(a).then(bump))).then(async () => {
      const elapsed = performance.now() - started;
      if (elapsed < MIN_MS) {
        await new Promise((r) => setTimeout(r, MIN_MS - elapsed));
      }
      if (cancelled) return;
      clearInterval(tick);
      setProgress(100);
      setTimeout(() => {
        if (cancelled) return;
        setDone(true);
        document.body.style.overflow = "";
        window.scrollTo(0, 0);
      }, 450);
    });

    return () => {
      cancelled = true;
      clearInterval(tick);
      document.body.style.overflow = "";
    };
  }, []);

  const pct = Math.min(100, Math.round(progress));

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[10000] flex items-center justify-center"
          style={{ background: "var(--bg)" }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.65, 0, 0.35, 1] }}
        >
          {/* Halo violeta de ambiente */}
          <div
            aria-hidden
            className="absolute w-[600px] h-[600px] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(124,58,237,0.18) 0%, transparent 65%)",
              filter: "blur(60px)",
            }}
          />

          <div className="relative flex flex-col items-center gap-7">
          {/* Cápsula */}
          <motion.div
            className="relative flex items-center gap-6 rounded-full px-9 py-5"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ scale: 1.06, opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.65, 0, 0.35, 1] }}
            style={{
              background: "var(--surface)",
              border: "1px solid rgba(124,58,237,0.35)",
              boxShadow:
                "0 0 60px rgba(124,58,237,0.25), inset 0 1px 0 rgba(255,255,255,0.05)",
            }}
          >
            {/* Borde superior que se ilumina con el progreso */}
            <div
              aria-hidden
              className="absolute inset-x-6 top-0 h-px"
              style={{
                background:
                  "linear-gradient(90deg, transparent, var(--accent-light), transparent)",
                opacity: 0.4 + (pct / 100) * 0.6,
              }}
            />

            <span
              className="text-sm font-bold tracking-[0.25em] uppercase"
              style={{ color: "var(--text)" }}
            >
              Loading
            </span>

            <span
              className="text-sm font-semibold tabular-nums"
              style={{
                color: "var(--muted-light)",
                fontFamily: "var(--font-geist-mono), monospace",
              }}
            >
              {pct}%
            </span>

            {/* Caret parpadeante estilo terminal */}
            <motion.span
              aria-hidden
              className="block w-[9px] h-[18px] rounded-[1px]"
              style={{ background: "var(--accent-light)" }}
              animate={{ opacity: [1, 1, 0.15, 0.15] }}
              transition={{ duration: 0.9, repeat: Infinity, times: [0, 0.5, 0.5, 1] }}
            />
          </motion.div>

          {/* Barra de progreso fina bajo la cápsula */}
          <div
            aria-hidden
            className="h-px w-[220px] overflow-hidden"
            style={{ background: "rgba(255,255,255,0.08)" }}
          >
            <motion.div
              className="h-full"
              animate={{ width: `${pct}%` }}
              transition={{ ease: "easeOut", duration: 0.3 }}
              style={{
                background:
                  "linear-gradient(90deg, var(--accent), var(--accent-light))",
              }}
            />
          </div>
          </div>

          <p
            className="absolute bottom-14 text-xs tracking-[0.3em] uppercase"
            style={{ color: "var(--muted)" }}
          >
            ezra<span style={{ color: "var(--accent-light)" }}>p</span>.dev
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
