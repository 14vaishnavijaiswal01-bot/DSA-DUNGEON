import { motion } from "motion/react";
import type { ReactNode } from "react";
import { stagger } from "@/lib/motion";
import { Particles } from "@/components/ui/particles";
import { Logo } from "@/components/ui/logo";

export function OnboardingLayout({
  step,
  title,
  subtitle,
  children,
  footer,
}: {
  step: number;
  title: string;
  subtitle: string;
  children: ReactNode;
  footer: ReactNode;
}) {
  return (
    <main className="hero-glow relative min-h-screen overflow-hidden">
      <Particles count={16} />
      <div className="rune-grid pointer-events-none absolute inset-0 opacity-50" />
      <div className="relative mx-auto max-w-6xl px-5 py-8 sm:px-8">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
          <Logo to="/" size={34} />
          <div className="flex shrink-0 items-center gap-1.5">
            {[1, 2, 3].map((s) => (
              <span
                key={s}
                className={
                  s <= step
                    ? "h-1.5 w-8 rounded-full bg-[image:var(--gradient-primary)]"
                    : "h-1.5 w-8 rounded-full bg-muted"
                }
              />
            ))}
          </div>
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-12 text-center font-display text-4xl font-black sm:text-5xl"
        >
          {title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="mx-auto mt-3 max-w-xl text-center text-sm text-muted-foreground sm:text-base"
        >
          {subtitle}
        </motion.p>

        <motion.div variants={stagger} initial="hidden" animate="show" className="mt-10">
          {children}
        </motion.div>

        <div className="mt-10 flex justify-center pb-10">{footer}</div>
      </div>
    </main>
  );
}
