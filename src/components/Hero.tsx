"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./SocialIcons";
import HeroBackground from "./HeroBackground";
import RotatingWords from "./RotatingWords";

const socials = [
  { icon: GithubIcon, href: "https://github.com/Ezrap-24", label: "GitHub" },
  { icon: LinkedinIcon, href: "https://linkedin.com/in/ezratj", label: "LinkedIn" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: "easeOut" as const },
  }),
};

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  // Halo que sigue el cursor (suavizado con spring)
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const glowX = useSpring(rawX, { stiffness: 120, damping: 20, mass: 0.4 });
  const glowY = useSpring(rawY, { stiffness: 120, damping: 20, mass: 0.4 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    rawX.set(e.clientX - rect.left);
    rawY.set(e.clientY - rect.top);
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center px-6 overflow-hidden"
    >
      {/* Personaje de fondo (video en desktop, imagen en mobile) */}
      <HeroBackground />

      {/* Halo que sigue el cursor — solo desktop */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute hidden lg:block w-[420px] h-[420px] rounded-full"
        style={{
          left: glowX,
          top: glowY,
          x: "-50%",
          y: "-50%",
          background:
            "radial-gradient(circle, rgba(167,139,250,0.35) 0%, rgba(124,58,237,0.12) 45%, transparent 70%)",
          filter: "blur(20px)",
          mixBlendMode: "screen",
          zIndex: 0,
        }}
      />

      {/* Contenido: un solo bloque de texto, protagonista siempre */}
      <div className="relative z-10 w-full max-w-6xl mx-auto pt-28 pb-20">
        <motion.div
          custom={0}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-medium"
          style={{
            borderColor: "rgba(124,58,237,0.35)",
            background: "rgba(124,58,237,0.08)",
            color: "var(--accent-light)",
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 pulse-glow" />
          Disponible para proyectos
        </motion.div>

        <motion.p
          custom={1}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-lg sm:text-xl mb-2"
          style={{ color: "var(--accent-light)" }}
        >
          ¡Hola! Soy
        </motion.p>

        <motion.h1
          custom={1}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-none mb-10 sm:mb-14"
        >
          EZRA <span className="gradient-text">TORRES</span>
        </motion.h1>

        <motion.p
          custom={2}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-lg sm:text-xl mb-3"
          style={{ color: "var(--muted-light)" }}
        >
          Soy un
        </motion.p>

        <motion.div
          custom={3}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mb-10 -mx-6"
        >
          <RotatingWords />
        </motion.div>

        <motion.div
          custom={4}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="flex flex-wrap items-center gap-4 mb-10"
        >
          <a
            href="#projects"
            className="group flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition-all duration-300"
            style={{
              background: "var(--accent)",
              color: "#fff",
              boxShadow: "0 0 30px rgba(124,58,237,0.4)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = "0 0 50px rgba(124,58,237,0.65)";
              (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = "0 0 30px rgba(124,58,237,0.4)";
              (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
            }}
          >
            Ver proyectos
            <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
          </a>
          <a
            href="#contact"
            className="flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition-all duration-300"
            style={{
              border: "1px solid rgba(255,255,255,0.1)",
              color: "var(--text)",
              background: "transparent",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(124,58,237,0.4)";
              (e.currentTarget as HTMLElement).style.background = "rgba(124,58,237,0.06)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)";
              (e.currentTarget as HTMLElement).style.background = "transparent";
            }}
          >
            Contacto
          </a>
        </motion.div>

        <motion.div
          custom={5}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="flex items-center gap-3"
        >
          {socials.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200"
              style={{
                border: "1px solid var(--border)",
                color: "var(--muted)",
                background: "var(--surface)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color = "var(--accent-light)";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(124,58,237,0.4)";
                (e.currentTarget as HTMLElement).style.background = "var(--accent-dim)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color = "var(--muted)";
                (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                (e.currentTarget as HTMLElement).style.background = "var(--surface)";
              }}
            >
              <Icon size={18} />
            </a>
          ))}
        </motion.div>
      </div>

      {/* Indicador de scroll */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs" style={{ color: "var(--muted)" }}>scroll</span>
        <div
          className="w-px h-10 opacity-30"
          style={{ background: "linear-gradient(to bottom, var(--accent), transparent)" }}
        />
      </motion.div>
    </section>
  );
}
