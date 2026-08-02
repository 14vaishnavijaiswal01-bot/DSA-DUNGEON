import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export function HealthBar({
  value,
  max,
  label,
  variant = "enemy",
}: {
  value: number;
  max: number;
  label: string;
  variant?: "enemy" | "player";
}) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  return (
    <div>
      <div className="flex items-center justify-between text-xs font-semibold">
        <span>{label}</span>
        <span className="text-muted-foreground">
          {value} / {max}
        </span>
      </div>
      <div className="mt-1.5 h-3 w-full overflow-hidden rounded-full border border-border bg-background/70">
        <motion.div
          initial={{ width: "100%" }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className={cn(
            "h-full rounded-full",
            variant === "enemy" ? "bg-destructive" : "bg-success",
          )}
        />
      </div>
    </div>
  );
}
