import { motion } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function GlassCard({
  children,
  className,
  interactive = false,
  glow = false,
  onClick,
}: {
  children: ReactNode;
  className?: string;
  interactive?: boolean;
  glow?: boolean;
  onClick?: () => void;
}) {
  return (
    <motion.div
      {...(onClick ? { onClick } : {})}
      {...(interactive ? { whileHover: { y: -6 } } : {})}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className={cn(
        "glass rounded-2xl p-5",
        interactive && "cursor-pointer hover:border-primary/50",
        glow && "border-primary/60 shadow-[var(--shadow-glow)]",
        className,
      )}
    >
      {children}
    </motion.div>
  );
}
