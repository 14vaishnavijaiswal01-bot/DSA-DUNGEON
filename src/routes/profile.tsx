import { createFileRoute, Link } from "@tanstack/react-router";
import { Pencil } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { GlassCard } from "@/components/ui/glass-card";
import { ProgressBar } from "@/components/ui/progress-bar";
import { Button } from "@/components/ui/game-button";
import { useGame } from "@/context/GameContext";
import { characters, languages, difficulties } from "@/data/game";
import { achievements } from "@/data/meta";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Profile — DSA Dungeon" },
      { name: "description", content: "Your adventurer sheet: level, XP, loadout and statistics." },
      { property: "og:title", content: "Profile — DSA Dungeon" },
      { property: "og:description", content: "Your adventurer sheet and statistics." },
    ],
  }),
  component: ProfilePage,
});

function ProfilePage() {
  const { state, level, xpIntoLevel, xpForLevel } = useGame();
  const hero = characters.find((c) => c.id === state.characterId) ?? characters[0]!;
  const language = languages.find((l) => l.id === state.languageId) ?? languages[0]!;
  const difficulty = difficulties.find((d) => d.id === state.difficultyId) ?? difficulties[0]!;

  return (
    <AppShell>
      <div className="grid gap-4 lg:grid-cols-[340px_minmax(0,1fr)]">
        <GlassCard className="text-center">
          <img
            src={hero.image}
            alt={hero.name}
            loading="lazy"
            width={160}
            height={160}
            className="mx-auto h-32 w-32 rounded-full object-cover ring-4 ring-primary/50"
          />
          <h1 className="mt-5 font-display text-2xl font-black">{state.username}</h1>
          <p className="text-sm text-accent">{hero.title}</p>
          <div className="mt-5 text-left">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Level {level}</span>
              <span>{state.xp.toLocaleString()} XP</span>
            </div>
            <ProgressBar value={xpIntoLevel} max={xpForLevel} className="mt-2" />
          </div>
          <div className="mt-5 grid grid-cols-2 gap-3 text-left">
            <Info label="Language" value={`${language.icon} ${language.name}`} />
            <Info label="Difficulty" value={difficulty.tier} />
            <Info label="Coins" value={state.coins.toLocaleString()} />
            <Info label="Streak" value={`${state.streak} days`} />
          </div>
          <Button variant="outline" className="mt-6 w-full" asChild>
            <Link to="/settings">
              <Pencil className="h-4 w-4" /> Edit Profile
            </Link>
          </Button>
        </GlassCard>

        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-3">
            <GlassCard>
              <p className="text-xs text-muted-foreground">Accuracy</p>
              <p className="mt-2 text-3xl font-black">{state.accuracy}%</p>
            </GlassCard>
            <GlassCard>
              <p className="text-xs text-muted-foreground">Questions Solved</p>
              <p className="mt-2 text-3xl font-black">{state.solved}</p>
            </GlassCard>
            <GlassCard>
              <p className="text-xs text-muted-foreground">Current Streak</p>
              <p className="mt-2 text-3xl font-black">{state.streak}d</p>
            </GlassCard>
          </div>

          <GlassCard>
            <p className="text-xs uppercase tracking-widest text-accent">Achievements</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {achievements.map((a) => (
                <div
                  key={a.id}
                  className={
                    a.unlocked
                      ? "rounded-xl border border-accent/50 bg-accent/10 p-4 shadow-[var(--shadow-glow-accent)]"
                      : "rounded-xl border border-border bg-background/40 p-4 opacity-45"
                  }
                >
                  <span className="text-2xl">{a.icon}</span>
                  <p className="mt-2 text-sm font-bold">{a.name}</p>
                  <p className="text-xs text-muted-foreground">{a.description}</p>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </AppShell>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-background/40 p-3">
      <p className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</p>
      <p className="mt-1 truncate text-sm font-semibold">{value}</p>
    </div>
  );
}
