import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { slideUp } from "@/lib/motion";
import type { Language, Difficulty, Character, World } from "@/data/game";
import { ProgressBar } from "@/components/ui/progress-bar";
import { Lock, Check, Sparkles } from "lucide-react";

export function LanguageCard({
  language,
  selected,
  onSelect,
}: {
  language: Language;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <motion.button
      variants={slideUp}
      type="button"
      onClick={onSelect}
      whileHover={{ y: -6 }}
      className={cn(
        "glass relative w-full rounded-2xl p-5 text-left transition-colors",
        selected ? "border-primary/70 shadow-[var(--shadow-glow)]" : "hover:border-primary/40",
      )}
    >
      {language.popular && (
        <span className="absolute right-4 top-4 rounded-full bg-[image:var(--gradient-accent)] px-2.5 py-1 text-[10px] font-bold text-accent-foreground">
          POPULAR
        </span>
      )}
      <div className="text-4xl">{language.icon}</div>
      <h3 className="mt-3 text-lg font-bold">{language.name}</h3>
      <p className="mt-1.5 text-sm text-muted-foreground">{language.description}</p>
      <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-accent">
        {language.difficulty}
      </p>
      {selected && (
        <span className="absolute bottom-4 right-4 grid h-7 w-7 place-items-center rounded-full bg-primary">
          <Check className="h-4 w-4 text-primary-foreground" />
        </span>
      )}
    </motion.button>
  );
}

export function DifficultyCard({
  difficulty,
  selected,
  onSelect,
  onHover,
}: {
  difficulty: Difficulty;
  selected: boolean;
  onSelect: () => void;
  onHover: () => void;
}) {
  return (
    <motion.button
      variants={slideUp}
      type="button"
      onClick={onSelect}
      onMouseEnter={onHover}
      whileHover={{ y: -6 }}
      className={cn(
        "glass relative w-full overflow-hidden rounded-2xl p-5 text-left",
        selected ? "border-primary/70 shadow-[var(--shadow-glow)]" : "hover:border-primary/40",
      )}
    >
      <div className={cn("absolute inset-0 bg-gradient-to-br opacity-80", difficulty.gradient)} />
      <div className="relative">
        <p className="text-xs font-bold uppercase tracking-widest text-accent">{difficulty.tier}</p>
        <h3 className="mt-2 text-lg font-bold">{difficulty.name}</h3>
        <p className="mt-1.5 text-sm text-muted-foreground">{difficulty.description}</p>
        <p className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-border bg-background/50 px-3 py-1 text-xs font-semibold">
          <Sparkles className="h-3 w-3 text-accent" />
          {difficulty.xpMultiplier}
        </p>
      </div>
    </motion.button>
  );
}

export function CharacterCard({
  character,
  selected,
  onSelect,
}: {
  character: Character;
  selected: boolean;
  onSelect: () => void;
}) {
  const stats = [
    { label: "Strength", value: character.stats.strength },
    { label: "Magic", value: character.stats.magic },
    { label: "Speed", value: character.stats.speed },
    { label: "Difficulty", value: character.stats.difficulty },
  ];
  return (
    <motion.button
      variants={slideUp}
      type="button"
      onClick={onSelect}
      whileHover={{ y: -6 }}
      className={cn(
        "glass w-full overflow-hidden rounded-2xl p-0 text-left",
        selected ? "border-primary/70 shadow-[var(--shadow-glow)]" : "hover:border-primary/40",
      )}
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <img
          src={character.image}
          alt={character.name}
          loading="lazy"
          width={640}
          height={768}
          className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
        <div className="absolute bottom-3 left-4 right-4">
          <h3 className="font-display text-xl font-bold">{character.name}</h3>
          <p className="text-xs text-accent">{character.title}</p>
        </div>
      </div>
      <div className="p-4">
        <p className="text-sm text-muted-foreground">{character.description}</p>
        <div className="mt-4 space-y-2.5">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="flex justify-between text-[11px] text-muted-foreground">
                <span>{s.label}</span>
                <span>{s.value}</span>
              </div>
              <ProgressBar value={s.value} height="h-1.5" className="mt-1" />
            </div>
          ))}
        </div>
      </div>
    </motion.button>
  );
}

export function WorldCard({
  world,
  unlocked,
  current,
  progress,
  onClick,
}: {
  world: World;
  unlocked: boolean;
  current: boolean;
  progress: number;
  onClick: () => void;
}) {
  return (
    <motion.button
      variants={slideUp}
      type="button"
      onClick={onClick}
      disabled={!unlocked}
      whileHover={unlocked ? { y: -6 } : {}}
      className={cn(
        "glass relative w-full rounded-2xl p-5 text-left",
        !unlocked && "opacity-45 grayscale",
        current && "border-primary/70 shadow-[var(--shadow-glow)]",
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <span className="text-3xl">{world.emoji}</span>
        {!unlocked ? (
          <span className="flex items-center gap-1.5 rounded-full border border-border px-2.5 py-1 text-[10px] font-semibold text-muted-foreground">
            <Lock className="h-3 w-3" /> Lv {world.requiredLevel}
          </span>
        ) : current ? (
          <span className="rounded-full bg-primary px-2.5 py-1 text-[10px] font-bold text-primary-foreground">
            CURRENT
          </span>
        ) : progress === 100 ? (
          <span className="rounded-full bg-success px-2.5 py-1 text-[10px] font-bold text-success-foreground">
            CLEARED
          </span>
        ) : null}
      </div>
      <h3 className="mt-3 font-display text-lg font-bold">{world.name}</h3>
      <p className="mt-1.5 line-clamp-2 text-sm text-muted-foreground">{world.blurb}</p>
      <div className="mt-4 flex items-center gap-3">
        <ProgressBar value={progress} height="h-1.5" />
        <span className="shrink-0 text-xs font-semibold text-muted-foreground">{progress}%</span>
      </div>
    </motion.button>
  );
}
