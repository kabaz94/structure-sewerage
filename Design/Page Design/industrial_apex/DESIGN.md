# Design System Strategy: The Structural Authority

## 1. Overview & Creative North Star
The visual identity of this design system is guided by the Creative North Star: **"The Structural Authority."** 

In the industrial service sector, trust isn't built with generic templates; it is built through precision, depth, and unwavering stability. This design system moves away from "flat" industrial tropes in favor of a high-end editorial experience. We achieve this through **Intentional Asymmetry** (using unbalanced white space to guide the eye), **Tonal Layering** (replacing harsh lines with soft color shifts), and **Hyper-Scale Typography** (using massive display type to project confidence). The result is a digital presence that feels as solid and expertly engineered as the physical infrastructure it represents.

---

## 2. Colors & Surface Philosophy
The palette is rooted in a deep, professional `primary` blue and a high-contrast `tertiary` green derived from the core brand identity.

### The "No-Line" Rule
To maintain a premium, bespoke feel, **1px solid borders are strictly prohibited for sectioning.** Boundaries must be defined solely through background color shifts or subtle tonal transitions. For example, a `surface-container-low` section should sit directly against a `surface` background to define its edge. 

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers—like stacked sheets of fine paper. 
- Use `surface-container-lowest` (#ffffff) for the highest priority cards to make them "pop" against a `surface-container-low` (#f3f4f5) background.
- Nesting should follow a logical progression: the more interactive or important an element, the higher (brighter) its surface tier.

### The "Glass & Gradient" Rule
Standard flat colors feel "out-of-the-box." To add visual soul:
- **CTAs & Hero Accents:** Use a subtle linear gradient transitioning from `primary` (#00204f) to `primary_container` (#1a3668) at a 135-degree angle.
- **Floating Navigation:** Utilize Glassmorphism. Apply a semi-transparent `surface` color with a 12px backdrop-blur to allow the background content to bleed through, creating an integrated, high-end feel.

---

## 3. Typography
We utilize a dual-typeface system to balance industrial authority with modern readability.

*   **Display & Headlines (Work Sans):** A clean, architectural sans-serif. Use `display-lg` (3.5rem) with tight letter-spacing (-0.02em) for hero sections to create an editorial "poster" effect.
*   **Body & Labels (Inter):** Chosen for its exceptional legibility in technical contexts. `body-md` (0.875rem) is the workhorse for service descriptions, while `label-md` (0.75rem) in all-caps with 0.05em tracking should be used for technical metadata.

The hierarchy is intentionally steep. A massive `headline-lg` paired with a modest, well-spaced `body-lg` creates the "white space" luxury typical of high-end design journals.

---

## 4. Elevation & Depth
Depth in this system is achieved through **Tonal Layering** rather than traditional structural lines.

*   **The Layering Principle:** Stack `surface-container` tiers to create lift. A card using `surface-container-lowest` placed on a `surface-container-high` background creates a natural focal point without a single drop shadow.
*   **Ambient Shadows:** When a floating effect is required (e.g., for a "Request Quote" modal), use an extra-diffused shadow: `box-shadow: 0 20px 40px rgba(25, 28, 29, 0.06)`. The shadow color must be a tinted version of `on-surface` to mimic natural light.
*   **The "Ghost Border" Fallback:** If a container requires a boundary for accessibility, use the `outline-variant` token at **20% opacity**. Never use 100% opaque, high-contrast borders.

---

## 5. Components

### Buttons
*   **Primary:** Features a subtle gradient from `primary` to `primary_container`. High-contrast `on_primary` text. Corners: `md` (0.375rem).
*   **Action (Accent):** Reserved for the final conversion point. Uses `tertiary_fixed` (#a3f69c) with `on_tertiary_fixed` (#002204) text. This high-visibility green provides the "Clear Action" required by the brand.

### Cards & Sections
*   **Standard Card:** Use `surface-container-lowest` with a `xl` (0.75rem) corner radius. 
*   **Spacing:** Forbid divider lines. Use vertical white space (32px or 48px) to separate content blocks within a card.

### Input Fields
*   **Style:** Minimalist. Use `surface-container-highest` for the field background with a "Ghost Border" on focus. 
*   **States:** Error states must use `error` (#ba1a1a) with a subtle `error_container` background tint to ensure the user feels guided, not shouted at.

### Industrial Status Chips
*   **Context:** Used for "Service Status" or "Urgency."
*   **Design:** Small, `full` (9999px) rounded pills using `secondary_container` for background and `on_secondary_container` for text.

---

## 6. Do's and Don'ts

### Do
*   **Do** use asymmetrical layouts. For example, a left-aligned `display-md` headline with a right-aligned `body-lg` paragraph creates a sophisticated, custom look.
*   **Do** utilize `tertiary` (green) sparingly as a "surgical" accent to highlight key data points or success states.
*   **Do** lean into the "Work Sans" bold weights for headlines to project "Structural Authority."

### Don't
*   **Don't** use 1px solid black or dark grey borders. They break the fluid, high-end feel of the tonal layering.
*   **Don't** use standard "drop shadows" with 20%+ opacity. They look dated and "cheap."
*   **Don't** clutter the UI. If an element doesn't serve a functional purpose in building trust or driving action, remove it. Use the `surface` color to provide "breathing room."