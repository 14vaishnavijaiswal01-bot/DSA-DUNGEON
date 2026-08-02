import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { OnboardingLayout } from "@/components/layout/OnboardingLayout";
import { CharacterCard } from "@/components/game/cards";
import { Button } from "@/components/ui/game-button";
import { characters } from "@/data/game";
import { useGame } from "@/context/GameContext";

export const Route = createFileRoute("/onboarding/character")({
  head: () => ({
    meta: [
      { title: "Choose Your Hero — DSA Dungeon" },
      { name: "description", content: "Pick the hero who will carry you through the dungeons." },
      { property: "og:title", content: "Choose Your Hero — DSA Dungeon" },
      { property: "og:description", content: "Pick the hero who will carry your run." },
    ],
  }),
  component: CharacterPage,
});

function CharacterPage() {
  const { state, update } = useGame();
  const navigate = useNavigate();

  return (
    <OnboardingLayout
      step={3}
      title="Choose Your Hero"
      subtitle="Each hero bends the rules slightly in your favour. Choose the playstyle that fits you."
      footer={
        <Button
          size="lg"
          disabled={!state.characterId}
          onClick={() => navigate({ to: "/dashboard" })}
        >
          Enter the Realm <ArrowRight className="h-4 w-4" />
        </Button>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {characters.map((character) => (
          <CharacterCard
            key={character.id}
            character={character}
            selected={state.characterId === character.id}
            onSelect={() => update({ characterId: character.id })}
          />
        ))}
      </div>
    </OnboardingLayout>
  );
}
