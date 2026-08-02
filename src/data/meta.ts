export const achievements = [
  {
    id: "first-victory",
    name: "First Victory",
    description: "Defeat your first dungeon enemy.",
    icon: "⚔️",
    unlocked: true,
  },
  {
    id: "array-master",
    name: "Array Master",
    description: "Clear every stage in Arrays Kingdom.",
    icon: "🏰",
    unlocked: true,
  },
  {
    id: "streak-7",
    name: "7-Day Streak",
    description: "Train seven days without breaking the chain.",
    icon: "🔥",
    unlocked: true,
  },
  {
    id: "hundred",
    name: "100 Questions",
    description: "Solve one hundred problems across the realm.",
    icon: "💯",
    unlocked: false,
  },
  {
    id: "tree-slayer",
    name: "Tree Slayer",
    description: "Fell the Ancestor Lich in Tree Kingdom.",
    icon: "🌳",
    unlocked: false,
  },
  {
    id: "graph-explorer",
    name: "Graph Explorer",
    description: "Traverse every road of the Graph Empire.",
    icon: "🕸",
    unlocked: false,
  },
];

export const inventory = [
  { id: 1, name: "Blade of Big-O", type: "Weapon", rarity: "Legendary", icon: "🗡", unlocked: true },
  { id: 2, name: "Recursion Wand", type: "Weapon", rarity: "Epic", icon: "🪄", unlocked: true },
  { id: 3, name: "Hashmap Buckler", type: "Armor", rarity: "Rare", icon: "🛡", unlocked: true },
  { id: 4, name: "Cloak of Memoization", type: "Armor", rarity: "Epic", icon: "🧥", unlocked: false },
  { id: 5, name: "Potion of Hints", type: "Potion", rarity: "Common", icon: "🧪", unlocked: true },
  { id: 6, name: "Elixir of Focus", type: "Potion", rarity: "Rare", icon: "⚗️", unlocked: true },
  { id: 7, name: "Sigil of Streaks", type: "Badge", rarity: "Rare", icon: "🔥", unlocked: true },
  { id: 8, name: "Crown of the Graph", type: "Badge", rarity: "Legendary", icon: "👑", unlocked: false },
  { id: 9, name: "Rune of O(1)", type: "Badge", rarity: "Epic", icon: "🔮", unlocked: false },
  { id: 10, name: "Torch of Debugging", type: "Potion", rarity: "Common", icon: "🔦", unlocked: true },
  { id: 11, name: "Greaves of Speed", type: "Armor", rarity: "Rare", icon: "🥾", unlocked: false },
  { id: 12, name: "Dagger of Two Pointers", type: "Weapon", rarity: "Rare", icon: "🔪", unlocked: true },
];

export const leaderboard = {
  global: [
    { rank: 1, player: "shadowbyte", level: 42, xp: 128400, solved: 612 },
    { rank: 2, player: "nullwarden", level: 39, xp: 119050, solved: 588 },
    { rank: 3, player: "heapqueen", level: 37, xp: 104300, solved: 540 },
    { rank: 4, player: "dp_druid", level: 34, xp: 96120, solved: 501 },
    { rank: 5, player: "You", level: 12, xp: 8420, solved: 128 },
  ],
  friends: [
    { rank: 1, player: "aritra_dev", level: 18, xp: 21400, solved: 210 },
    { rank: 2, player: "You", level: 12, xp: 8420, solved: 128 },
    { rank: 3, player: "meghna.js", level: 11, xp: 7810, solved: 119 },
    { rank: 4, player: "rohan_cpp", level: 9, xp: 5230, solved: 88 },
  ],
  college: [
    { rank: 1, player: "kernelkid", level: 24, xp: 42100, solved: 330 },
    { rank: 2, player: "aritra_dev", level: 18, xp: 21400, solved: 210 },
    { rank: 3, player: "You", level: 12, xp: 8420, solved: 128 },
    { rank: 4, player: "sortsage", level: 10, xp: 6900, solved: 101 },
  ],
};

export const recentActivity = [
  { id: 1, text: "Defeated Off-By-One Ogre in Arrays Kingdom", xp: 80, time: "2h ago" },
  { id: 2, text: "Unlocked achievement: 7-Day Streak", xp: 150, time: "Yesterday" },
  { id: 3, text: "Cleared Rusted Corridor in Strings Forest", xp: 70, time: "Yesterday" },
  { id: 4, text: "Purchased Hashmap Buckler from the armory", xp: 0, time: "2 days ago" },
];

export const weeklyProgress = [
  { day: "Mon", value: 60 },
  { day: "Tue", value: 85 },
  { day: "Wed", value: 40 },
  { day: "Thu", value: 95 },
  { day: "Fri", value: 70 },
  { day: "Sat", value: 30 },
  { day: "Sun", value: 55 },
];

export const dailyQuest = {
  title: "Slay 3 enemies in Strings Forest",
  progress: 2,
  goal: 3,
  reward: "120 XP + 60 coins",
};
