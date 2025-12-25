## 2025-12-25 - Icon-only buttons relying on tooltips
**Learning:** Many icon-only buttons in the Firefox UI (`toolbarbutton`) rely solely on `tooltiptext` (via Fluent) for accessibility, often missing an explicit `aria-label`. While some screen readers may fall back to the tooltip, explicit ARIA labels provide better control and reliability.
**Action:** When adding or reviewing icon-only buttons, check for `aria-label` in the FTL file. If missing, add it, reusing the tooltip text if appropriate or providing a more concise label.
