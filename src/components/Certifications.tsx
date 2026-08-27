"use client";

import { motion } from "framer-motion";
import { Award, BadgeCheck } from "lucide-react";

const certifications = [
  {
    title: "Full Stack Python Trainee",
    institution: "Sustantiva SpA · Programa Reinvéntate Talento Digital (SENCE)",
    meta: "462 horas · 100% asistencia · 2025–2026",
    featured: true,
  },
  {
    title: "Fundamentos de Azure",
    institution: "Código Facilito",
    meta: "Mayo 2026",
  },
  {
    title: "Introducción a DevOps: Bases y Conceptos",
    institution: "Código Facilito",
    meta: "Mayo 2026",
  },
  {
    title: "Ingeniería de Prompts",
    institution: "Código Facilito",
    meta: "Mayo 2026",
  },
  {
    title: "Fundamentos profesionales del análisis de datos",
    institution: "Microsoft & LinkedIn Learning",
    meta: "2025",
  },
  {
    title: "Gestión Ágil de Proyectos (Scrum y Kanban)",
    institution: "Formación complementaria",
    meta: "2025",
  },
];

const vp = { once: true, amount: 0.15 };

export default function Certifications() {
  return (
    <section id="certifications" className="py-32 px-6">
      <div className="max-w-5xl mx-auto">

        {/* ── Etiqueta: slide desde izquierda ── */}
        <div className="flex items-center gap-3 mb-4 overflow-hidden">
          <motion.span
            initial={{ x: -40, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={vp}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="text-xs font-semibold tracking-widest uppercase"
            style={{ color: "var(--accent-light)" }}
          >
            03. Certificaciones
          </motion.span>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={vp}
            transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
            className="flex-1 h-px max-w-24"
            style={{ background: "rgba(124,58,237,0.3)", transformOrigin: "left" }}
          />
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={vp}
          transition={{ duration: 0.65, delay: 0.05, ease: "easeOut" }}
          className="text-4xl sm:text-5xl font-bold mb-4"
        >
          Formación <span className="gradient-text">continua</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={vp}
          transition={{ duration: 0.55, delay: 0.15, ease: "easeOut" }}
          className="mb-12 max-w-lg"
          style={{ color: "var(--muted-light)" }}
        >
          Certificaciones oficiales que respaldan mi transición hacia el desarrollo
          de software.
        </motion.p>

        <div className="grid sm:grid-cols-2 gap-5">
          {certifications.map((cert, i) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={vp}
              transition={{
                type: "spring",
                stiffness: 180,
                damping: 22,
                delay: 0.05 + i * 0.06,
              }}
              className={`glow-card rounded-2xl p-6 flex items-start gap-4 relative overflow-hidden ${
                cert.featured ? "sm:col-span-2" : ""
              }`}
              style={
                cert.featured
                  ? { borderColor: "rgba(124,58,237,0.35)", background: "var(--surface-2)" }
                  : undefined
              }
            >
              {cert.featured && (
                <div
                  className="absolute top-0 left-0 right-0 h-px"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgba(124,58,237,0.7), transparent)",
                  }}
                />
              )}
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: "var(--accent-dim)" }}
              >
                {cert.featured ? (
                  <BadgeCheck size={18} style={{ color: "var(--accent-light)" }} />
                ) : (
                  <Award size={18} style={{ color: "var(--accent-light)" }} />
                )}
              </div>
              <div>
                <h3
                  className="text-base font-semibold mb-1"
                  style={{ color: "var(--text)" }}
                >
                  {cert.title}
                </h3>
                <p className="text-sm mb-1" style={{ color: "var(--muted-light)" }}>
                  {cert.institution}
                </p>
                <p className="text-xs" style={{ color: "var(--muted)" }}>
                  {cert.meta}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
