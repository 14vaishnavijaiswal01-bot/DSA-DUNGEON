import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "motion/react";
import { Lock } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { inventory } from "@/data/meta";
import { stagger, slideUp } from "@/lib/motion";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/inventory")({
  head: () => ({
    meta: [
      { title: "Inventory — DSA Dungeon" },
      { name: "description", content: "Weapons, armor, badges and potions earned in the dungeons." },
      { property: "og:title", content: "Inventory — DSA Dungeon" },
      { property: "og:description", content: "Weapons, armor, badges and potions you've earned." },
    ],
  }),
  component: InventoryPage,
});

const filters = ["All", "Weapon", "Armor", "Badge", "Potion"] as const;

function InventoryPage() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const items = inventory.filter((i) => filter === "All" || i.type === filter);

  return (
    <AppShell>
      <h1 className="font-display text-3xl font-black">Inventory</h1>
      <p className="mt-2 text-sm text-muted-foreground">Loot claimed from fallen enemies.</p>

      <div className="mt-6 flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "rounded-full border px-4 py-1.5 text-xs font-semibold transition-colors",
              filter === f
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border text-muted-foreground hover:text-foreground",
            )}
          >
            {f}
          </button>
        ))}
      </div>

      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6"
      >
        {items.map((item) => (
          <motion.div
            key={item.id}
            variants={slideUp}
            whileHover={{ y: -6 }}
            className={cn(
              "glass relative rounded-2xl p-4 text-center",
              !item.unlocked && "opacity-45 grayscale",
              item.rarity === "Legendary" && item.unlocked && "border-accent/60",
            )}
          >
            <span className="text-3xl">{item.icon}</span>
            <p className="mt-3 text-sm font-bold leading-tight">{item.name}</p>
            <p className="mt-1 text-[10px] uppercase tracking-widest text-accent">{item.rarity}</p>
            <p className="text-[10px] text-muted-foreground">{item.type}</p>
            {!item.unlocked && (
              <Lock className="absolute right-3 top-3 h-3.5 w-3.5 text-muted-foreground" />
            )}
          </motion.div>
        ))}
      </motion.div>
    </AppShell>
  );
}
