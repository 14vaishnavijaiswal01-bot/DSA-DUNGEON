import { useEffect, useState } from "react";

type Particle = { left: number; size: number; delay: number; duration: number; hue: number };

export function Particles({ count = 26 }: { count?: number }) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: count }, () => ({
        left: Math.random() * 100,
        size: 2 + Math.random() * 5,
        delay: Math.random() * 14,
        duration: 12 + Math.random() * 14,
        hue: Math.random() > 0.6 ? 1 : 0,
      })),
    );
  }, [count]);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p, i) => (
        <span
          key={i}
          className="absolute bottom-[-10vh] rounded-full blur-[1px]"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            background: p.hue ? "var(--accent)" : "var(--secondary)",
            opacity: 0.6,
            animation: `float-up ${p.duration}s linear ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
