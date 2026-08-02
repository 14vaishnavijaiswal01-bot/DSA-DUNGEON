import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { OnboardingLayout } from "@/components/layout/OnboardingLayout";
import { DifficultyCard } from "@/components/game/cards";
import { Button } from "@/components/ui/game-button";
import { difficulties } from "@/data/game";
import { useGame } from "@/context/GameContext";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/onboarding/difficulty")({
  head: () => ({
    meta: [
      { title: "Choose Your Adventure — DSA Dungeon" },
      { name: "description", content: "Set the difficulty tier for your dungeon runs." },
      { property: "og:title", content: "Choose Your Adventure — DSA Dungeon" },
      { property: "og:description", content: "Set the difficulty tier for your runs." },
    ],
  }),
  component: DifficultyPage,
});

function DifficultyPage() {
  const { state, update } = useGame();
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(state.difficultyId ?? "warrior");
  const active = difficulties.find((d) => d.id === hovered) ?? difficulties[0]!;

  return (
    <div className="relative">
      <div
        className={cn(
          "pointer-events-none fixed inset-0 bg-gradient-to-br transition-all duration-700",
          active.gradient,
        )}
      />
      <OnboardingLayout
        step={2}
        title="Choose Your Adventure"
        subtitle="Difficulty changes hint availability, judging strictness and XP multipliers."
        footer={
          <Button
            size="lg"
            disabled={!state.difficultyId}
            onClick={() => navigate({ to: "/onboarding/character" })}
          >
            Continue <ArrowRight className="h-4 w-4" />
          </Button>
        }
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {difficulties.map((difficulty) => (
            <DifficultyCard
              key={difficulty.id}
              difficulty={difficulty}
              selected={state.difficultyId === difficulty.id}
              onSelect={() => update({ difficultyId: difficulty.id })}
              onHover={() => setHovered(difficulty.id)}
            />
          ))}
        </div>
      </OnboardingLayout>
    </div>
  );
}
