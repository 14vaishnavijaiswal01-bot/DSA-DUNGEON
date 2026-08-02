import warriorImg from "@/assets/char-warrior.jpg";
import mageImg from "@/assets/char-mage.jpg";
import archerImg from "@/assets/char-archer.jpg";
import assassinImg from "@/assets/char-assassin.jpg";

export type Language = {
  id: string;
  name: string;
  icon: string;
  description: string;
  difficulty: string;
  popular?: boolean;
};

export const languages: Language[] = [
  {
    id: "java",
    name: "Java",
    icon: "☕",
    description: "Battle-tested blade of enterprise dungeons. Verbose but unbreakable.",
    difficulty: "Moderate",
    popular: true,
  },
  {
    id: "python",
    name: "Python",
    icon: "🐍",
    description: "A serpent staff of clarity. Fastest path from idea to spell.",
    difficulty: "Beginner friendly",
    popular: true,
  },
  {
    id: "cpp",
    name: "C++",
    icon: "⚙",
    description: "Warhammer of raw speed. Heavy, sharp, unforgiving in the right hands.",
    difficulty: "Advanced",
  },
  {
    id: "c",
    name: "C",
    icon: "💻",
    description: "The ancient rune-tongue. Memory is yours to command — and to lose.",
    difficulty: "Hardcore",
  },
  {
    id: "javascript",
    name: "JavaScript",
    icon: "🌐",
    description: "Twin daggers of the web realm. Quick, flexible, everywhere at once.",
    difficulty: "Moderate",
  },
];

export type Difficulty = {
  id: string;
  name: string;
  tier: string;
  description: string;
  xpMultiplier: string;
  gradient: string;
};

export const difficulties: Difficulty[] = [
  {
    id: "novice",
    name: "Novice Adventurer",
    tier: "Easy",
    description: "Gentle beasts, generous hints. Learn the terrain before the storm.",
    xpMultiplier: "1.0x XP",
    gradient: "from-emerald-500/25 to-teal-500/10",
  },
  {
    id: "warrior",
    name: "Warrior",
    tier: "Medium",
    description: "Real fights, fewer hints. The standard road through the realm.",
    xpMultiplier: "1.4x XP",
    gradient: "from-indigo-500/25 to-blue-500/10",
  },
  {
    id: "elite",
    name: "Elite Knight",
    tier: "Hard",
    description: "Optimal solutions only. Complexity is judged as harshly as correctness.",
    xpMultiplier: "1.8x XP",
    gradient: "from-violet-500/25 to-fuchsia-500/10",
  },
  {
    id: "master",
    name: "Dungeon Master",
    tier: "Expert",
    description: "No hints. Hidden test cases. Bosses that punish sloppy invariants.",
    xpMultiplier: "2.3x XP",
    gradient: "from-amber-500/25 to-orange-500/10",
  },
  {
    id: "nightmare",
    name: "Nightmare",
    tier: "Interview Mode",
    description: "Timed rounds, silent judging, one submission. Just like the real thing.",
    xpMultiplier: "3.0x XP",
    gradient: "from-rose-500/25 to-red-500/10",
  },
];

export type Character = {
  id: string;
  name: string;
  title: string;
  image: string;
  description: string;
  stats: { strength: number; magic: number; speed: number; difficulty: number };
};

export const characters: Character[] = [
  {
    id: "warrior",
    name: "Warrior",
    title: "Bulwark of Brute Force",
    image: warriorImg,
    description: "Solves by sheer persistence. Extra retries on every boss encounter.",
    stats: { strength: 92, magic: 30, speed: 55, difficulty: 25 },
  },
  {
    id: "mage",
    name: "Mage",
    title: "Weaver of Recursion",
    image: mageImg,
    description: "Sees the elegant spell hidden in every problem. Bonus hint charges.",
    stats: { strength: 38, magic: 95, speed: 60, difficulty: 60 },
  },
  {
    id: "archer",
    name: "Archer",
    title: "Marksman of Binary Search",
    image: archerImg,
    description: "Precision over power. Rewards fewer wrong submissions with bonus XP.",
    stats: { strength: 58, magic: 52, speed: 88, difficulty: 45 },
  },
  {
    id: "assassin",
    name: "Assassin",
    title: "Shadow of Optimal Time",
    image: assassinImg,
    description: "Strikes for the O(n) solution first. Big multipliers, zero mercy.",
    stats: { strength: 66, magic: 48, speed: 96, difficulty: 85 },
  },
];

export type Stage = {
  id: string;
  index: number;
  title: string;
  type: "enemy" | "treasure" | "boss";
  enemy: string;
  enemyHp: number;
  xp: number;
  coins: number;
  questionId: string;
};

export type World = {
  id: string;
  name: string;
  topic: string;
  emoji: string;
  blurb: string;
  requiredLevel: number;
  stages: Stage[];
};

const stageTitles = [
  "The Outer Gate",
  "Rusted Corridor",
  "Hall of Echoes",
  "Treasure Vault",
  "The Warden",
];

function makeStages(worldId: string, enemies: string[], baseXp: number): Stage[] {
  return stageTitles.map((title, i) => ({
    id: `${worldId}-${i + 1}`,
    index: i + 1,
    title,
    type: i === 4 ? "boss" : i === 3 ? "treasure" : "enemy",
    enemy: enemies[i % enemies.length] as string,
    enemyHp: 60 + i * 25,
    xp: baseXp + i * 20,
    coins: 25 + i * 15,
    questionId: `${worldId}-q${i + 1}`,
  }));
}

export const worlds: World[] = [
  {
    id: "arrays",
    name: "Arrays Kingdom",
    topic: "Arrays",
    emoji: "🏰",
    blurb: "Endless indexed plains where every step is O(1) — if you know the address.",
    requiredLevel: 1,
    stages: makeStages("arrays", ["Index Imp", "Off-By-One Ogre", "Sum Wraith"], 60),
  },
  {
    id: "strings",
    name: "Strings Forest",
    topic: "Strings",
    emoji: "🌲",
    blurb: "A tangled woodland of characters, palindromes and shifting substrings.",
    requiredLevel: 2,
    stages: makeStages("strings", ["Anagram Sprite", "Palindrome Treant", "Substring Serpent"], 70),
  },
  {
    id: "recursion",
    name: "Recursion Cave",
    topic: "Recursion",
    emoji: "🕳",
    blurb: "Go deeper. Then deeper. Then remember how to come back up.",
    requiredLevel: 3,
    stages: makeStages("recursion", ["Stack Goblin", "Echo Fiend", "Base Case Banshee"], 85),
  },
  {
    id: "sorting",
    name: "Sorting Castle",
    topic: "Sorting",
    emoji: "🏯",
    blurb: "Order from chaos. The castle rearranges itself while you climb it.",
    requiredLevel: 4,
    stages: makeStages("sorting", ["Bubble Brute", "Merge Marauder", "Pivot Phantom"], 95),
  },
  {
    id: "searching",
    name: "Searching Valley",
    topic: "Searching",
    emoji: "🔦",
    blurb: "Halve the valley with every step, or wander it linearly forever.",
    requiredLevel: 5,
    stages: makeStages("searching", ["Linear Lurker", "Midpoint Mimic", "Rotated Revenant"], 100),
  },
  {
    id: "linked-list",
    name: "Linked List Village",
    topic: "Linked Lists",
    emoji: "🔗",
    blurb: "Every hut points to the next. Break one link and the village vanishes.",
    requiredLevel: 6,
    stages: makeStages("linked-list", ["Null Pointer Nix", "Cycle Hound", "Reversal Wraith"], 110),
  },
  {
    id: "stack",
    name: "Stack Mountain",
    topic: "Stacks",
    emoji: "⛰",
    blurb: "Only the summit is reachable. Push carefully, pop wisely.",
    requiredLevel: 7,
    stages: makeStages("stack", ["Bracket Beast", "Overflow Titan", "Monotone Golem"], 120),
  },
  {
    id: "queue",
    name: "Queue Harbor",
    topic: "Queues",
    emoji: "⚓",
    blurb: "First in, first out. The harbor never lets anyone cut the line.",
    requiredLevel: 8,
    stages: makeStages("queue", ["Deque Drake", "Circular Corsair", "Priority Kraken"], 130),
  },
  {
    id: "tree",
    name: "Tree Kingdom",
    topic: "Trees",
    emoji: "🌳",
    blurb: "Branching halls of nodes. Traverse them in the right order or get lost.",
    requiredLevel: 9,
    stages: makeStages("tree", ["Leaf Lurker", "Balance Warden", "Ancestor Lich"], 145),
  },
  {
    id: "graph",
    name: "Graph Empire",
    topic: "Graphs",
    emoji: "🕸",
    blurb: "Every road connects to every other. Visited sets are your only map.",
    requiredLevel: 10,
    stages: makeStages("graph", ["Cycle Sentinel", "Dijkstra Dragon", "Topological Tyrant"], 160),
  },
  {
    id: "dp",
    name: "Dynamic Programming Temple",
    topic: "Dynamic Programming",
    emoji: "🔮",
    blurb: "The temple remembers every path you have already walked. Learn to as well.",
    requiredLevel: 12,
    stages: makeStages("dp", ["Memo Specter", "Knapsack Colossus", "Optimal Overlord"], 180),
  },
];

export function findWorld(id: string) {
  return worlds.find((w) => w.id === id);
}

export function findStage(stageId: string) {
  for (const world of worlds) {
    const stage = world.stages.find((s) => s.id === stageId);
    if (stage) return { world, stage };
  }
  return null;
}
