import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion } from "motion/react";
import { AppShell } from "@/components/layout/AppShell";
import { WorldCard } from "@/components/game/cards";
import { useGame } from "@/context/GameContext";
import { worlds } from "@/data/game";
import { stagger } from "@/lib/motion";

export const Route = createFileRoute("/map/")({
  head: () => ({
    meta: [
      { title: "World Map — DSA Dungeon" },
      {
        name: "description",
        content: "Eleven fantasy worlds, one per DSA topic. Unlock them as you level up.",
      },
      { property: "og:title", content: "World Map — DSA Dungeon" },
      { property: "og:description", content: "Eleven fantasy worlds, one per DSA topic." },
    ],
  }),
  component: WorldMapPage,
});

function WorldMapPage() {
  const { state, isWorldUnlocked, nextStageId } = useGame();
  const navigate = useNavigate();
  const currentWorldId = nextStageId().split("-").slice(0, -1).join("-");

  return (
    <AppShell>
      <div className="mb-8">
        <h1 className="font-display text-3xl font-black sm:text-4xl">The Realm</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Each kingdom guards one topic. Clear its five stages to claim the crown and unlock the
          road onward.
        </p>
      </div>

      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
      >
        {worlds.map((world) => {
          const cleared = world.stages.filter((s) =>
            state.completedStages.includes(s.id),
          ).length;
          return (
            <WorldCard
              key={world.id}
              world={world}
              unlocked={isWorldUnlocked(world.id)}
              current={world.id === currentWorldId}
              progress={Math.round((cleared / world.stages.length) * 100)}
              onClick={() => navigate({ to: "/map/$worldId", params: { worldId: world.id } })}
            />
          );
        })}
      </motion.div>
    </AppShell>
  );
}
