# TODO - Mobile Performance Mode + Movies Series

## Mobile Performance Mode (low-end priority)
- [ ] Create a mobile/low-power detection flag in `neo-web/src/components/layout/NeoGamesLayout.tsx` (mobile width + reduced motion + optional Save-Data).
- [ ] Apply a `perf-mode` CSS class (or data attribute) to the root app wrapper when perf mode is enabled.
- [ ] Add CSS overrides to `neo-web/src/index.css` under `.perf-mode` to disable:
  - [ ] backdrop-filter blur / heavy glass effects
  - [ ] animated glows/shimmers/scanlines/neon grid
  - [ ] hover-based 3D/tilt effects
  - [ ] long-running CSS animations
- [ ] Reduce framer-motion transitions/entrances on perf mode in `NeoGamesLayout.tsx` (short fades only; optionally disable some AnimatePresence transitions).
- [ ] Lazy-render below-the-fold heavy sections on perf mode using IntersectionObserver inside `NeoGamesLayout.tsx`.
- [ ] Validate build passes and verify scrolling feels smoother on mobile emulation.

## Movies “Series” category (after perf work)
- [ ] Confirm how movie data represents series/seasons in the API / DB fields.
- [ ] Implement top-level “Series” in movies browsing UI (treat as content type, not genre).
- [ ] Add filtering logic and ensure it works with category pages.

