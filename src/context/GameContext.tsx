import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { worlds } from "@/data/game";

export type GameState = {
  username: string;
  languageId: string | null;
  difficultyId: string | null;
  characterId: string | null;
  xp: number;
  coins: number;
  streak: number;
  solved: number;
  accuracy: number;
  completedStages: string[];
};

const DEFAULT_STATE: GameState = {
  username: "Adventurer",
  languageId: "java",
  difficultyId: "warrior",
  characterId: "warrior",
  xp: 8420,
  coins: 1240,
  streak: 7,
  solved: 128,
  accuracy: 82,
  completedStages: ["arrays-1", "arrays-2", "arrays-3"],
};

const STORAGE_KEY = "dsa-dungeon-state";

type GameContextValue = {
  state: GameState;
  level: number;
  xpIntoLevel: number;
  xpForLevel: number;
  update: (patch: Partial<GameState>) => void;
  completeStage: (stageId: string, xp: number, coins: number) => void;
  isStageUnlocked: (worldId: string, stageIndex: number) => boolean;
  isWorldUnlocked: (worldId: string) => boolean;
  nextStageId: () => string;
  reset: () => void;
};

const GameContext = createContext<GameContextValue | null>(null);

export const XP_PER_LEVEL = 750;

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<GameState>(DEFAULT_STATE);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setState({ ...DEFAULT_STATE, ...(JSON.parse(raw) as Partial<GameState>) });
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* ignore */
    }
  }, [state]);

  const value = useMemo<GameContextValue>(() => {
    const level = Math.max(1, Math.floor(state.xp / XP_PER_LEVEL) + 1);
    const xpIntoLevel = state.xp % XP_PER_LEVEL;

    const isWorldUnlocked = (worldId: string) => {
      const world = worlds.find((w) => w.id === worldId);
      if (!world) return false;
      return level >= world.requiredLevel;
    };

    const isStageUnlocked = (worldId: string, stageIndex: number) => {
      if (stageIndex === 1) return isWorldUnlocked(worldId);
      return state.completedStages.includes(`${worldId}-${stageIndex - 1}`);
    };

    const nextStageId = () => {
      for (const world of worlds) {
        if (!isWorldUnlocked(world.id)) continue;
        for (const stage of world.stages) {
          if (!state.completedStages.includes(stage.id)) return stage.id;
        }
      }
      return "arrays-1";
    };

    return {
      state,
      level,
      xpIntoLevel,
      xpForLevel: XP_PER_LEVEL,
      update: (patch) => setState((prev) => ({ ...prev, ...patch })),
      completeStage: (stageId, xp, coins) =>
        setState((prev) => ({
          ...prev,
          xp: prev.xp + xp,
          coins: prev.coins + coins,
          solved: prev.solved + (prev.completedStages.includes(stageId) ? 0 : 1),
          completedStages: prev.completedStages.includes(stageId)
            ? prev.completedStages
            : [...prev.completedStages, stageId],
        })),
      isStageUnlocked,
      isWorldUnlocked,
      nextStageId,
      reset: () => setState(DEFAULT_STATE),
    };
  }, [state]);

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error("useGame must be used within GameProvider");
  return ctx;
}
