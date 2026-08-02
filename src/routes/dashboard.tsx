import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  Swords,
  Dumbbell,
  Backpack,
  Medal,
  Trophy,
  Target,
  CheckCircle2,
  Flame,
  Map as MapIcon,
  Coins,
} from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { GlassCard } from "@/components/ui/glass-card";
import { ProgressBar } from "@/components/ui/progress-bar";
import { Button } from "@/components/ui/game-button";
import { useGame } from "@/context/GameContext";
import { characters, languages, worlds, findStage } from "@/data/game";
import { dailyQuest, recentActivity, weeklyProgress } from "@/data/meta";
import { stagger, slideUp } from "@/lib/motion";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — DSA Dungeon" },
      {
        name: "description",
        content: "Track your XP, streak, daily quest and dungeon progress in one command center.",
      },
      { property: "og:title", content: "Dashboard — DSA Dungeon" },
      { property: "og:description", content: "Your XP, streak and dungeon progress at a glance." },
    ],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  const { state, level, xpIntoLevel, xpForLevel, nextStageId } = useGame();
  const navigate = useNavigate();
  const hero = characters.find((c) => c.id === state.characterId) ?? characters[0]!;
  const language = languages.find((l) => l.id === state.languageId) ?? languages[0]!;
  const next = findStage(nextStageId());
  const currentWorld = next?.world ?? worlds[0]!;

  const stats = [
    { label: "Questions Solved", value: state.solved, icon: CheckCircle2, tone: "text-success" },
    { label: "Accuracy", value: `${state.accuracy}%`, icon: Target, tone: "text-primary" },
    { label: "Current World", value: currentWorld.topic, icon: MapIcon, tone: "text-secondary" },
    { label: "Longest Streak", value: `${state.streak + 4} days`, icon: Flame, tone: "text-accent" },
  ];

  return (
    <AppShell>
      <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-6">
        {/* Hero row */}
        <motion.div variants={slideUp} className="glass overflow-hidden rounded-2xl">
          <div className="grid gap-6 p-6 lg:grid-cols-[minmax(0,1fr)_320px]">
            <div className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-5">
              <img
                src={hero.image}
                alt={hero.name}
                loading="lazy"
                width={96}
                height={96}
                className="h-20 w-20 shrink-0 rounded-2xl object-cover ring-2 ring-primary/60 sm:h-24 sm:w-24"
              />
              <div className="min-w-0">
                <p className="text-xs uppercase tracking-widest text-accent">{hero.title}</p>
                <h1 className="truncate font-display text-2xl font-black sm:text-3xl">
                  {state.username}
                </h1>
                <p className="mt-1 text-sm text-muted-foreground">
                  {language.icon} {language.name} · Level {level}
                </p>
                <div className="mt-3 flex items-center gap-3">
                  <ProgressBar value={xpIntoLevel} max={xpForLevel} />
                  <span className="shrink-0 text-xs font-semibold text-muted-foreground">
                    {xpIntoLevel}/{xpForLevel} XP
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <MiniStat icon={<Coins className="h-4 w-4 text-accent" />} label="Coins" value={state.coins.toLocaleString()} />
              <MiniStat icon={<Flame className="h-4 w-4 text-accent" />} label="Streak" value={`${state.streak}d`} />
            </div>
          </div>

          <div className="flex flex-wrap gap-3 border-t border-border p-6">
            <Button size="lg" onClick={() => navigate({ to: "/battle/$stageId", params: { stageId: nextStageId() } })}>
              <Swords className="h-4 w-4" /> Continue Adventure
            </Button>
            <Button variant="outline" asChild>
              <Link to="/map">
                <Dumbbell className="h-4 w-4" /> Practice
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/inventory">
                <Backpack className="h-4 w-4" /> Inventory
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/leaderboard">
                <Medal className="h-4 w-4" /> Leaderboard
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/achievements">
                <Trophy className="h-4 w-4" /> Achievements
              </Link>
            </Button>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((s) => (
            <motion.div key={s.label} variants={slideUp}>
              <GlassCard interactive>
                <s.icon className={`h-5 w-5 ${s.tone}`} />
                <p className="mt-3 text-2xl font-black">{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {/* Daily quest */}
          <motion.div variants={slideUp}>
            <GlassCard className="h-full">
              <p className="text-xs uppercase tracking-widest text-accent">Daily Quest</p>
              <h2 className="mt-2 text-lg font-bold">{dailyQuest.title}</h2>
              <div className="mt-4 flex items-center gap-3">
                <ProgressBar
                  value={dailyQuest.progress}
                  max={dailyQuest.goal}
                  barClassName="bg-[image:var(--gradient-accent)]"
                />
                <span className="shrink-0 text-xs font-semibold">
                  {dailyQuest.progress}/{dailyQuest.goal}
                </span>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">Reward: {dailyQuest.reward}</p>
              <Button variant="accent" size="sm" className="mt-5" asChild>
                <Link to="/map/$worldId" params={{ worldId: "strings" }}>
                  Go to Strings Forest
                </Link>
              </Button>
            </GlassCard>
          </motion.div>

          {/* Weekly progress */}
          <motion.div variants={slideUp} className="lg:col-span-2">
            <GlassCard className="h-full">
              <p className="text-xs uppercase tracking-widest text-accent">Weekly Progress</p>
              <h2 className="mt-2 text-lg font-bold">XP earned this week</h2>
              <div className="mt-6 flex h-40 items-end gap-3">
                {weeklyProgress.map((d, i) => (
                  <div key={d.day} className="flex flex-1 flex-col items-center gap-2">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${d.value}%` }}
                      transition={{ delay: 0.1 * i, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                      className="w-full rounded-t-lg bg-[image:var(--gradient-primary)]"
                    />
                    <span className="text-[10px] text-muted-foreground">{d.day}</span>
                  </div>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        </div>

        {/* Recent activity */}
        <motion.div variants={slideUp}>
          <GlassCard>
            <p className="text-xs uppercase tracking-widest text-accent">Recent Activity</p>
            <ul className="mt-4 divide-y divide-border">
              {recentActivity.map((a) => (
                <li key={a.id} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 py-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{a.text}</p>
                    <p className="text-xs text-muted-foreground">{a.time}</p>
                  </div>
                  {a.xp > 0 && (
                    <span className="shrink-0 rounded-full bg-primary/20 px-2.5 py-1 text-xs font-bold text-primary">
                      +{a.xp} XP
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </GlassCard>
        </motion.div>
      </motion.div>
    </AppShell>
  );
}

function MiniStat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border bg-background/40 p-4">
      {icon}
      <p className="mt-2 text-xl font-black">{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  );
}
