"use client";

import { motion } from "framer-motion";
import { MapPin, Coffee, Code2, Zap } from "lucide-react";

const highlights = [
  { icon: MapPin,  label: "Ubicación",         value: "Santiago, Chile" },
  { icon: Code2,   label: "Programando",       value: "1+ año"          },
  { icon: Coffee,  label: "Trayectoria profesional", value: "9 años"    },
  { icon: Zap,     label: "Proyectos en producción", value: "3+"        },
];

// Cada card entra desde una esquina distinta
const cardDirections = [
  { x: -40, y: -20 },  // top-left
  { x:  40, y: -20 },  // top-right
  { x: -40, y:  20 },  // bottom-left
  { x:  40, y:  20 },  // bottom-right
];

const vp = { once: true, amount: 0.15 };

export default function About() {
  return (
    <section id="about" className="py-32 px-6">
      <div className="max-w-5xl mx-auto">

        {/* ── Etiqueta de sección: desliza desde la izquierda ── */}
        <div className="flex items-center gap-3 mb-4 overflow-hidden">
          <motion.span
            initial={{ x: -40, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={vp}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="text-xs font-semibold tracking-widest uppercase"
            style={{ color: "var(--accent-light)" }}
          >
            01. Sobre mí
          </motion.span>
          {/* La línea decorativa se "dibuja" hacia la derecha */}
          <motion.div
            initial={{ scaleX: 0, originX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={vp}
            transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
            className="flex-1 h-px max-w-24"
            style={{ background: "rgba(124,58,237,0.3)", transformOrigin: "left" }}
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* ── Texto izquierdo ── */}
          <div>
            {/* Título: blur + fade up */}
            <motion.h2
              initial={{ opacity: 0, y: 32, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={vp}
              transition={{ duration: 0.7, delay: 0.05, ease: "easeOut" }}
              className="text-4xl sm:text-5xl font-bold leading-tight mb-6"
            >
              Construyo ideas y{" "}
              <span className="gradient-text">las hago realidad</span>
            </motion.h2>

            {/* Párrafos en stagger */}
            {[
              "Soy Ezra Torres, Ingeniero en Agronegocios con 9 años de trayectoria en gestión de proyectos público-privados (Servicio Agrícola y Ganadero, ASOF A.G.). En el último año volqué esa experiencia hacia el desarrollo de software: hoy construyo soluciones con Python/Django en el backend y React/Next.js en el frontend.",
              "Me apasiona automatizar procesos: he implementado sitios web con CRM y chatbots integrados que resuelven necesidades reales de negocio, combinando mi background en gestión con código que funciona en producción.",
              "Sigo formándome activamente en Cloud (Azure), DevOps e Inteligencia Artificial, mientras aplico lo aprendido en proyectos reales como este mismo portafolio.",
            ].map((text, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={vp}
                transition={{ duration: 0.55, delay: 0.15 + i * 0.1, ease: "easeOut" }}
                className="leading-relaxed mb-4 last:mb-0"
                style={{ color: "var(--muted-light)" }}
              >
                {text}
              </motion.p>
            ))}
          </div>

          {/* ── Cards de estadísticas, stagger desde esquinas distintas ── */}
          <div className="grid grid-cols-2 gap-4">
            {highlights.map(({ icon: Icon, label, value }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, x: cardDirections[i].x, y: cardDirections[i].y, scale: 0.85 }}
                whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                viewport={vp}
                transition={{
                  type: "spring",
                  stiffness: 220,
                  damping: 22,
                  delay: 0.1 + i * 0.08,
                }}
                className="glow-card rounded-2xl p-6 flex flex-col gap-3"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: "var(--accent-dim)" }}
                >
                  <Icon size={18} style={{ color: "var(--accent-light)" }} />
                </div>
                <div>
                  <div className="text-2xl font-bold" style={{ color: "var(--text)" }}>
                    {value}
                  </div>
                  <div className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>
                    {label}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
