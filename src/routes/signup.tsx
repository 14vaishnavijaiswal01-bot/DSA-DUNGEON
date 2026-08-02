import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Mail, Lock, User } from "lucide-react";
import { Particles } from "@/components/ui/particles";
import { Button } from "@/components/ui/game-button";
import { Logo } from "@/components/ui/logo";
import { Field, GoogleMark } from "./login";
import { useGame } from "@/context/GameContext";
import heroImg from "@/assets/hero.jpg";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Create Account — DSA Dungeon" },
      {
        name: "description",
        content: "Forge your adventurer and begin mastering data structures and algorithms.",
      },
      { property: "og:title", content: "Create Account — DSA Dungeon" },
      { property: "og:description", content: "Forge your adventurer and begin the DSA quest." },
    ],
  }),
  component: SignupPage,
});

function SignupPage() {
  const navigate = useNavigate();
  const { update } = useGame();

  return (
    <main className="grid min-h-screen lg:grid-cols-2">
      <div className="hero-glow relative order-2 flex items-center justify-center overflow-hidden px-6 py-14 lg:order-1">
        <Particles count={16} />
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass relative w-full max-w-md rounded-2xl p-8"
        >
          <Logo to="/" size={38} />
          <h1 className="mt-7 font-display text-3xl font-bold">Forge your adventurer</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            A name, a weapon, a destiny. Start with the name.
          </p>

          <form
            className="mt-7 space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              const name = new FormData(e.currentTarget).get("name");
              if (typeof name === "string" && name.trim()) update({ username: name.trim() });
              navigate({ to: "/onboarding/welcome" });
            }}
          >
            <Field icon={<User className="h-4 w-4" />} label="Name">
              <input
                name="name"
                required
                placeholder="Your adventurer name"
                className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground/60"
              />
            </Field>
            <Field icon={<Mail className="h-4 w-4" />} label="Email">
              <input
                type="email"
                required
                placeholder="adventurer@realm.dev"
                className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground/60"
              />
            </Field>
            <Field icon={<Lock className="h-4 w-4" />} label="Password">
              <input
                type="password"
                required
                placeholder="••••••••"
                className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground/60"
              />
            </Field>
            <Field icon={<Lock className="h-4 w-4" />} label="Confirm password">
              <input
                type="password"
                required
                placeholder="••••••••"
                className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground/60"
              />
            </Field>

            <Button type="submit" size="lg" className="w-full">
              Register
            </Button>
          </form>

          <div className="my-6 flex items-center gap-4 text-[11px] uppercase tracking-widest text-muted-foreground">
            <span className="h-px flex-1 bg-border" />
            or
            <span className="h-px flex-1 bg-border" />
          </div>

          <Button
            variant="outline"
            size="lg"
            className="w-full"
            onClick={() => navigate({ to: "/onboarding/welcome" })}
          >
            <GoogleMark /> Sign up with Google
          </Button>

          <p className="mt-7 text-center text-sm text-muted-foreground">
            Already sworn in?{" "}
            <Link to="/login" className="font-semibold text-accent hover:underline">
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>

      <div className="relative order-1 hidden overflow-hidden lg:order-2 lg:block">
        <img
          src={heroImg}
          alt="Adventurer at the glowing dungeon gate"
          width={1536}
          height={896}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-background/60 to-background" />
        <div className="absolute bottom-12 right-12 max-w-sm text-right">
          <h2 className="font-display text-3xl font-bold">Eleven worlds await.</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Arrays to Dynamic Programming, each guarded by a boss that only falls to the optimal
            solution.
          </p>
        </div>
      </div>
    </main>
  );
}
