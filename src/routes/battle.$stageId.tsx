import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Swords, Coins, Sparkles, ArrowLeft } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/game-button";
import { HealthBar } from "@/components/game/health-bar";
import { findStage, characters, type Stage, type World } from "@/data/game";
import { useGame } from "@/context/GameContext";
import dungeonBg from "@/assets/dungeon-bg.jpg";

export const Route = createFileRoute("/battle/$stageId")({
  loader: ({ params }) => {
    const found = findStage(params.stageId);
    if (!found) throw notFound();
    return found;
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Battle — DSA Dungeon" }, { name: "robots", content: "noindex" }] };
    }
    const title = `${loaderData.stage.enemy} — ${loaderData.world.name}`;
    return {
      meta: [
        { title: `${title} — DSA Dungeon` },
        { name: "description", content: `Face ${loaderData.stage.enemy} in ${loaderData.world.name}.` },
        { property: "og:title", content: `${title} — DSA Dungeon` },
        { property: "og:description", content: `Face ${loaderData.stage.enemy} in battle.` },
      ],
    };
  },
  component: BattlePage,
});

function BattlePage() {
  const { world, stage } = Route.useLoaderData() as { world: World; stage: Stage };
  const { state } = useGame();
  const navigate = useNavigate();
  const hero = characters.find((c) => c.id === state.characterId) ?? characters[0]!;

  return (
    <AppShell>
      <Button variant="ghost" size="sm" asChild className="mb-4">
        <Link to="/map/$worldId" params={{ worldId: world.id }}>
          <ArrowLeft className="h-4 w-4" /> Back to {world.name}
        </Link>
      </Button>

      <div className="relative overflow-hidden rounded-3xl border border-border">
        <img
          src={dungeonBg}
          alt="Dungeon battle arena"
          loading="lazy"
          width={1536}
          height={896}
          className="h-[320px] w-full object-cover sm:h-[420px]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-background/20" />

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute inset-x-0 top-8 mx-auto w-full max-w-md px-6 text-center"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-accent">
            Stage {stage.index} · {stage.title}
          </p>
          <h1 className="mt-2 font-display text-3xl font-black drop-shadow-lg sm:text-5xl">
            {stage.enemy}
          </h1>
          <div className="mt-5">
            <HealthBar value={stage.enemyHp} max={stage.enemyHp} label="Enemy HP" />
          </div>
        </motion.div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="glass rounded-2xl p-6">
          <div className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-4">
            <img
              src={hero.image}
              alt={hero.name}
              loading="lazy"
              width={64}
              height={64}
              className="h-16 w-16 shrink-0 rounded-2xl object-cover ring-2 ring-primary/60"
            />
            <div className="min-w-0">
              <p className="truncate font-bold">{state.username}</p>
              <p className="text-xs text-muted-foreground">{hero.title}</p>
            </div>
          </div>
          <div className="mt-5">
            <HealthBar value={100} max={100} label="Your HP" variant="player" />
          </div>
          <Button
            size="lg"
            className="mt-6 w-full sm:w-auto"
            onClick={() => navigate({ to: "/challenge/$stageId", params: { stageId: stage.id } })}
          >
            <Swords className="h-4 w-4" /> Start Battle
          </Button>
        </div>

        <div className="glass rounded-2xl p-6">
          <p className="text-xs uppercase tracking-widest text-accent">Rewards</p>
          <div className="mt-4 space-y-3">
            <Reward icon={<Sparkles className="h-4 w-4 text-primary" />} label="XP" value={stage.xp} />
            <Reward icon={<Coins className="h-4 w-4 text-accent" />} label="Coins" value={stage.coins} />
          </div>
          <p className="mt-5 text-xs text-muted-foreground">
            Defeat the enemy by submitting a working solution to its challenge.
          </p>
        </div>
      </div>
    </AppShell>
  );
}

function Reward({ icon, label, value }: { icon: React.ReactNode; label: string; value: number }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-border bg-background/40 px-4 py-3">
      <span className="flex items-center gap-2 text-sm">{icon} {label}</span>
      <span className="font-bold">+{value}</span>
    </div>
  );
}
