import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { LogOut } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/game-button";
import { useGame } from "@/context/GameContext";
import { languages, difficulties } from "@/data/game";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings — DSA Dungeon" },
      { name: "description", content: "Adjust your language, difficulty, sound and notifications." },
      { property: "og:title", content: "Settings — DSA Dungeon" },
      { property: "og:description", content: "Adjust language, difficulty, sound and alerts." },
    ],
  }),
  component: SettingsPage,
});

function SettingsPage() {
  const { state, update, reset } = useGame();
  const navigate = useNavigate();
  const [sound, setSound] = useState(true);
  const [notifications, setNotifications] = useState(true);

  return (
    <AppShell>
      <h1 className="font-display text-3xl font-black">Settings</h1>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <GlassCard>
          <p className="text-xs uppercase tracking-widest text-accent">Display Name</p>
          <input
            value={state.username}
            onChange={(e) => update({ username: e.target.value })}
            className="mt-3 w-full rounded-xl border border-input bg-background/50 px-4 py-3 text-sm outline-none focus:border-primary/70"
          />
        </GlassCard>

        <GlassCard>
          <p className="text-xs uppercase tracking-widest text-accent">Theme</p>
          <p className="mt-3 text-sm text-muted-foreground">
            Dark Fantasy is the only theme forged so far — the dungeon does not do daylight.
          </p>
          <span className="mt-4 inline-block rounded-full bg-primary/20 px-3 py-1.5 text-xs font-semibold text-primary">
            Dark Fantasy
          </span>
        </GlassCard>

        <GlassCard>
          <p className="text-xs uppercase tracking-widest text-accent">Language</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {languages.map((l) => (
              <button
                key={l.id}
                onClick={() => update({ languageId: l.id })}
                className={cn(
                  "rounded-full border px-4 py-1.5 text-xs font-semibold",
                  state.languageId === l.id
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border text-muted-foreground hover:text-foreground",
                )}
              >
                {l.icon} {l.name}
              </button>
            ))}
          </div>
        </GlassCard>

        <GlassCard>
          <p className="text-xs uppercase tracking-widest text-accent">Difficulty</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {difficulties.map((d) => (
              <button
                key={d.id}
                onClick={() => update({ difficultyId: d.id })}
                className={cn(
                  "rounded-full border px-4 py-1.5 text-xs font-semibold",
                  state.difficultyId === d.id
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border text-muted-foreground hover:text-foreground",
                )}
              >
                {d.name}
              </button>
            ))}
          </div>
        </GlassCard>

        <GlassCard>
          <p className="text-xs uppercase tracking-widest text-accent">Preferences</p>
          <Toggle label="Notifications" value={notifications} onChange={setNotifications} />
          <Toggle label="Sound effects" value={sound} onChange={setSound} />
        </GlassCard>

        <GlassCard>
          <p className="text-xs uppercase tracking-widest text-accent">Account</p>
          <p className="mt-3 text-sm text-muted-foreground">
            Logging out resets this demo run and returns you to the gate.
          </p>
          <Button
            variant="danger"
            className="mt-4"
            onClick={() => {
              reset();
              navigate({ to: "/" });
            }}
          >
            <LogOut className="h-4 w-4" /> Log Out
          </Button>
        </GlassCard>
      </div>
    </AppShell>
  );
}

function Toggle({
  label,
  value,
  onChange,
}: {
  label: string;
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      onClick={() => onChange(!value)}
      className="mt-4 flex w-full items-center justify-between rounded-xl border border-border bg-background/40 px-4 py-3 text-sm"
    >
      <span>{label}</span>
      <span
        className={cn(
          "relative h-6 w-11 rounded-full transition-colors",
          value ? "bg-primary" : "bg-muted",
        )}
      >
        <span
          className={cn(
            "absolute top-1 h-4 w-4 rounded-full bg-foreground transition-all",
            value ? "left-6" : "left-1",
          )}
        />
      </span>
    </button>
  );
}
