"use client";

import { motion } from "framer-motion";
import { Mail, ArrowRight } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./SocialIcons";

const socials = [
  {
    icon: Mail,
    label: "Email",
    value: "ezraltda89@gmail.com",
    href: "mailto:ezraltda89@gmail.com",
  },
  {
    icon: GithubIcon,
    label: "GitHub",
    value: "github.com/Ezrap-24",
    href: "https://github.com/Ezrap-24",
  },
  {
    icon: LinkedinIcon,
    label: "LinkedIn",
    value: "linkedin.com/in/ezratj",
    href: "https://linkedin.com/in/ezratj",
  },
];

const vp = { once: true, amount: 0.15 };

export default function Contact() {
  return (
    <section id="contact" className="py-32 px-6">
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
            04. Contacto
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

        {/* ── Card principal: scale + fade desde abajo ── */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.93 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={vp}
          transition={{ type: "spring", stiffness: 130, damping: 22, delay: 0.05 }}
          className="glow-card rounded-3xl p-10 sm:p-16 relative overflow-hidden"
        >
          {/* Glow radial de fondo */}
          <div
            className="absolute inset-0 pointer-events-none"
            aria-hidden
            style={{
              background:
                "radial-gradient(ellipse at top center, rgba(124,58,237,0.08) 0%, transparent 60%)",
            }}
          />

          <div className="relative z-10 text-center mb-12">
            {/* Título: blur + fade */}
            <motion.h2
              initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={vp}
              transition={{ duration: 0.65, delay: 0.15, ease: "easeOut" }}
              className="text-4xl sm:text-5xl font-bold mb-5"
            >
              ¿Tienes un proyecto?{" "}
              <span className="gradient-text">Hablemos</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={vp}
              transition={{ duration: 0.55, delay: 0.25, ease: "easeOut" }}
              className="max-w-lg mx-auto leading-relaxed"
              style={{ color: "var(--muted-light)" }}
            >
              Estoy disponible para proyectos freelance, posiciones full-time o
              simplemente para intercambiar ideas. No dudes en escribirme.
            </motion.p>
          </div>

          {/* ── Botón CTA: spring bounce ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={vp}
            transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.3 }}
            className="flex justify-center mb-12"
          >
            <a
              href="mailto:ezraltda89@gmail.com"
              className="group flex items-center gap-3 rounded-2xl px-8 py-4 text-base font-semibold transition-all duration-300"
              style={{
                background: "var(--accent)",
                color: "#fff",
                boxShadow: "0 0 40px rgba(124,58,237,0.35)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "0 0 60px rgba(124,58,237,0.55)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "0 0 40px rgba(124,58,237,0.35)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              }}
            >
              Enviar un mensaje
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </a>
          </motion.div>

          {/* ── Social cards: stagger bounce desde abajo ── */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={vp}
            variants={{
              visible: {
                transition: { staggerChildren: 0.08, delayChildren: 0.35 },
              },
            }}
            className="grid sm:grid-cols-3 gap-4"
          >
            {socials.map(({ icon: Icon, label, value, href }) => (
              <motion.a
                key={label}
                href={href}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                variants={{
                  hidden:  { opacity: 0, y: 28, scale: 0.88 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: { type: "spring", stiffness: 220, damping: 20 },
                  },
                }}
                className="group flex flex-col gap-3 rounded-2xl p-5 transition-all duration-300"
                style={{
                  border: "1px solid var(--border)",
                  background: "var(--surface-2)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor =
                    "rgba(124,58,237,0.4)";
                  (e.currentTarget as HTMLElement).style.background =
                    "rgba(124,58,237,0.06)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                  (e.currentTarget as HTMLElement).style.background = "var(--surface-2)";
                }}
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200"
                  style={{ background: "var(--accent-dim)" }}
                >
                  <Icon size={17} style={{ color: "var(--accent-light)" }} />
                </div>
                <div>
                  <div className="text-xs mb-0.5" style={{ color: "var(--muted)" }}>
                    {label}
                  </div>
                  <div
                    className="text-sm font-medium group-hover:text-white transition-colors duration-200 truncate"
                    style={{ color: "var(--muted-light)" }}
                  >
                    {value}
                  </div>
                </div>
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
