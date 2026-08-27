"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const categories = [
  {
    title: "Backend",
    skills: [
      { name: "Python",          level: 85 },
      { name: "Django",          level: 80 },
      { name: "SQL / PostgreSQL", level: 80 },
      { name: "Power BI",        level: 75 },
      { name: "Microsoft Azure (Fundamentos)", level: 55 },
    ],
  },
  {
    title: "Frontend (en aprendizaje activo)",
    skills: [
      { name: "HTML5 / CSS3 / JavaScript", level: 75 },
      { name: "React",           level: 55 },
      { name: "Next.js",         level: 55 },
      { name: "Tailwind CSS",    level: 60 },
      { name: "Framer Motion",   level: 50 },
    ],
  },
  {
    title: "Automatización & Gestión",
    skills: [
      { name: "Automatización (CRM & Chatbots)", level: 80 },
      { name: "Ingeniería de Prompts / IA", level: 75 },
      { name: "Git & GitHub",    level: 80 },
      { name: "Scrum / Kanban",  level: 75 },
      { name: "Google Workspace", level: 80 },
    ],
  },
];

const techPills = [
  "Python", "Django", "SQL", "PostgreSQL",
  "Power BI", "Microsoft Azure", "HTML5", "CSS3",
  "JavaScript", "React", "Next.js", "Tailwind CSS",
  "Automatización", "Chatbots", "Prompt Engineering", "Git & GitHub",
];

const vp = { once: true, amount: 0.15 };

function SkillBar({ name, level, delay }: { name: string; level: number; delay: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="space-y-1.5">
      <div className="flex justify-between text-sm">
        <span style={{ color: "var(--text)" }}>{name}</span>
        <span style={{ color: "var(--muted)" }}>{level}%</span>
      </div>
      <div
        className="h-1.5 rounded-full overflow-hidden"
        style={{ background: "rgba(255,255,255,0.06)" }}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : {}}
          transition={{ duration: 1.1, delay, ease: [0.22, 1, 0.36, 1] }}
          className="h-full rounded-full"
          style={{
            background: "linear-gradient(90deg, var(--accent) 0%, var(--accent-light) 100%)",
          }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="py-32 px-6">
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
            02. Habilidades
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

        {/* ── Título: blur fade ── */}
        <motion.h2
          initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={vp}
          transition={{ duration: 0.65, delay: 0.05, ease: "easeOut" }}
          className="text-4xl sm:text-5xl font-bold mb-4"
        >
          Mi <span className="gradient-text">stack tecnológico</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={vp}
          transition={{ duration: 0.55, delay: 0.15, ease: "easeOut" }}
          className="mb-16 max-w-lg"
          style={{ color: "var(--muted-light)" }}
        >
          Base sólida en Python y backend, más un frontend moderno (React/Next.js)
          que estoy desarrollando activamente — como este mismo sitio.
        </motion.p>

        {/* ── Cards con efecto 3D flip de perspectiva ── */}
        <div className="grid md:grid-cols-3 gap-6 mb-16" style={{ perspective: "1000px" }}>
          {categories.map((cat, ci) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 50, rotateX: -14 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={vp}
              transition={{
                duration: 0.7,
                delay: 0.1 + ci * 0.14,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{ transformStyle: "preserve-3d" }}
              className="glow-card rounded-2xl p-6 space-y-5"
            >
              <h3
                className="font-semibold text-sm uppercase tracking-widest"
                style={{ color: "var(--accent-light)" }}
              >
                {cat.title}
              </h3>
              <div className="space-y-4">
                {cat.skills.map((skill, si) => (
                  <SkillBar
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                    delay={0.3 + ci * 0.1 + si * 0.07}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Pills: ola de izquierda a derecha ── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={vp}
          variants={{
            visible: { transition: { staggerChildren: 0.04, delayChildren: 0.1 } },
          }}
          className="flex flex-wrap gap-2"
        >
          {techPills.map((tech) => (
            <motion.span
              key={tech}
              variants={{
                hidden:  { opacity: 0, y: 16, scale: 0.85 },
                visible: { opacity: 1, y: 0,  scale: 1 },
              }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-200 cursor-default"
              style={{
                border: "1px solid var(--border)",
                color: "var(--muted-light)",
                background: "var(--surface)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(124,58,237,0.4)";
                (e.currentTarget as HTMLElement).style.color = "var(--accent-light)";
                (e.currentTarget as HTMLElement).style.background = "var(--accent-dim)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                (e.currentTarget as HTMLElement).style.color = "var(--muted-light)";
                (e.currentTarget as HTMLElement).style.background = "var(--surface)";
              }}
            >
              {tech}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
