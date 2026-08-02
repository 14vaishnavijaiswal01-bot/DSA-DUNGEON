import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Lock } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { achievements } from "@/data/meta";
import { stagger, slideUp } from "@/lib/motion";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/achievements")({
  head: () => ({
    meta: [
      { title: "Achievements — DSA Dungeon" },
      { name: "description", content: "Milestones earned across the eleven worlds of the realm." },
      { property: "og:title", content: "Achievements — DSA Dungeon" },
      { property: "og:description", content: "Milestones earned across the realm." },
    ],
  }),
  component: AchievementsPage,
});

function AchievementsPage() {
  const unlocked = achievements.filter((a) => a.unlocked).length;

  return (
    <AppShell>
      <h1 className="font-display text-3xl font-black">Achievements</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        {unlocked} of {achievements.length} claimed.
      </p>

      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {achievements.map((a) => (
          <motion.div
            key={a.id}
            variants={slideUp}
            whileHover={{ y: -6 }}
            className={cn(
              "glass relative rounded-2xl p-6",
              a.unlocked
                ? "border-accent/60 shadow-[var(--shadow-glow-accent)]"
                : "opacity-50 grayscale",
            )}
          >
            <span className="text-4xl">{a.icon}</span>
            <h2 className="mt-4 text-lg font-bold">{a.name}</h2>
            <p className="mt-1.5 text-sm text-muted-foreground">{a.description}</p>
            {!a.unlocked && (
              <Lock className="absolute right-5 top-5 h-4 w-4 text-muted-foreground" />
            )}
          </motion.div>
        ))}
      </motion.div>
    </AppShell>
  );
}
