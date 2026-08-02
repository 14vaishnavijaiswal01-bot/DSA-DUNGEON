import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowRight, Map, Swords, Trophy } from "lucide-react";
import heroImg from "@/assets/hero.jpg";
import { Button } from "@/components/ui/game-button";
import { Particles } from "@/components/ui/particles";
import { useGame } from "@/context/GameContext";

export const Route = createFileRoute("/onboarding/welcome")({
  head: () => ({
    meta: [
      { title: "Welcome, Adventurer — DSA Dungeon" },
      {
        name: "description",
        content: "Your induction into the realm of algorithms begins here.",
      },
      { property: "og:title", content: "Welcome, Adventurer — DSA Dungeon" },
      { property: "og:description", content: "Your induction into the realm of algorithms." },
    ],
  }),
  component: WelcomePage,
});

const pillars = [
  { icon: Map, title: "11 Worlds", text: "From Arrays Kingdom to the Dynamic Programming Temple." },
  { icon: Swords, title: "Boss Battles", text: "Every topic ends with a fight you must earn." },
  { icon: Trophy, title: "Real Progress", text: "XP, streaks, loot and leaderboards that track skill." },
];

function WelcomePage() {
  const { state } = useGame();

  return (
    <main className="hero-glow relative min-h-screen overflow-hidden">
      <Particles count={20} />
      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6 py-16 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="w-full overflow-hidden rounded-3xl border border-border"
        >
          <img
            src={heroImg}
            alt="A hooded adventurer before a rune-lit dungeon gate"
            width={1536}
            height={896}
            className="h-[240px] w-full object-cover sm:h-[360px]"
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-10 font-display text-4xl font-black sm:text-6xl"
        >
          Welcome, <span className="text-gradient">{state.username}</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="mt-4 max-w-2xl text-muted-foreground"
        >
          Beyond this gate, every data structure is a kingdom and every algorithm a weapon. Choose
          your language, set your difficulty, pick your hero — then start clearing dungeons.
        </motion.p>

        <div className="mt-10 grid w-full gap-4 sm:grid-cols-3">
          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 + i * 0.1 }}
              className="glass rounded-2xl p-5 text-left"
            >
              <p.icon className="h-5 w-5 text-accent" />
              <h3 className="mt-3 text-base font-bold">{p.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{p.text}</p>
            </motion.div>
          ))}
        </div>

        <Button size="lg" asChild className="mt-10">
          <Link to="/onboarding/language">
            Start Adventure <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </main>
  );
}
