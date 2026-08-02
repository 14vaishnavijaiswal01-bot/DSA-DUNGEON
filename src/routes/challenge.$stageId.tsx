import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Play, Send, RotateCcw, Lightbulb, Timer, X, ArrowLeft } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/game-button";
import { findStage, languages, type Stage, type World } from "@/data/game";
import { getQuestion } from "@/data/questions";
import { useGame } from "@/context/GameContext";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/challenge/$stageId")({
  loader: ({ params }) => {
    const found = findStage(params.stageId);
    if (!found) throw notFound();
    return found;
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Challenge — DSA Dungeon" }, { name: "robots", content: "noindex" }] };
    }
    const q = getQuestion(loaderData.stage.questionId);
    return {
      meta: [
        { title: `${q.title} — DSA Dungeon` },
        { name: "description", content: `Solve ${q.title} to defeat ${loaderData.stage.enemy}.` },
        { property: "og:title", content: `${q.title} — DSA Dungeon` },
        { property: "og:description", content: `A ${q.difficulty} challenge in the dungeon.` },
      ],
    };
  },
  component: ChallengePage,
});

function ChallengePage() {
  const { world, stage } = Route.useLoaderData() as { world: World; stage: Stage };
  const question = getQuestion(stage.questionId);
  const { state } = useGame();
  const navigate = useNavigate();

  const [lang, setLang] = useState(state.languageId ?? "java");
  const [code, setCode] = useState(question.starter[lang] ?? "");
  const [output, setOutput] = useState<string | null>(null);
  const [hintsOpen, setHintsOpen] = useState(false);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    setCode(question.starter[lang] ?? "");
  }, [lang, question]);

  const mmss = `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;

  return (
    <AppShell>
      <div className="mb-4 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
        <Button variant="ghost" size="sm" asChild>
          <Link to="/map/$worldId" params={{ worldId: world.id }}>
            <ArrowLeft className="h-4 w-4" /> Abandon run
          </Link>
        </Button>
        <span className="flex shrink-0 items-center gap-2 rounded-full border border-border bg-card/70 px-3 py-1.5 font-mono text-sm">
          <Timer className="h-4 w-4 text-accent" /> {mmss}
        </span>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {/* Problem */}
        <div className="glass scrollbar-slim max-h-[70vh] overflow-y-auto rounded-2xl p-6">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={cn(
                "rounded-full px-2.5 py-1 text-[10px] font-bold uppercase",
                question.difficulty === "Easy" && "bg-success/20 text-success",
                question.difficulty === "Medium" && "bg-accent/20 text-accent",
                question.difficulty === "Hard" && "bg-destructive/20 text-destructive",
              )}
            >
              {question.difficulty}
            </span>
            <span className="text-xs text-muted-foreground">{world.topic}</span>
          </div>
          <h1 className="mt-3 font-display text-2xl font-bold">{question.title}</h1>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{question.statement}</p>

          <h2 className="mt-6 text-sm font-bold uppercase tracking-widest text-accent">Examples</h2>
          <div className="mt-3 space-y-3">
            {question.examples.map((ex, i) => (
              <div key={i} className="rounded-xl border border-border bg-background/50 p-4 font-mono text-xs">
                <p><span className="text-muted-foreground">Input: </span>{ex.input}</p>
                <p className="mt-1"><span className="text-muted-foreground">Output: </span>{ex.output}</p>
                {ex.explanation && (
                  <p className="mt-1 text-muted-foreground">{ex.explanation}</p>
                )}
              </div>
            ))}
          </div>

          <h2 className="mt-6 text-sm font-bold uppercase tracking-widest text-accent">Constraints</h2>
          <ul className="mt-3 space-y-1.5 font-mono text-xs text-muted-foreground">
            {question.constraints.map((c) => (
              <li key={c}>• {c}</li>
            ))}
          </ul>

          <Button variant="outline" size="sm" className="mt-6" onClick={() => setHintsOpen(true)}>
            <Lightbulb className="h-4 w-4" /> Hints
          </Button>
        </div>

        {/* Editor */}
        <div className="glass flex max-h-[70vh] flex-col overflow-hidden rounded-2xl">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-border p-4">
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value)}
              className="min-w-0 rounded-lg border border-input bg-background/60 px-3 py-2 text-sm outline-none"
            >
              {languages.map((l) => (
                <option key={l.id} value={l.id}>
                  {l.name}
                </option>
              ))}
            </select>
            <Button variant="ghost" size="sm" onClick={() => setCode(question.starter[lang] ?? "")}>
              <RotateCcw className="h-4 w-4" /> Reset
            </Button>
          </div>

          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            spellCheck={false}
            className="scrollbar-slim min-h-[260px] flex-1 resize-none bg-background/60 p-4 font-mono text-[13px] leading-6 text-foreground outline-none"
          />

          <div className="border-t border-border bg-background/70 p-4">
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Console</p>
            <pre className="scrollbar-slim mt-2 max-h-24 overflow-auto whitespace-pre-wrap font-mono text-xs text-muted-foreground">
              {output ?? "// Run your code to see output here."}
            </pre>
          </div>

          <div className="flex flex-wrap gap-3 border-t border-border p-4">
            <Button
              variant="outline"
              onClick={() =>
                setOutput(
                  "Running 3 sample cases...\n✔ Case 1 passed (2ms)\n✔ Case 2 passed (1ms)\n✔ Case 3 passed (2ms)\nAll sample cases passed.",
                )
              }
            >
              <Play className="h-4 w-4" /> Run
            </Button>
            <Button
              onClick={() => navigate({ to: "/victory/$stageId", params: { stageId: stage.id } })}
            >
              <Send className="h-4 w-4" /> Submit
            </Button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {hintsOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 grid place-items-center bg-background/80 p-6 backdrop-blur-sm"
            onClick={() => setHintsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.94, y: 12 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-strong w-full max-w-md rounded-2xl p-6"
            >
              <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
                <h2 className="font-display text-xl font-bold">Whispers from the walls</h2>
                <button aria-label="Close hints" onClick={() => setHintsOpen(false)}>
                  <X className="h-5 w-5 text-muted-foreground" />
                </button>
              </div>
              <ol className="mt-5 space-y-3">
                {question.hints.map((h, i) => (
                  <li key={i} className="rounded-xl border border-border bg-background/50 p-3 text-sm">
                    <span className="mr-2 font-bold text-accent">{i + 1}.</span>
                    {h}
                  </li>
                ))}
              </ol>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AppShell>
  );
}
