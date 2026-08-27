"use client";

import { motion } from "framer-motion";
import { ExternalLink, ArrowUpRight } from "lucide-react";
import { GithubIcon } from "./SocialIcons";

const projects = [
  {
    number: "01",
    title: "Puro Tabaco",
    description:
      "Tienda online con catálogo de productos, carrito de compras, pago seguro con tarjeta y despacho a todo Chile en menos de 24 horas.",
    tags: ["Python", "E-commerce", "Pagos online", "Despacho"],
    github: "https://github.com/Ezrap-24/E-tabaco",
    live: "https://www.purotabaco.cl/",
  },
  {
    number: "02",
    title: "Necsa Constructora",
    description:
      "Sitio corporativo para constructora de ingeniería en acero, presentando sus servicios de acompañamiento integral desde el diseño del proyecto hasta su materialización en obra.",
    tags: ["HTML", "CSS", "Landing Page", "Corporativo"],
    github: "https://github.com/Ezrap-24/pagina-web-necsa",
    live: "https://constructoranecsa.cl/",
  },
  {
    number: "03",
    title: "Inversión Propiedades",
    description:
      "Plataforma de inversión inmobiliaria con múltiples proyectos (Norte y Sur), calculadora financiera y contenido de educación financiera, más un chatbot de WhatsApp integrado que automatiza la atención a interesados.",
    tags: ["HTML", "Bienes Raíces", "Automatización", "Chatbot"],
    github: "https://github.com/Ezrap-24/Programa-Patrimonial-Minero",
    live: "https://inversionpropiedades.cl/",
  },
];

const vp = { once: true, amount: 0.15 };

function ProjectCard({ project, index }: { project: (typeof projects)[0]; index: number }) {
  // Columna par (0, 2) entra desde la izquierda, impar (1, 3) desde la derecha
  const isLeft  = index % 2 === 0;
  const xOffset = isLeft ? -55 : 55;
  const rotate  = isLeft ? -1.5 : 1.5;

  return (
    <motion.div
      initial={{ opacity: 0, x: xOffset, rotate, scale: 0.94 }}
      whileInView={{ opacity: 1, x: 0, rotate: 0, scale: 1 }}
      viewport={vp}
      transition={{
        type: "spring",
        stiffness: 160,
        damping: 22,
        delay: 0.05 + (index % 2) * 0.1,
      }}
      className="glow-card rounded-2xl p-6 flex flex-col gap-5 relative overflow-hidden group"
    >
      {/* línea superior al hover */}
      <div
        className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(124,58,237,0.6), transparent)",
        }}
      />

      <div className="flex items-start justify-between">
        <span
          className="text-4xl font-black opacity-10"
          style={{ color: "var(--accent-light)" }}
        >
          {project.number}
        </span>
        <div className="flex items-center gap-2">
          {[
            { href: project.github, Icon: GithubIcon,    label: "GitHub" },
            { href: project.live,   Icon: ExternalLink,  label: "Live"   },
          ].map(({ href, Icon, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200"
              style={{ border: "1px solid var(--border)", color: "var(--muted)" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color = "var(--accent-light)";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(124,58,237,0.4)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color = "var(--muted)";
                (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
              }}
            >
              <Icon size={15} />
            </a>
          ))}
        </div>
      </div>

      <div>
        <h3
          className="text-xl font-semibold mb-2 group-hover:text-white transition-colors duration-200"
          style={{ color: "var(--text)" }}
        >
          {project.title}
        </h3>
        <p className="text-sm leading-relaxed" style={{ color: "var(--muted-light)" }}>
          {project.description}
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mt-auto">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs px-2.5 py-1 rounded-lg"
            style={{
              background: "var(--accent-dim)",
              color: "var(--accent-light)",
              border: "1px solid rgba(124,58,237,0.15)",
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="py-32 px-6">
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
            01. Proyectos
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

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={vp}
            transition={{ duration: 0.65, delay: 0.05, ease: "easeOut" }}
            className="text-4xl sm:text-5xl font-bold"
          >
            Trabajo <span className="gradient-text">destacado</span>
          </motion.h2>

          <motion.a
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={vp}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            href="https://github.com/Ezrap-24"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1.5 text-sm transition-colors duration-200"
            style={{ color: "var(--muted-light)" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.color = "var(--accent-light)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.color = "var(--muted-light)";
            }}
          >
            Ver todos en GitHub
            <ArrowUpRight
              size={16}
              className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </motion.a>
        </div>

        {/* Cards en 2 columnas — animaciones alternadas */}
        <div className="grid sm:grid-cols-2 gap-5">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
