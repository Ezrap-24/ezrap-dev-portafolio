"use client";

const WORDS = ["DESARROLLADOR", "CREATIVO"];

// Un bloque = las palabras separadas por un punto decorativo. Se renderiza 2 veces
// por capa para el loop sin costura (translateX 0% -> -50% vía CSS keyframes).
function Block() {
  return (
    <span className="flex shrink-0 items-center">
      {WORDS.map((w) => (
        <span key={w} className="flex items-center">
          <span className="px-6">{w}</span>
          <span aria-hidden style={{ color: "var(--accent)" }}>•</span>
        </span>
      ))}
    </span>
  );
}

const textClass =
  "font-black tracking-tighter uppercase leading-none";

export default function RotatingWords() {
  return (
    <div
      className="relative overflow-hidden w-full"
      style={{ height: "1.2em", fontSize: "clamp(3.75rem, 8vw, 6rem)" }}
      aria-label={`Soy un ${WORDS.join(" y ")}`}
    >
      {/* Capa fantasma (atrás): violeta, blur suave, dirección opuesta, más lenta */}
      <div
        aria-hidden
        className={`marquee-ghost absolute inset-y-0 left-0 flex whitespace-nowrap ${textClass}`}
        style={{
          color: "var(--accent-light)",
          opacity: 0.3,
          zIndex: 1,
        }}
      >
        <Block /><Block /><Block />
      </div>

      {/* Capa sólida (frente) */}
      <div
        aria-hidden
        className={`marquee-solid absolute inset-y-0 left-0 flex whitespace-nowrap ${textClass}`}
        style={{ color: "var(--text)", zIndex: 2 }}
      >
        <Block /><Block /><Block />
      </div>
    </div>
  );
}
