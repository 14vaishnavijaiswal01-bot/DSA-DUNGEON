import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { leaderboard } from "@/data/meta";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/leaderboard")({
  head: () => ({
    meta: [
      { title: "Leaderboard — DSA Dungeon" },
      { name: "description", content: "See how you rank globally, among friends and at your college." },
      { property: "og:title", content: "Leaderboard — DSA Dungeon" },
      { property: "og:description", content: "Global, friends and college rankings." },
    ],
  }),
  component: LeaderboardPage,
});

const tabs = [
  { id: "global", label: "Global" },
  { id: "friends", label: "Friends" },
  { id: "college", label: "College" },
] as const;

function LeaderboardPage() {
  const [tab, setTab] = useState<(typeof tabs)[number]["id"]>("global");
  const rows = leaderboard[tab];

  return (
    <AppShell>
      <h1 className="font-display text-3xl font-black">Leaderboard</h1>
      <p className="mt-2 text-sm text-muted-foreground">Glory is measured in XP.</p>

      <div className="mt-6 inline-flex rounded-xl border border-border bg-card/60 p-1">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={cn(
              "rounded-lg px-4 py-2 text-xs font-semibold transition-colors",
              tab === t.id
                ? "bg-[image:var(--gradient-primary)] text-primary-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="glass mt-6 overflow-x-auto rounded-2xl">
        <table className="w-full min-w-[560px] text-left text-sm">
          <thead className="text-[11px] uppercase tracking-widest text-muted-foreground">
            <tr className="border-b border-border">
              <th className="px-5 py-4">Rank</th>
              <th className="px-5 py-4">Player</th>
              <th className="px-5 py-4">Level</th>
              <th className="px-5 py-4">XP</th>
              <th className="px-5 py-4">Solved</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr
                key={r.player}
                className={cn(
                  "border-b border-border/60 last:border-0 transition-colors hover:bg-card/60",
                  r.player === "You" && "bg-primary/10",
                )}
              >
                <td className="px-5 py-4 font-bold">
                  {r.rank <= 3 ? ["🥇", "🥈", "🥉"][r.rank - 1] : `#${r.rank}`}
                </td>
                <td className="px-5 py-4 font-semibold">{r.player}</td>
                <td className="px-5 py-4 text-muted-foreground">{r.level}</td>
                <td className="px-5 py-4 text-muted-foreground">{r.xp.toLocaleString()}</td>
                <td className="px-5 py-4 text-muted-foreground">{r.solved}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AppShell>
  );
}
