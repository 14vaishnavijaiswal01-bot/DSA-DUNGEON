## DSA Dungeon — RPG-themed DSA learning platform (frontend-only MVP)

A complete, polished, mock-data-driven demo. No backend, no code execution — UI only.

### Note on stack
This project runs on TanStack Router (file-based routing), not React Router. Everything requested works identically; routes just live as files under `src/routes/`. Framer Motion (`motion`), Tailwind v4, TypeScript, and Lucide are all used as specified.

### Design system
- Tokens in `src/styles.css` (oklch equivalents of your palette): background `#0F172A`, card `#1E293B`, primary `#6366F1`, secondary `#8B5CF6`, accent `#F59E0B`, success `#22C55E`, danger `#EF4444`, muted text `#94A3B8`.
- Gradient tokens (indigo→violet, amber glow), glass surface token, soft shadow + glow shadow tokens, radius 16–20px.
- Typography: Cinzel (fantasy display, headings) + Inter/Manrope (body), loaded via `<link>` in the root route.
- Shared animation variants (fade-in, slide-up, scale-in, stagger) in one `motion` presets file.

### Generated art
- Logo: sword + shield + code brackets emblem (transparent PNG).
- Hero illustration for the Welcome screen.
- 4 character portraits (Warrior, Mage, Archer, Assassin).
- 1 dungeon/enemy backdrop reused with tints across battles.
Everything else (world map nodes, icons, badges) is drawn with CSS/SVG/Lucide to stay fast.

### Routes
```
/                     Splash (animated logo, particles, Start)
/login  /signup       Auth UI (no logic)
/onboarding/welcome
/onboarding/language  Choose Your Weapon (Java, Python, C++, C, JS)
/onboarding/difficulty Choose Your Adventure (5 tiers, bg changes on hover/select)
/onboarding/character Choose Hero (4 heroes with stat bars)
/dashboard            profile, XP, coins, streak, quick actions, daily quest,
                      recent activity, stat cards, weekly progress
/map                  World Map — 11 worlds, locked/current/completed states
/map/$worldId         Dungeon path: stage circles on a winding road,
                      castle/enemies/treasure, green/blue/gray states
/battle/$stageId      Enemy, health bars, XP/coin rewards, Start Battle
/challenge/$stageId   Split layout: problem + editor UI, run/submit/reset,
                      output console, timer, hints modal
/victory/$stageId     Success animation, XP/coins earned, level progress
/profile  /inventory  /achievements  /leaderboard  /settings
```

### Layout
- `AppShell` layout wrapping the in-app routes: left sidebar (collapsible, glass, glowing active item), top navbar (XP/coins/streak/avatar), bottom nav on mobile.
- Splash/auth/onboarding render full-screen without the shell.
- Page transitions via motion on route change.

### Components (`src/components/`)
`ui/` — Button (variants: primary, ghost, accent, ripple), Card, GlassCard, ProgressBar (animated), Modal/Dialog, Badge, StatBar, Particles background.
`game/` — LanguageCard, DifficultyCard, CharacterCard, WorldCard, StageNode, EnemyPanel, HealthBar, QuestionCard, AchievementCard, InventoryCard, ProfileCard, LeaderboardTable, XPBar.

### Data & state
- `src/data/` mock JSON-ish TS modules: languages, difficulties, characters, worlds (11, each with stages), questions (problem statements, constraints, examples, hints), achievements, inventory items, leaderboard rows, activity feed.
- `src/context/GameContext.tsx` — selected language/difficulty/character, XP, level, coins, streak, unlocked worlds/stages; persisted to localStorage so the demo flows continuously and Continue Adventure resumes correctly.
- Every button navigates; no dead ends.

### Technical details
- Code editor is a styled `<textarea>` with line numbers, monospace font, language selector and syntax-colored starter template — no execution. Run/Submit show canned console output and route to Victory.
- Each route defines its own `head()` metadata (title, description, og tags).
- Responsive at every breakpoint; grid → single column on mobile, sidebar → bottom nav.

### Build order
1. Tokens, fonts, generated assets, shared UI primitives.
2. Splash → auth → onboarding flow.
3. AppShell + dashboard.
4. World map → dungeon → battle → challenge → victory loop.
5. Profile, inventory, achievements, leaderboard, settings.
6. Responsive + animation polish pass.
