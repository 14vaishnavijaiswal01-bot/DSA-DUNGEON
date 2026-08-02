import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Swords } from "lucide-react";
import logo from "@/assets/logo.png";
import { Particles } from "@/components/ui/particles";
import { Button } from "@/components/ui/game-button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DSA Dungeon — Master DSA. One Dungeon at a Time." },
      {
        name: "description",
        content:
          "Enter DSA Dungeon: an RPG adventure where you level up by defeating data structure and algorithm challenges.",
      },
      { property: "og:title", content: "DSA Dungeon — Master DSA. One Dungeon at a Time." },
      {
        property: "og:description",
        content: "An RPG coding adventure for mastering data structures and algorithms.",
      },
    ],
  }),
  component: Splash,
});

function Splash() {
  return (
    <main className="hero-glow relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background px-6 text-center">
      <Particles count={34} />
      <div className="rune-grid pointer-events-none absolute inset-0 opacity-60" />

      <motion.img
        src={logo}
        alt="DSA Dungeon emblem"
        width={200}
        height={200}
        initial={{ opacity: 0, scale: 0.7, rotate: -8 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="relative h-36 w-36 drop-shadow-[0_0_60px_color-mix(in_oklab,var(--secondary)_65%,transparent)] sm:h-48 sm:w-48"
      />

      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.7 }}
        className="relative mt-8 font-display text-5xl font-black tracking-tight sm:text-7xl"
      >
        DSA <span className="text-gradient">Dungeon</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45, duration: 0.7 }}
        className="relative mt-4 max-w-md text-base text-muted-foreground sm:text-lg"
      >
        Master DSA. One Dungeon at a Time.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.7, duration: 0.6 }}
        className="relative mt-10"
      >
        <Button size="lg" asChild className="animate-pulse-glow">
          <Link to="/login">
            <Swords className="h-5 w-5" />
            Enter the Dungeon
          </Link>
        </Button>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
        className="relative mt-6 text-xs uppercase tracking-[0.3em] text-muted-foreground"
      >
        11 Worlds · 55 Trials · Infinite Glory
      </motion.p>
    </main>
  );
}
