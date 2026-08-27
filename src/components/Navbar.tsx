"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Inicio", href: "#hero" },
  { label: "Sobre mí", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Certificaciones", href: "#certifications" },
  { label: "Proyectos", href: "#projects" },
  { label: "Contacto", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center px-6 pt-5"
    >
      <nav
        style={{
          background: scrolled
            ? "rgba(7, 7, 15, 0.85)"
            : "rgba(7, 7, 15, 0.5)",
          borderColor: scrolled
            ? "rgba(124, 58, 237, 0.2)"
            : "rgba(255,255,255,0.06)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          transition: "all 0.3s ease",
        }}
        className="flex items-center justify-between gap-8 rounded-2xl border px-6 py-3 w-full max-w-4xl"
      >
        <a href="#hero" className="text-sm font-semibold tracking-widest text-white/90 uppercase">
          ezra<span style={{ color: "var(--accent-light)" }}>p</span>.dev
        </a>

        <ul className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-sm transition-colors duration-200"
                style={{ color: "var(--muted-light)" }}
                onMouseEnter={(e) =>
                  ((e.target as HTMLElement).style.color = "var(--accent-light)")
                }
                onMouseLeave={(e) =>
                  ((e.target as HTMLElement).style.color = "var(--muted-light)")
                }
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="hidden md:inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200"
          style={{
            background: "var(--accent-dim)",
            color: "var(--accent-light)",
            border: "1px solid rgba(124,58,237,0.3)",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.background = "rgba(124,58,237,0.25)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.background = "var(--accent-dim)";
          }}
        >
          Hablemos
        </a>

        <button
          className="md:hidden text-white/60 hover:text-white transition-colors"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-20 left-4 right-4 rounded-2xl border p-4 md:hidden"
            style={{
              background: "rgba(13, 13, 26, 0.97)",
              borderColor: "rgba(124,58,237,0.2)",
              backdropFilter: "blur(20px)",
            }}
          >
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block py-3 px-2 text-sm transition-colors duration-200 rounded-lg"
                style={{ color: "var(--muted-light)" }}
              >
                {l.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
