---
name: Lumina Prep
colors:
  surface: '#f9f9ff'
  surface-dim: '#d3daea'
  surface-bright: '#f9f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f0f3ff'
  surface-container: '#e7eefe'
  surface-container-high: '#e2e8f8'
  surface-container-highest: '#dce2f3'
  on-surface: '#151c27'
  on-surface-variant: '#434655'
  inverse-surface: '#2a313d'
  inverse-on-surface: '#ebf1ff'
  outline: '#737686'
  outline-variant: '#c3c6d7'
  surface-tint: '#0053db'
  primary: '#004ac6'
  on-primary: '#ffffff'
  primary-container: '#2563eb'
  on-primary-container: '#eeefff'
  inverse-primary: '#b4c5ff'
  secondary: '#00668a'
  on-secondary: '#ffffff'
  secondary-container: '#40c2fd'
  on-secondary-container: '#004d6a'
  tertiary: '#006229'
  on-tertiary: '#ffffff'
  tertiary-container: '#007e37'
  on-tertiary-container: '#c1ffc5'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dbe1ff'
  primary-fixed-dim: '#b4c5ff'
  on-primary-fixed: '#00174b'
  on-primary-fixed-variant: '#003ea8'
  secondary-fixed: '#c4e7ff'
  secondary-fixed-dim: '#7bd0ff'
  on-secondary-fixed: '#001e2c'
  on-secondary-fixed-variant: '#004c69'
  tertiary-fixed: '#6bff8f'
  tertiary-fixed-dim: '#4ae176'
  on-tertiary-fixed: '#002109'
  on-tertiary-fixed-variant: '#005321'
  background: '#f9f9ff'
  on-background: '#151c27'
  surface-variant: '#dce2f3'
typography:
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-sm:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
  caption:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  gutter: 16px
  margin-mobile: 20px
---

## Brand & Style
The design system is centered on high-performance academic tracking with a focus on mental clarity and progress visualization. The brand personality is "The Professional Coach"—authoritative yet encouraging, systematic yet accessible. 

The aesthetic blends **Modern Dashboard** utility with **Glassmorphic** accents. It utilizes a whitespace-heavy layout to reduce cognitive load during intense study sessions. The emotional response is one of organized calm, ensuring that even when a user faces a difficult practice exam, the interface feels like a supportive environment. Depth is achieved through soft gradients and subtle translucency, signaling a state-of-the-art digital learning experience.

## Colors
The color palette is engineered for "Focus & Flow." The **Primary Gradient** is the signature visual element, reserved for high-level progress indicators and primary call-to-action surfaces. 

- **Primary Blue (#2563EB):** Represents trust and intelligence. Used for active states and navigation highlights.
- **Accent Blue (#38BDF8):** Used for supplementary information and interactive sub-elements.
- **Functional Colors:** Success, Warning, and Danger colors follow standard semantic patterns but are slightly desaturated to maintain the "soft" dashboard aesthetic.
- **Adaptive Surfaces:** In Light Mode, surfaces use a clean blue-tinted white (#F7FAFF) to prevent eye strain compared to pure white. In Dark Mode, depth is maintained through deep navy surfaces rather than true black, preserving the gradient's vibrancy.

## Typography
This design system utilizes **Inter** exclusively to leverage its exceptional legibility and neutral, systematic character. 

- **Hierarchical Scale:** Headlines use a tighter letter spacing and heavier weights to create a strong visual anchor.
- **Readability:** The body text is set to 150% line height (24px) to ensure long study materials remain readable on small mobile screens.
- **Case Usage:** Labels and Small Captions should occasionally use uppercase with increased letter spacing (0.05em) when used for category headers to differentiate from body content.

## Layout & Spacing
The layout follows a **Fluid Grid** model optimized for mobile-first interaction. 

- **Vertical Rhythm:** A 4px baseline grid governs all spacing.
- **Safe Zones:** Mobile screens maintain a minimum 20px side margin. Content blocks (cards) use 16px internal padding.
- **Card Spacing:** Distinct content sections are separated by 24px (lg) margins to maintain the "whitespace-heavy" feel. 
- **Mobile Reflow:** On mobile, all cards span the full width of the safe area. On tablet/desktop, cards transition into a multi-column masonry or grid layout depending on the complexity of the data.

## Elevation & Depth
Elevation is communicated through **Ambient Shadows** and **Tonal Layering** rather than heavy borders.

- **Primary Card Elevation:** Uses a signature soft shadow: `0px 8px 32px rgba(37, 99, 235, 0.08)`. This creates a "lifted" effect that feels airy and light.
- **Interactive Depth:** When a card is pressed, it should scale slightly (0.98) and its shadow should tighten to simulate physical contact.
- **Backdrop Blurs:** High-level overlays (modals or bottom sheets) utilize a 12px backdrop blur with a 70% white tint to maintain context of the dashboard behind them.
- **Borders:** Thin 1px borders (#E5EAF5) are used sparingly to define boundaries between sections of equal elevation within a single card.

## Shapes
The shape language is consistently "Friendly Geometric." 

- **Standard Radius:** All primary containers and cards use a **16px** (rounded-lg) radius.
- **Buttons & Inputs:** Follow the `rounded-lg` standard to maintain a cohesive look.
- **Progress Bars:** Use a fully pill-shaped (rounded-full) radius to emphasize the fluid nature of "progress."
- **Small Elements:** Tags and chips use a 8px (rounded-md) radius to prevent them from looking too circular next to larger cards.

## Components

### Buttons
- **Primary:** Gradient background with white text. Subtle scale-up on tap.
- **Secondary:** White background with Primary Blue border and text.
- **Ghost:** No background/border; used for less critical actions like "Skip" or "Back."

### Bottom Navigation (Mobile)
- **Structure:** Fixed at the bottom of the viewport.
- **Visuals:** White surface (or Dark Mode card color) with a 20px backdrop blur. 
- **Icons:** Dashboard, Belajar (Book), Tryout (Timer), Statistik (Chart), Settings (Gear).
- **Active State:** The active icon is tinted with the Primary Blue and features a small dot indicator below it.

### Cards & Progress
- **Study Card:** Contains a title, progress percentage, and a linear progress bar.
- **Stats Card:** Uses a high-contrast typography for the "big number" (e.g., 85% Accuracy) with a secondary caption for the trend.

### Input Fields
- **Styling:** 1px border (#E5EAF5) with a 16px radius. When focused, the border changes to Primary Blue and adds a soft 4px blue glow.

### Animations
- **Transitions:** Page transitions use a "Slide & Fade" (250ms cubic-bezier).
- **Progress Bars:** Animate from 0 to target value upon card entry.
- **Micro-interactions:** Icons should have a subtle 10% scale-up when tapped.