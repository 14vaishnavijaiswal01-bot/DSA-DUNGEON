import { Link, useRouterState } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  LayoutDashboard,
  Map,
  User,
  Backpack,
  Trophy,
  Medal,
  Settings,
  Flame,
  Coins,
  Menu,
  X,
} from "lucide-react";
import { useState, type ReactNode } from "react";
import { Logo } from "@/components/ui/logo";
import { ProgressBar } from "@/components/ui/progress-bar";
import { useGame } from "@/context/GameContext";
import { cn } from "@/lib/utils";
import { characters } from "@/data/game";

const nav = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/map", label: "World Map", icon: Map },
  { to: "/profile", label: "Profile", icon: User },
  { to: "/inventory", label: "Inventory", icon: Backpack },
  { to: "/achievements", label: "Achievements", icon: Trophy },
  { to: "/leaderboard", label: "Leaderboard", icon: Medal },
  { to: "/settings", label: "Settings", icon: Settings },
] as const;

const mobileNav = nav.slice(0, 5);

export function AppShell({ children }: { children: ReactNode }) {
  const { state, level, xpIntoLevel, xpForLevel } = useGame();
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const hero = characters.find((c) => c.id === state.characterId) ?? characters[0]!;

  const isActive = (to: string) => pathname === to || pathname.startsWith(`${to}/`);

  return (
    <div className="hero-glow min-h-screen bg-background">
      <div className="rune-grid min-h-screen">
        {/* Sidebar */}
        <aside
          className={cn(
            "fixed inset-y-0 left-0 z-50 w-[264px] border-r border-border bg-sidebar/85 backdrop-blur-xl transition-transform duration-300 lg:translate-x-0",
            open ? "translate-x-0" : "-translate-x-full",
          )}
        >
          <div className="flex h-16 items-center justify-between px-5">
            <Logo size={34} />
            <button
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="text-muted-foreground lg:hidden"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="mt-2 flex flex-col gap-1 px-3">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className={cn(
                  "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all",
                  isActive(item.to)
                    ? "bg-[image:var(--gradient-primary)] text-primary-foreground shadow-[var(--shadow-glow)]"
                    : "text-muted-foreground hover:bg-card/70 hover:text-foreground",
                )}
              >
                <item.icon className="h-4.5 w-4.5 shrink-0" />
                <span className="truncate">{item.label}</span>
              </Link>
            ))}
          </nav>

          <div className="absolute inset-x-3 bottom-4 rounded-2xl border border-border bg-card/70 p-4">
            <div className="flex min-w-0 items-center gap-3">
              <img
                src={hero.image}
                alt={hero.name}
                loading="lazy"
                width={40}
                height={40}
                className="h-10 w-10 shrink-0 rounded-full object-cover ring-2 ring-primary/60"
              />
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">{state.username}</p>
                <p className="text-xs text-muted-foreground">Level {level}</p>
              </div>
            </div>
            <ProgressBar value={xpIntoLevel} max={xpForLevel} className="mt-3" height="h-1.5" />
          </div>
        </aside>

        {open && (
          <div
            className="fixed inset-0 z-40 bg-background/70 backdrop-blur-sm lg:hidden"
            onClick={() => setOpen(false)}
          />
        )}

        <div className="lg:pl-[264px]">
          {/* Topbar */}
          <header className="sticky top-0 z-30 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-border bg-background/70 px-4 py-3 backdrop-blur-xl sm:px-6">
            <div className="flex min-w-0 items-center gap-3">
              <button
                aria-label="Open menu"
                onClick={() => setOpen(true)}
                className="rounded-lg border border-border p-2 text-muted-foreground lg:hidden"
              >
                <Menu className="h-4 w-4" />
              </button>
              <div className="min-w-0">
                <p className="truncate font-display text-sm font-bold sm:text-base">
                  {nav.find((n) => isActive(n.to))?.label ?? "Dungeon"}
                </p>
                <p className="hidden text-xs text-muted-foreground sm:block">
                  Level {level} · {state.solved} problems slain
                </p>
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-2 sm:gap-3">
              <Stat icon={<Flame className="h-3.5 w-3.5 text-accent" />} value={state.streak} />
              <Stat icon={<Coins className="h-3.5 w-3.5 text-accent" />} value={state.coins} />
              <img
                src={hero.image}
                alt={hero.name}
                loading="lazy"
                width={36}
                height={36}
                className="h-9 w-9 rounded-full object-cover ring-2 ring-primary/60"
              />
            </div>
          </header>

          <motion.main
            key={pathname}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto w-full max-w-7xl px-4 pb-28 pt-6 sm:px-6 lg:pb-12"
          >
            {children}
          </motion.main>
        </div>

        {/* Mobile bottom nav */}
        <nav className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-5 border-t border-border bg-background/90 backdrop-blur-xl lg:hidden">
          {mobileNav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "flex flex-col items-center gap-1 py-2.5 text-[10px] font-medium transition-colors",
                isActive(item.to) ? "text-primary" : "text-muted-foreground",
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.label.split(" ")[0]}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}

function Stat({ icon, value }: { icon: ReactNode; value: number }) {
  return (
    <span className="flex items-center gap-1.5 rounded-full border border-border bg-card/70 px-2.5 py-1.5 text-xs font-semibold">
      {icon}
      {value.toLocaleString()}
    </span>
  );
}
