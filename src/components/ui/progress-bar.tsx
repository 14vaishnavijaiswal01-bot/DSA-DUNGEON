import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export function ProgressBar({
  value,
  max = 100,
  className,
  barClassName,
  height = "h-2.5",
}: {
  value: number;
  max?: number;
  className?: string;
  barClassName?: string;
  height?: string;
}) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  return (
    <div className={cn("w-full overflow-hidden rounded-full bg-muted/70", height, className)}>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${pct}%` }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className={cn("h-full rounded-full bg-[image:var(--gradient-primary)]", barClassName)}
      />
    </div>
  );
}
