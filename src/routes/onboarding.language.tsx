import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { OnboardingLayout } from "@/components/layout/OnboardingLayout";
import { LanguageCard } from "@/components/game/cards";
import { Button } from "@/components/ui/game-button";
import { languages } from "@/data/game";
import { useGame } from "@/context/GameContext";

export const Route = createFileRoute("/onboarding/language")({
  head: () => ({
    meta: [
      { title: "Choose Your Weapon — DSA Dungeon" },
      { name: "description", content: "Pick the programming language you will fight with." },
      { property: "og:title", content: "Choose Your Weapon — DSA Dungeon" },
      { property: "og:description", content: "Pick the language you will fight with." },
    ],
  }),
  component: LanguagePage,
});

function LanguagePage() {
  const { state, update } = useGame();
  const navigate = useNavigate();

  return (
    <OnboardingLayout
      step={1}
      title="Choose Your Weapon"
      subtitle="Every language cuts differently. Pick the one you want to master — you can reforge it later in Settings."
      footer={
        <Button
          size="lg"
          disabled={!state.languageId}
          onClick={() => navigate({ to: "/onboarding/difficulty" })}
        >
          Continue <ArrowRight className="h-4 w-4" />
        </Button>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {languages.map((language) => (
          <LanguageCard
            key={language.id}
            language={language}
            selected={state.languageId === language.id}
            onSelect={() => update({ languageId: language.id })}
          />
        ))}
      </div>
    </OnboardingLayout>
  );
}
