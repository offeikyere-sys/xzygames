# TODO - Robot loads once (persistent across pages)

## Goal
- Make the robot/Spline load only on first entry to the site and not re-load on page navigation.

## Steps
1. Add a single `FloatingRobot` (or existing robot component) + `AIChatModal` mounting point in `src/components/layout/NeoGamesLayout.tsx`.
2. Remove robot UI and the local `aiChatOpen` state from:
   - `src/components/games/HeroSection.tsx`
   - `src/components/games/CategoryPage.tsx`
3. Keep `aiChatOpen` state only in `NeoGamesLayout.tsx` and pass `onDoubleClick` handlers to the persistent robot container.
4. Ensure robot is hidden on pages like `login` / `signup` / `admin-users` if needed.
5. Verify:
   - robot loads once on navigation between pages
   - AI chat opens correctly
   - no TypeScript errors/build failures

