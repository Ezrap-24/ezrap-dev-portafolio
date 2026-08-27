"use client";

/**
 * DEMO TEMPORAL — probador de cursores custom.
 * Abrir en http://localhost:3000/cursores
 * Elegido el favorito, esta carpeta se elimina.
 */

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, useVelocity, AnimatePresence } from "framer-motion";

type Style = "mira" | "cometa" | "invertir" | "contextual" | "linterna" | "blob" | "orbita" | "codigo" | "satelites" | "glitch" | "chispas" | "pixel";

// ─────────────────────────────────────────────────────────────
function useMouse() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  useEffect(() => {
    const onMove = (e: MouseEvent) => { x.set(e.clientX); y.set(e.clientY); };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [x, y]);
  return { x, y };
}

function useHoverTarget() {
  const [rect, setRect] = useState<DOMRect | null>(null);
  useEffect(() => {
    const onOver = (e: MouseEvent) => {
      const t = (e.target as HTMLElement | null)?.closest("a, button, .demo-card");
      setRect(t ? t.getBoundingClientRect() : null);
    };
    window.addEventListener("mouseover", onOver);
    return () => window.removeEventListener("mouseover", onOver);
  }, []);
  return rect;
}

// ── 1) MIRA TÉCNICA ──────────────────────────────────────────
function CursorMira() {
  const { x, y } = useMouse();
  const rect = useHoverTarget();
  const sx = useSpring(x, { stiffness: 400, damping: 30 });
  const sy = useSpring(y, { stiffness: 400, damping: 30 });

  const size = 36;
  const corners = [
    { rot: 0,   ox: -1, oy: -1 },
    { rot: 90,  ox: 1,  oy: -1 },
    { rot: 270, ox: -1, oy: 1 },
    { rot: 180, ox: 1,  oy: 1 },
  ];

  return (
    <>
      <motion.div className="fixed z-[9999] pointer-events-none rounded-full"
        style={{ x, y, translateX: "-50%", translateY: "-50%", width: 4, height: 4, background: "var(--accent-light)" }} />
      {corners.map((c, i) => {
        const cx = rect ? rect.left + rect.width / 2 : null;
        return (
          <motion.div key={i} className="fixed z-[9999] pointer-events-none"
            animate={rect ? {
              left: c.ox < 0 ? rect.left - 6 : rect.right + 6 - 14,
              top:  c.oy < 0 ? rect.top - 6  : rect.bottom + 6 - 14,
              opacity: 1,
            } : { opacity: 0.9 }}
            transition={{ type: "spring", stiffness: 350, damping: 26 }}
            style={rect ? { rotate: c.rot } : {
              left: undefined, top: undefined,
              x: sx, y: sy, rotate: c.rot,
              translateX: c.ox < 0 ? -size / 2 : size / 2 - 14,
              translateY: c.oy < 0 ? -size / 2 : size / 2 - 14,
            }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14">
              <path d="M1 13 L1 1 L13 1" fill="none" stroke="var(--accent-light)" strokeWidth="2" />
            </svg>
          </motion.div>
        );
      })}
    </>
  );
}

// ── 2) COMETA CON ESTELA ─────────────────────────────────────
function CursorCometa() {
  const { x, y } = useMouse();
  const N = 8;
  const springs = Array.from({ length: N }, (_, i) => ({
    // eslint-disable-next-line react-hooks/rules-of-hooks
    x: useSpring(x, { stiffness: 320 - i * 32, damping: 26, mass: 0.4 }),
    // eslint-disable-next-line react-hooks/rules-of-hooks
    y: useSpring(y, { stiffness: 320 - i * 32, damping: 26, mass: 0.4 }),
  }));
  return (
    <>
      {springs.map((s, i) => (
        <motion.div key={i} className="fixed z-[9999] pointer-events-none rounded-full"
          style={{
            x: s.x, y: s.y, translateX: "-50%", translateY: "-50%",
            width: 12 - i, height: 12 - i,
            background: i === 0 ? "var(--accent-light)" : "var(--accent)",
            opacity: 1 - i * 0.11,
            boxShadow: i === 0 ? "0 0 12px rgba(167,139,250,0.9)" : "none",
          }} />
      ))}
    </>
  );
}

// ── 3) CÍRCULO QUE INVIERTE ──────────────────────────────────
function CursorInvertir() {
  const { x, y } = useMouse();
  const rect = useHoverTarget();
  const sx = useSpring(x, { stiffness: 260, damping: 24 });
  const sy = useSpring(y, { stiffness: 260, damping: 24 });
  return (
    <motion.div className="fixed z-[9999] pointer-events-none rounded-full"
      animate={{ width: rect ? 80 : 32, height: rect ? 80 : 32 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      style={{
        x: sx, y: sy, translateX: "-50%", translateY: "-50%",
        background: "#fff", mixBlendMode: "difference",
      }} />
  );
}

// ── 4) CONTEXTUAL CON TEXTO ──────────────────────────────────
function CursorContextual() {
  const { x, y } = useMouse();
  const rect = useHoverTarget();
  const sx = useSpring(x, { stiffness: 300, damping: 26 });
  const sy = useSpring(y, { stiffness: 300, damping: 26 });
  return (
    <motion.div className="fixed z-[9999] pointer-events-none flex items-center justify-center rounded-full font-semibold"
      animate={rect
        ? { width: 74, height: 74, backgroundColor: "rgba(124,58,237,0.95)" }
        : { width: 10, height: 10, backgroundColor: "rgba(167,139,250,1)" }}
      transition={{ type: "spring", stiffness: 320, damping: 24 }}
      style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%", color: "#fff", fontSize: 13 }}
    >
      <AnimatePresence>
        {rect && (
          <motion.span initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }}>
            VER →
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ── 5) LINTERNA (revela el fondo) ────────────────────────────
function CursorLinterna() {
  const { x, y } = useMouse();
  const rect = useHoverTarget();
  const sx = useSpring(x, { stiffness: 200, damping: 22 });
  const sy = useSpring(y, { stiffness: 200, damping: 22 });
  return (
    <>
      <motion.div className="fixed z-[9999] pointer-events-none rounded-full"
        style={{ x, y, translateX: "-50%", translateY: "-50%", width: 6, height: 6, background: "#fff" }} />
      <motion.div className="fixed z-[9998] pointer-events-none rounded-full"
        animate={{ width: rect ? 480 : 320, height: rect ? 480 : 320 }}
        transition={{ type: "spring", stiffness: 180, damping: 24 }}
        style={{
          x: sx, y: sy, translateX: "-50%", translateY: "-50%",
          background: "radial-gradient(circle, rgba(167,139,250,0.28) 0%, rgba(124,58,237,0.10) 45%, transparent 70%)",
          mixBlendMode: "screen",
        }} />
    </>
  );
}

// ── 6) BLOB ELÁSTICO (se estira con la velocidad) ────────────
function CursorBlob() {
  const { x, y } = useMouse();
  const sx = useSpring(x, { stiffness: 220, damping: 20, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 220, damping: 20, mass: 0.6 });
  const vx = useVelocity(sx);
  const vy = useVelocity(sy);
  const speed = useTransform([vx, vy] as const, ([a, b]: number[]) => Math.min(Math.hypot(a, b) / 1400, 0.75));
  const angle = useTransform([vx, vy] as const, ([a, b]: number[]) => (Math.atan2(b, a) * 180) / Math.PI);
  const scaleX = useTransform(speed, (s) => 1 + s);
  const scaleY = useTransform(speed, (s) => 1 - s * 0.5);
  return (
    <motion.div className="fixed z-[9999] pointer-events-none rounded-full"
      style={{
        x: sx, y: sy, translateX: "-50%", translateY: "-50%",
        rotate: angle, scaleX, scaleY,
        width: 28, height: 28,
        background: "rgba(167,139,250,0.85)",
        boxShadow: "0 0 24px rgba(124,58,237,0.6)",
      }} />
  );
}

// ── 7) ÓRBITA (anillo punteado girando) ──────────────────────
function CursorOrbita() {
  const { x, y } = useMouse();
  const rect = useHoverTarget();
  const sx = useSpring(x, { stiffness: 280, damping: 24 });
  const sy = useSpring(y, { stiffness: 280, damping: 24 });
  return (
    <>
      <motion.div className="fixed z-[9999] pointer-events-none rounded-full"
        style={{ x, y, translateX: "-50%", translateY: "-50%", width: 5, height: 5, background: "var(--accent-light)" }} />
      <motion.div className="fixed z-[9998] pointer-events-none rounded-full"
        animate={{ rotate: 360, width: rect ? 64 : 38, height: rect ? 64 : 38 }}
        transition={{
          rotate: { duration: rect ? 1.2 : 3.5, ease: "linear", repeat: Infinity },
          width: { type: "spring", stiffness: 300, damping: 22 },
          height: { type: "spring", stiffness: 300, damping: 22 },
        }}
        style={{
          x: sx, y: sy, translateX: "-50%", translateY: "-50%",
          border: "1.5px dashed var(--accent-light)",
        }} />
    </>
  );
}

// ── 8) CÓDIGO (brackets de dev + caret parpadeante) ──────────
function CursorCodigo() {
  const { x, y } = useMouse();
  const rect = useHoverTarget();
  const sx = useSpring(x, { stiffness: 320, damping: 26 });
  const sy = useSpring(y, { stiffness: 320, damping: 26 });
  const gap = rect ? 26 : 13;
  return (
    <motion.div className="fixed z-[9999] pointer-events-none flex items-center font-bold"
      style={{
        x: sx, y: sy, translateX: "-50%", translateY: "-50%",
        color: "var(--accent-light)", fontSize: 22,
        fontFamily: "var(--font-geist-mono), monospace",
        textShadow: "0 0 12px rgba(124,58,237,0.8)",
      }}>
      <motion.span animate={{ x: -gap }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>{"<"}</motion.span>
      <motion.span
        animate={{ opacity: [1, 1, 0, 0] }}
        transition={{ duration: 1, repeat: Infinity, times: [0, 0.5, 0.5, 1] }}
        className="mx-0.5" style={{ fontSize: 16 }}
      >
        {rect ? "/" : "_"}
      </motion.span>
      <motion.span animate={{ x: gap }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>{">"}</motion.span>
    </motion.div>
  );
}

// ── 9) SATÉLITES (puntos orbitando) ──────────────────────────
function CursorSatelites() {
  const { x, y } = useMouse();
  const rect = useHoverTarget();
  const sx = useSpring(x, { stiffness: 260, damping: 24 });
  const sy = useSpring(y, { stiffness: 260, damping: 24 });
  const orbits = [
    { r: 20, dur: 2.2, size: 5, dir: 1 },
    { r: 30, dur: 3.6, size: 4, dir: -1 },
    { r: 42, dur: 5.2, size: 3, dir: 1 },
  ];
  return (
    <>
      <motion.div className="fixed z-[9999] pointer-events-none rounded-full"
        style={{ x, y, translateX: "-50%", translateY: "-50%", width: 7, height: 7, background: "var(--accent-light)", boxShadow: "0 0 10px rgba(167,139,250,0.9)" }} />
      {orbits.map((o, i) => (
        <motion.div key={i} className="fixed z-[9998] pointer-events-none"
          animate={{ rotate: 360 * o.dir }}
          transition={{ duration: rect ? o.dur * 0.4 : o.dur, ease: "linear", repeat: Infinity }}
          style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%", width: 0, height: 0 }}
        >
          <motion.div className="rounded-full absolute"
            animate={{ left: rect ? o.r * 0.55 : o.r }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            style={{ top: 0, width: o.size, height: o.size, background: "var(--accent)", opacity: 0.9 }} />
        </motion.div>
      ))}
    </>
  );
}

// ── 10) GLITCH RGB ───────────────────────────────────────────
function CursorGlitch() {
  const { x, y } = useMouse();
  const rect = useHoverTarget();
  const size = rect ? 26 : 14;
  return (
    <>
      <motion.div className="fixed z-[9997] pointer-events-none"
        animate={{ x: [-3, 2, -1, 3, -2], y: [1, -2, 3, -1, 2], width: size, height: size }}
        transition={{ x: { duration: 0.35, repeat: Infinity, repeatType: "mirror" }, y: { duration: 0.28, repeat: Infinity, repeatType: "mirror" } }}
        style={{ left: 0, top: 0, translateX: "-50%", translateY: "-50%", background: "#0ff", mixBlendMode: "screen", opacity: 0.7, position: "fixed" }}
      >
        <motion.div style={{ x, y, position: "fixed", width: size, height: size, background: "#0ff", translateX: "-50%", translateY: "-50%" }} />
      </motion.div>
      <motion.div className="fixed z-[9997] pointer-events-none"
        animate={{ x: [2, -3, 1, -2, 3], y: [-1, 2, -3, 1, -2] }}
        transition={{ x: { duration: 0.31, repeat: Infinity, repeatType: "mirror" }, y: { duration: 0.24, repeat: Infinity, repeatType: "mirror" } }}
        style={{ position: "fixed", left: 0, top: 0 }}
      >
        <motion.div style={{ x, y, position: "fixed", width: size, height: size, background: "#f0f", translateX: "-50%", translateY: "-50%", mixBlendMode: "screen", opacity: 0.7 }} />
      </motion.div>
      <motion.div className="fixed z-[9999] pointer-events-none"
        style={{ x, y, position: "fixed", translateX: "-50%", translateY: "-50%", width: size, height: size, background: "#fff", mixBlendMode: "screen" }} />
    </>
  );
}

// ── 11) CHISPAS (explotan al hacer clic) ─────────────────────
function CursorChispas() {
  const { x, y } = useMouse();
  const [sparks, setSparks] = useState<{ id: number; x: number; y: number; angle: number; dist: number }[]>([]);
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const id = Date.now();
      const burst = Array.from({ length: 10 }, (_, i) => ({
        id: id + i,
        x: e.clientX,
        y: e.clientY,
        angle: (i / 10) * Math.PI * 2 + Math.random() * 0.5,
        dist: 40 + Math.random() * 50,
      }));
      setSparks((s) => [...s, ...burst]);
      setTimeout(() => setSparks((s) => s.filter((p) => !burst.some((b) => b.id === p.id))), 700);
    };
    window.addEventListener("click", onClick);
    return () => window.removeEventListener("click", onClick);
  }, []);
  return (
    <>
      <motion.div className="fixed z-[9999] pointer-events-none rounded-full"
        style={{ x, y, translateX: "-50%", translateY: "-50%", width: 9, height: 9, background: "var(--accent-light)", boxShadow: "0 0 14px rgba(167,139,250,1)" }} />
      {sparks.map((s) => (
        <motion.div key={s.id} className="fixed z-[9998] pointer-events-none rounded-full"
          initial={{ left: s.x, top: s.y, opacity: 1, width: 6, height: 6 }}
          animate={{
            left: s.x + Math.cos(s.angle) * s.dist,
            top: s.y + Math.sin(s.angle) * s.dist,
            opacity: 0, width: 2, height: 2,
          }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{ background: "var(--accent-light)", position: "fixed" }} />
      ))}
    </>
  );
}

// ── 12) PÍXEL RETRO (se mueve en cuadrícula) ─────────────────
function CursorPixel() {
  const { x, y } = useMouse();
  const rect = useHoverTarget();
  const gx = useTransform(x, (v) => Math.round(v / 10) * 10);
  const gy = useTransform(y, (v) => Math.round(v / 10) * 10);
  return (
    <motion.div className="fixed z-[9999] pointer-events-none"
      animate={{ width: rect ? 30 : 16, height: rect ? 30 : 16, rotate: rect ? 45 : 0 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      style={{
        x: gx, y: gy, translateX: "-50%", translateY: "-50%",
        border: "3px solid var(--accent-light)",
        boxShadow: "3px 3px 0 rgba(124,58,237,0.5)",
        imageRendering: "pixelated",
      }} />
  );
}

// ─────────────────────────────────────────────────────────────
const STYLES: { key: Style; name: string; desc: string }[] = [
  { key: "mira",       name: "1 · Mira técnica",   desc: "Esquinas que abrazan el elemento" },
  { key: "cometa",     name: "2 · Cometa",         desc: "Estela violeta que persigue" },
  { key: "invertir",   name: "3 · Inversión",      desc: "Invierte los colores debajo" },
  { key: "contextual", name: "4 · Contextual",     desc: "Se convierte en \"VER →\"" },
  { key: "linterna",   name: "5 · Linterna",       desc: "Ilumina lo que hay debajo" },
  { key: "blob",       name: "6 · Blob elástico",   desc: "Se estira con la velocidad" },
  { key: "orbita",     name: "7 · Órbita",          desc: "Anillo punteado girando" },
  { key: "codigo",     name: "8 · Código",          desc: "Brackets <_> de developer" },
  { key: "satelites",  name: "9 · Satélites",       desc: "Puntos orbitando el cursor" },
  { key: "glitch",     name: "10 · Glitch RGB",     desc: "Distorsión cyan/magenta" },
  { key: "chispas",    name: "11 · Chispas",        desc: "Explotan al hacer clic" },
  { key: "pixel",      name: "12 · Píxel retro",    desc: "Se mueve en cuadrícula" },
];

export default function CursorDemo() {
  const [style, setStyle] = useState<Style>("mira");

  useEffect(() => {
    document.documentElement.classList.add("custom-cursor");
    return () => document.documentElement.classList.remove("custom-cursor");
  }, []);

  return (
    <main className="min-h-screen px-6 py-24" style={{ background: "var(--bg)" }}>
      {style === "mira" && <CursorMira />}
      {style === "cometa" && <CursorCometa />}
      {style === "invertir" && <CursorInvertir />}
      {style === "contextual" && <CursorContextual />}
      {style === "linterna" && <CursorLinterna />}
      {style === "blob" && <CursorBlob />}
      {style === "orbita" && <CursorOrbita />}
      {style === "codigo" && <CursorCodigo />}
      {style === "satelites" && <CursorSatelites />}
      {style === "glitch" && <CursorGlitch />}
      {style === "chispas" && <CursorChispas />}
      {style === "pixel" && <CursorPixel />}

      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-black mb-2">Probador de <span className="gradient-text">cursores</span></h1>
        <p className="mb-10" style={{ color: "var(--muted-light)" }}>
          Elige un estilo y mueve el mouse. Pasa sobre las tarjetas y botones para ver la reacción.
        </p>

        <div className="flex flex-wrap gap-3 mb-16">
          {STYLES.map((s) => (
            <button key={s.key} onClick={() => setStyle(s.key)}
              className="rounded-xl px-5 py-3 text-sm font-semibold transition-all"
              style={{
                background: style === s.key ? "var(--accent)" : "var(--surface)",
                color: style === s.key ? "#fff" : "var(--muted-light)",
                border: "1px solid " + (style === s.key ? "var(--accent)" : "var(--border)"),
              }}>
              {s.name}
              <span className="block text-xs font-normal opacity-70">{s.desc}</span>
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          <div className="demo-card dashed-card p-8">
            <h3 className="text-2xl font-black mb-2">DESARROLLO</h3>
            <p style={{ color: "var(--muted-light)" }}>Pasa el cursor por aquí para probar la reacción.</p>
          </div>
          <div className="demo-card dashed-card p-8">
            <h3 className="text-2xl font-black mb-2">AUTOMATIZACIÓN</h3>
            <p style={{ color: "var(--muted-light)" }}>Y también por aquí.</p>
          </div>
        </div>

        <div className="mt-10 flex gap-4">
          <button className="rounded-xl px-6 py-3 text-sm font-semibold" style={{ background: "var(--accent)", color: "#fff" }}>
            Un botón de prueba
          </button>
          <a href="#" onClick={(e) => e.preventDefault()} className="rounded-xl px-6 py-3 text-sm font-semibold" style={{ border: "1px solid var(--border)", color: "var(--text)" }}>
            Un link de prueba
          </a>
        </div>
      </div>
    </main>
  );
}
