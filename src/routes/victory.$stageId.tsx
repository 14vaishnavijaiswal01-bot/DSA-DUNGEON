import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { motion } from "motion/react";
import { Sparkles, Coins, ArrowRight } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/game-button";
import { ProgressBar } from "@/components/ui/progress-bar";
import { Particles } from "@/components/ui/particles";
import { findStage, type Stage, type World } from "@/data/game";
import { useGame } from "@/context/GameContext";

export const Route = createFileRoute("/victory/$stageId")({
  loader: ({ params }) => {
    const found = findStage(params.stageId);
    if (!found) throw notFound();
    return found;
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Victory — DSA Dungeon" }, { name: "robots", content: "noindex" }] };
    }
    return {
      meta: [
        { title: `Victory over ${loaderData.stage.enemy} — DSA Dungeon` },
        { name: "description", content: `You defeated ${loaderData.stage.enemy} and claimed the rewards.` },
        { property: "og:title", content: `Victory over ${loaderData.stage.enemy} — DSA Dungeon` },
        { property: "og:description", content: "Another enemy falls to a working solution." },
      ],
    };
  },
  component: VictoryPage,
});

function VictoryPage() {
  const { world, stage } = Route.useLoaderData() as { world: World; stage: Stage };
  const { completeStage, level, xpIntoLevel, xpForLevel, nextStageId } = useGame();
  const navigate = useNavigate();

  useEffect(() => {
    completeStage(stage.id, stage.xp, stage.coins);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage.id]);

  return (
    <AppShell>
      <div className="relative overflow-hidden rounded-3xl border border-border p-8 text-center sm:p-14">
        <Particles count={26} />
        <motion.div
          initial={{ scale: 0.5, opacity: 0, rotate: -12 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 14 }}
          className="relative mx-auto grid h-24 w-24 place-items-center rounded-full bg-[image:var(--gradient-accent)] text-4xl shadow-[var(--shadow-glow-accent)]"
        >
          🏆
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative mt-7 font-display text-4xl font-black sm:text-5xl"
        >
          Victory!
        </motion.h1>
        <p className="relative mt-3 text-muted-foreground">
          {stage.enemy} has fallen in {world.name}.
        </p>

        <div className="relative mx-auto mt-8 grid max-w-md gap-3 sm:grid-cols-2">
          <RewardTile icon={<Sparkles className="h-4 w-4 text-primary" />} label="XP Earned" value={stage.xp} />
          <RewardTile icon={<Coins className="h-4 w-4 text-accent" />} label="Coins Earned" value={stage.coins} />
        </div>

        <div className="relative mx-auto mt-8 max-w-md text-left">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Level {level}</span>
            <span>
              {xpIntoLevel}/{xpForLevel} XP
            </span>
          </div>
          <ProgressBar value={xpIntoLevel} max={xpForLevel} className="mt-2" />
        </div>

        <div className="relative mt-9 flex flex-wrap justify-center gap-3">
          <Button
            size="lg"
            onClick={() => navigate({ to: "/battle/$stageId", params: { stageId: nextStageId() } })}
          >
            Next Battle <ArrowRight className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link to="/map/$worldId" params={{ worldId: world.id }}>
              Back to {world.name}
            </Link>
          </Button>
        </div>
      </div>
    </AppShell>
  );
}

function RewardTile({ icon, label, value }: { icon: React.ReactNode; label: string; value: number }) {
  return (
    <div className="glass rounded-2xl p-5">
      <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
        {icon} {label}
      </div>
      <p className="mt-2 text-3xl font-black">+{value}</p>
    </div>
  );
}
