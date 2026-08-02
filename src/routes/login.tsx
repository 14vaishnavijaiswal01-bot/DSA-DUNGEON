import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Mail, Lock } from "lucide-react";
import { Particles } from "@/components/ui/particles";
import { Button } from "@/components/ui/game-button";
import { Logo } from "@/components/ui/logo";
import heroImg from "@/assets/hero.jpg";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign In — DSA Dungeon" },
      { name: "description", content: "Return to your adventure and continue your DSA quest." },
      { property: "og:title", content: "Sign In — DSA Dungeon" },
      { property: "og:description", content: "Return to your adventure in DSA Dungeon." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();

  return (
    <main className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden overflow-hidden lg:block">
        <img
          src={heroImg}
          alt="Adventurer at the glowing dungeon gate"
          width={1536}
          height={896}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/60 to-background" />
        <div className="absolute bottom-12 left-12 max-w-sm">
          <h2 className="font-display text-3xl font-bold">The gate remembers you.</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Every problem you solved is still carved into the walls. Pick up where you fell.
          </p>
        </div>
      </div>

      <div className="hero-glow relative flex items-center justify-center overflow-hidden px-6 py-14">
        <Particles count={16} />
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass relative w-full max-w-md rounded-2xl p-8"
        >
          <Logo to="/" size={38} />
          <h1 className="mt-7 font-display text-3xl font-bold">Welcome back</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Sign in to resume your run through the realm.
          </p>

          <form
            className="mt-7 space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              navigate({ to: "/onboarding/welcome" });
            }}
          >
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

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 text-muted-foreground">
                <input type="checkbox" className="accent-[var(--primary)]" />
                Remember me
              </label>
              <button type="button" className="font-semibold text-accent hover:underline">
                Forgot password?
              </button>
            </div>

            <Button type="submit" size="lg" className="w-full">
              Sign In
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
            <GoogleMark /> Continue with Google
          </Button>

          <p className="mt-7 text-center text-sm text-muted-foreground">
            New to the realm?{" "}
            <Link to="/signup" className="font-semibold text-accent hover:underline">
              Create an account
            </Link>
          </p>
        </motion.div>
      </div>
    </main>
  );
}

export function Field({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
      <span className="mt-1.5 flex items-center gap-3 rounded-xl border border-input bg-background/50 px-4 py-3 transition-colors focus-within:border-primary/70">
        <span className="text-muted-foreground">{icon}</span>
        {children}
      </span>
    </label>
  );
}

export function GoogleMark() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
      <path
        fill="#EA4335"
        d="M12 10.2v3.9h5.5c-.24 1.4-1.7 4.1-5.5 4.1a6.2 6.2 0 1 1 0-12.4c1.9 0 3.2.8 4 1.5l2.7-2.6C17 3 14.7 2 12 2a10 10 0 1 0 0 20c5.8 0 9.6-4 9.6-9.7 0-.65-.07-1.15-.16-1.65H12z"
      />
    </svg>
  );
}
