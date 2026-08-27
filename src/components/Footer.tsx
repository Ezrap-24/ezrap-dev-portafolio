"use client";

export default function Footer() {
  return (
    <footer className="py-10 px-6 text-center" style={{ borderTop: "1px solid var(--border)" }}>
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="text-sm font-semibold tracking-widest uppercase" style={{ color: "var(--text)" }}>
          ezra<span style={{ color: "var(--accent-light)" }}>p</span>.dev
        </span>
        <p className="text-xs" style={{ color: "var(--muted)" }}>
          © {new Date().getFullYear()} Ezra Torres — Construido con Next.js & Framer Motion
        </p>
        <a
          href="#hero"
          className="text-xs transition-colors duration-200"
          style={{ color: "var(--muted)" }}
          onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "var(--accent-light)")}
          onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "var(--muted)")}
        >
          Volver arriba ↑
        </a>
      </div>
    </footer>
  );
}
