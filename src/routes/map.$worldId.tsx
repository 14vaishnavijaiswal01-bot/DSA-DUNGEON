import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Castle, Check, Lock, Skull, Gem, ArrowLeft } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/game-button";
import { ProgressBar } from "@/components/ui/progress-bar";
import { useGame } from "@/context/GameContext";
import { findWorld } from "@/data/game";
import dungeonBg from "@/assets/dungeon-bg.jpg";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/map/$worldId")({
  loader: ({ params }) => {
    const world = findWorld(params.worldId);
    if (!world) throw notFound();
    return { world };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "World not found — DSA Dungeon" }, { name: "robots", content: "noindex" }],
      };
    }
    const { world } = loaderData;
    return {
      meta: [
        { title: `${world.name} — DSA Dungeon` },
        { name: "description", content: world.blurb },
        { property: "og:title", content: `${world.name} — DSA Dungeon` },
        { property: "og:description", content: world.blurb },
      ],
    };
  },
  component: WorldPage,
});

function WorldPage() {
  const { world } = Route.useLoaderData();
  const { state, isStageUnlocked } = useGame();
  const navigate = useNavigate();

  const cleared = world.stages.filter((s) => state.completedStages.includes(s.id)).length;

  return (
    <AppShell>
      <Button variant="ghost" size="sm" asChild className="mb-4">
        <Link to="/map">
          <ArrowLeft className="h-4 w-4" /> Back to the realm
        </Link>
      </Button>

      <div className="relative overflow-hidden rounded-3xl border border-border">
        <img
          src={dungeonBg}
          alt={`${world.name} dungeon interior`}
          loading="lazy"
          width={1536}
          height={896}
          className="h-56 w-full object-cover sm:h-72"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute bottom-6 left-6 right-6">
          <span className="text-3xl">{world.emoji}</span>
          <h1 className="mt-2 font-display text-3xl font-black sm:text-4xl">{world.name}</h1>
          <p className="mt-1 max-w-xl text-sm text-muted-foreground">{world.blurb}</p>
          <div className="mt-4 flex max-w-sm items-center gap-3">
            <ProgressBar value={cleared} max={world.stages.length} />
            <span className="shrink-0 text-xs font-semibold">
              {cleared}/{world.stages.length}
            </span>
          </div>
        </div>
      </div>

      {/* Path */}
      <div className="relative mt-10">
        <div className="absolute left-6 top-0 h-full w-1 rounded-full bg-muted lg:left-1/2 lg:-translate-x-1/2" />
        <ol className="space-y-6">
          {world.stages.map((stage, i) => {
            const done = state.completedStages.includes(stage.id);
            const unlocked = isStageUnlocked(world.id, stage.index);
            const current = unlocked && !done;
            const Icon =
              stage.type === "boss" ? Castle : stage.type === "treasure" ? Gem : Skull;

            return (
              <motion.li
                key={stage.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className={cn(
                  "relative grid grid-cols-[auto_minmax(0,1fr)] items-center gap-5 lg:grid-cols-2 lg:gap-10",
                  i % 2 === 1 && "lg:[direction:rtl]",
                )}
              >
                <div className="flex justify-start lg:justify-end lg:[direction:ltr]">
                  <span
                    className={cn(
                      "relative z-10 grid h-12 w-12 shrink-0 place-items-center rounded-full border-2 lg:h-14 lg:w-14",
                      done && "border-success bg-success/20 text-success",
                      current && "animate-pulse-glow border-primary bg-primary text-primary-foreground",
                      !done && !current && "border-border bg-muted text-muted-foreground",
                    )}
                  >
                    {done ? (
                      <Check className="h-5 w-5" />
                    ) : unlocked ? (
                      <Icon className="h-5 w-5" />
                    ) : (
                      <Lock className="h-4 w-4" />
                    )}
                  </span>
                </div>

                <div
                  className={cn(
                    "glass rounded-2xl p-5 lg:[direction:ltr]",
                    !unlocked && "opacity-50",
                    current && "border-primary/60",
                  )}
                >
                  <p className="text-xs uppercase tracking-widest text-accent">
                    Stage {stage.index} · {stage.type}
                  </p>
                  <h3 className="mt-1.5 text-lg font-bold">{stage.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Guarded by {stage.enemy} · {stage.xp} XP · {stage.coins} coins
                  </p>
                  <Button
                    size="sm"
                    variant={done ? "outline" : "primary"}
                    disabled={!unlocked}
                    className="mt-4"
                    onClick={() =>
                      navigate({ to: "/battle/$stageId", params: { stageId: stage.id } })
                    }
                  >
                    {done ? "Replay" : unlocked ? "Enter" : "Locked"}
                  </Button>
                </div>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </AppShell>
  );
}
