"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./SocialIcons";
import RotatingWords from "./RotatingWords";

/**
 * Secuencia de intro pineada (inspirada en moncy.dev), contada con scroll:
 *  Fase A (0–22%):  avatar 1 saludando al centro · nombre izq · marquee der
 *  Fase B (22–45%): zoom al avatar, textos del hero se desvanecen
 *  Fase C (45–72%): avatar se corre a la izquierda · "Sobre mí" aparece a la derecha
 *  Fase D (72–100%): crossfade a avatar 2 programando · teaser "Mi trabajo" · suelta el scroll
 */

const socials = [
  { icon: GithubIcon, href: "https://github.com/Ezrap-24", label: "GitHub" },
  { icon: LinkedinIcon, href: "https://linkedin.com/in/ezratj", label: "LinkedIn" },
];

// Entradas al estilo moncy.dev (initialFX): 1.2s, power3.inOut, delays escalonados
const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.2,
      delay: 0.3 + i * 0.12,
      ease: [0.65, 0, 0.35, 1] as const,
    },
  }),
};

function useDesktopVideo() {
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
  return useVideo;
}

function AvatarLayer({
  video,
  image,
  useVideo,
  playing,
}: {
  video: string;
  image: string;
  useVideo: boolean;
  playing: boolean;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  // Solo el video de la fase activa se reproduce — el otro queda pausado
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (playing) {
      el.play().catch(() => {});
    } else {
      el.pause();
    }
  }, [playing, useVideo]);

  return useVideo ? (
    <video
      ref={ref}
      src={video}
      poster={image}
      muted
      loop
      playsInline
      preload="auto"
      className="absolute inset-0 w-full h-full object-cover"
    />
  ) : (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={image} alt="" className="absolute inset-0 w-full h-full object-cover" />
  );
}

export default function IntroSequence() {
  const ref = useRef<HTMLElement>(null);
  const useVideo = useDesktopVideo();

  const { scrollYProgress: pRaw } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // "Scrub" al estilo moncy.dev (GSAP scrub:0.5): la animación persigue al
  // scroll con inercia suave en vez de ir clavada 1:1 — de ahí la fluidez.
  const p = useSpring(pRaw, { stiffness: 90, damping: 25, mass: 0.5, restDelta: 0.001 });

  // Qué video debe reproducirse según la fase del scroll
  const [phase, setPhase] = useState<"a1" | "a2">("a1");
  useMotionValueEvent(p, "change", (v) => {
    setPhase(v > 0.55 ? "a2" : "a1");
  });

  // ── Avatar 1 (saludando): zoom → pan a la izquierda → fade out
  const a1Opacity = useTransform(p, [0, 0.56, 0.66], [1, 1, 0]);
  const a1Scale = useTransform(p, [0, 0.18, 0.36, 0.58], [1, 1.02, 1.35, 1.18]);
  const a1X = useTransform(p, [0.36, 0.58], ["0vw", "-20vw"]);

  // ── Avatar 2 (programando): entra con crossfade y se queda hasta el final
  const a2Opacity = useTransform(p, [0.56, 0.68], [0, 1]);
  const a2Scale = useTransform(p, [0.56, 1], [1.08, 1]);

  // ── Textos del hero: visibles al inicio, se van con el zoom
  const heroOpacity = useTransform(p, [0, 0.16, 0.3], [1, 1, 0]);
  const heroY = useTransform(p, [0.16, 0.3], [0, -60]);

  // ── "Sobre mí": aparece cuando el avatar se corre a la izquierda
  const aboutOpacity = useTransform(p, [0.36, 0.44, 0.54, 0.62], [0, 1, 1, 0]);
  const aboutX = useTransform(p, [0.36, 0.44], [40, 0]);

  // ── "Lo que hago" + tarjetas: sobre el avatar programando
  const whatOpacity = useTransform(p, [0.7, 0.78, 0.94, 1], [0, 1, 1, 0.6]);
  const whatTitleX = useTransform(p, [0.7, 0.78], [-50, 0]);
  const whatCardsX = useTransform(p, [0.7, 0.78], [50, 0]);

  // ── Teaser final "Mi trabajo ↓"
  const teaserOpacity = useTransform(p, [0.92, 0.98], [0, 1]);

  // Cada capa de texto solo captura el mouse cuando está visible
  const heroPointer = useTransform(heroOpacity, (v) => (v < 0.05 ? "none" : "auto"));
  const aboutPointer = useTransform(aboutOpacity, (v) => (v < 0.05 ? "none" : "auto"));
  const whatPointer = useTransform(whatOpacity, (v) => (v < 0.05 ? "none" : "auto"));

  // ── Indicador de scroll: solo en la fase inicial
  const hintOpacity = useTransform(p, [0, 0.12], [1, 0]);

  return (
    <section ref={ref} id="hero" className="relative" style={{ height: "420vh" }}>
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* ══ Capa: Avatar 1 — saludando ══ */}
        <motion.div
          aria-hidden
          className="absolute inset-0"
          style={{ opacity: a1Opacity, scale: a1Scale, x: a1X, willChange: "transform, opacity" }}
        >
          <AvatarLayer
            video="/videos/avatar/avatar-sonriendo.mp4"
            image="/images/avatar/avatar-saludo.jpg"
            useVideo={useVideo}
            playing={phase === "a1"}
          />
        </motion.div>

        {/* ══ Capa: Avatar 2 — programando ══ */}
        <motion.div
          aria-hidden
          className="absolute inset-0"
          style={{ opacity: a2Opacity, scale: a2Scale, willChange: "transform, opacity" }}
        >
          <AvatarLayer
            video="/videos/avatar/avatar-programando.mp4"
            image="/images/avatar/avatar-programando.jpg"
            useVideo={useVideo}
            playing={phase === "a2"}
          />
        </motion.div>

        {/* ══ Velo: personaje visible pero atenuado ══ */}
        <div aria-hidden className="absolute inset-0" style={{ background: "rgba(7,7,15,0.55)" }} />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 100% 90% at 50% 45%, transparent 40%, var(--bg) 100%)",
          }}
        />

        {/* ══ Fase A: textos del hero ══ */}
        <motion.div
          className="absolute inset-0 z-10 flex flex-col justify-center px-6"
          style={{ opacity: heroOpacity, y: heroY, pointerEvents: heroPointer }}
        >
          <div className="w-full max-w-6xl mx-auto">
            <motion.div
              custom={0}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="mb-8 inline-flex w-fit items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-medium"
              style={{
                borderColor: "rgba(124,58,237,0.35)",
                background: "rgba(124,58,237,0.35)",
                color: "#e9d5ff",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 pulse-glow" />
              Disponible para proyectos
            </motion.div>

            <motion.div custom={1} initial="hidden" animate="visible" variants={fadeUp}>
              <p className="text-lg sm:text-xl mb-2" style={{ color: "var(--accent-light)" }}>
                ¡Hola! Soy
              </p>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-none">
                EZRA <span className="gradient-text">TORRES</span>
              </h1>
            </motion.div>
          </div>

          {/* Marquee a la derecha-abajo (diagonal, como moncy.dev) */}
          <motion.div custom={2} initial="hidden" animate="visible" variants={fadeUp} className="mt-14">
            <p
              className="text-lg sm:text-xl mb-3 text-right w-full max-w-6xl mx-auto px-2"
              style={{ color: "var(--muted-light)" }}
            >
              Soy un
            </p>
            <RotatingWords />
          </motion.div>

          <motion.div
            custom={3}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="w-full max-w-6xl mx-auto mt-12 flex flex-wrap items-center gap-4"
          >
            <a
              href="#projects"
              className="group flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition-all duration-300"
              style={{
                background: "var(--accent)",
                color: "#fff",
                boxShadow: "0 0 30px rgba(124,58,237,0.4)",
              }}
            >
              Ver proyectos
              <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
            </a>
            {socials.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200"
                style={{
                  border: "1px solid rgba(255,255,255,0.15)",
                  color: "var(--muted-light)",
                  background: "rgba(13,13,26,0.6)",
                }}
              >
                <Icon size={18} />
              </a>
            ))}
          </motion.div>
        </motion.div>

        {/* ══ Fase C: Sobre mí (derecha) ══ */}
        <motion.div
          className="absolute inset-0 z-10 flex items-center px-6"
          style={{ opacity: aboutOpacity, x: aboutX, pointerEvents: aboutPointer }}
        >
          <div className="w-full max-w-6xl mx-auto flex justify-end">
            <div className="max-w-md lg:max-w-lg">
              <p
                className="text-xs font-semibold tracking-widest uppercase mb-4"
                style={{ color: "var(--accent-light)" }}
              >
                Sobre mí
              </p>
              <p className="text-2xl sm:text-3xl font-semibold leading-snug mb-5" style={{ color: "var(--text)" }}>
                Ingeniero en Agronegocios con 9 años liderando proyectos,{" "}
                <span className="gradient-text">hoy construyo software.</span>
              </p>
              <p className="text-base sm:text-lg leading-relaxed" style={{ color: "var(--muted-light)" }}>
                Python/Django en el backend, React/Next.js en el frontend, y una
                pasión por automatizar: sitios con CRM y chatbots que resuelven
                necesidades reales de negocio.
              </p>
            </div>
          </div>
        </motion.div>

        {/* ══ Fase D: Lo que hago (avatar programando) ══ */}
        <motion.div
          className="absolute inset-0 z-10 flex items-center px-6"
          style={{ opacity: whatOpacity, pointerEvents: whatPointer }}
        >
          <div className="w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            {/* Título grande a la izquierda */}
            <motion.div style={{ x: whatTitleX }}>
              <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] uppercase">
                Lo que{" "}
                <span className="gradient-text block">hago</span>
              </h2>
            </motion.div>

            {/* Tarjetas a la derecha (borde punteado, como moncy.dev) */}
            <motion.div style={{ x: whatCardsX }} className="flex flex-col gap-6">
              {[
                {
                  title: "DESARROLLO",
                  desc: "Aplicaciones web con Python/Django en el backend y React/Next.js en el frontend. De la idea al despliegue.",
                },
                {
                  title: "AUTOMATIZACIÓN",
                  desc: "CRM, chatbots e IA aplicada al negocio: sitios que atienden clientes y procesos que trabajan solos.",
                },
              ].map((card) => (
                <div key={card.title} className="dashed-card p-6 sm:p-8">
                  <span aria-hidden className="corner corner-tl" />
                  <span aria-hidden className="corner corner-tr" />
                  <span aria-hidden className="corner corner-bl" />
                  <span aria-hidden className="corner corner-br" />
                  <h3 className="text-2xl sm:text-3xl font-black tracking-tight mb-1" style={{ color: "var(--text)" }}>
                    {card.title}
                  </h3>
                  <p className="text-xs uppercase tracking-widest mb-3" style={{ color: "var(--muted)" }}>
                    Descripción
                  </p>
                  <p className="text-sm sm:text-base leading-relaxed" style={{ color: "var(--muted-light)" }}>
                    {card.desc}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* ══ Teaser hacia Mi trabajo ══ */}
        <motion.div
          className="absolute inset-x-0 bottom-16 z-10 flex flex-col items-center gap-2"
          style={{ opacity: teaserOpacity }}
        >
          <p className="text-sm tracking-widest uppercase" style={{ color: "var(--accent-light)" }}>
            Mi trabajo
          </p>
          <div
            className="w-px h-10"
            style={{ background: "linear-gradient(to bottom, var(--accent), transparent)" }}
          />
        </motion.div>

        {/* ══ Indicador de scroll (solo al inicio) ══ */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
          style={{ opacity: hintOpacity }}
        >
          <span className="text-xs" style={{ color: "var(--muted)" }}>scroll</span>
          <div
            className="w-px h-10 opacity-40"
            style={{ background: "linear-gradient(to bottom, var(--accent), transparent)" }}
          />
        </motion.div>
      </div>
    </section>
  );
}
