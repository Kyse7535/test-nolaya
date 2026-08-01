---
name: Atelier Synergy
colors:
  surface: '#fbf9f8'
  surface-dim: '#dbdad9'
  surface-bright: '#fbf9f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f3f2'
  surface-container: '#efedec'
  surface-container-high: '#e9e8e7'
  surface-container-highest: '#e4e2e1'
  on-surface: '#1b1c1b'
  on-surface-variant: '#444748'
  inverse-surface: '#303030'
  inverse-on-surface: '#f2f0ef'
  outline: '#747878'
  outline-variant: '#c4c7c7'
  surface-tint: '#5e5e5e'
  primary: '#000101'
  on-primary: '#ffffff'
  primary-container: '#1b1c1c'
  on-primary-container: '#848484'
  inverse-primary: '#c7c6c6'
  secondary: '#775a19'
  on-secondary: '#ffffff'
  secondary-container: '#fdd587'
  on-secondary-container: '#785a19'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#271900'
  on-tertiary-container: '#a17f3c'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e3e2e2'
  primary-fixed-dim: '#c7c6c6'
  on-primary-fixed: '#1b1c1c'
  on-primary-fixed-variant: '#464747'
  secondary-fixed: '#ffdea3'
  secondary-fixed-dim: '#e8c176'
  on-secondary-fixed: '#261900'
  on-secondary-fixed-variant: '#5c4200'
  tertiary-fixed: '#ffdea6'
  tertiary-fixed-dim: '#e9c177'
  on-tertiary-fixed: '#271900'
  on-tertiary-fixed-variant: '#5d4201'
  background: '#fbf9f8'
  on-background: '#1b1c1b'
  surface-variant: '#e4e2e1'
typography:
  display-lg:
    fontFamily: Manrope
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Manrope
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Manrope
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-md:
    fontFamily: Manrope
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Manrope
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Manrope
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-caps:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.05em
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '400'
    lineHeight: 14px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 4px
  container-margin: 24px
  gutter: 16px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 32px
  section-gap: 48px
---

## Brand & Style
The design system is rooted in the intersection of professional service management and editorial beauty. It serves a dual audience: high-end hair stylists (B2B) and discerning clients seeking specialized textured hair services (B2C).

The aesthetic is **Minimalist-Professional** with a strong **Editorial** influence. It prioritizes clarity, generous negative space, and a high-contrast palette that allows photography of hair textures to remain the focal point. The emotional response should be one of quiet confidence, expertise, and luxury. Visual complexity is reduced in favor of precise alignment and rhythmic spacing, moving away from standard "app" tropes toward a "digital atelier" feel.

## Colors
The palette is anchored by **Charcoal** and **Soft Gold**, creating a sophisticated, high-contrast environment.

- **Primary (Charcoal):** Used for typography, primary actions, and structural boundaries. It provides the "ink" of the editorial experience.
- **Accent (Gold Tones):** Use `#775A19` (Deep Gold) for subtle interactive states or icons, and `#FED488` (Soft Gold) for highlights and high-visibility accents. These should be used sparingly to maintain premium status.
- **Surfaces:** The background is a crisp `#FFFFFF`, while `#FBF9F8` and `#EFEDED` are used for sectioning and UI containers to create depth without relying on shadows.

## Typography
The typography strategy utilizes **Manrope** for the core UI to maintain a modern, legible, and balanced feel. Its geometric yet friendly curves ensure the platform feels accessible yet professional.

**JetBrains Mono** is introduced as a secondary functional typeface. It is used exclusively for technical data, status badges, and metadata labels. This monospaced contrast adds a layer of "utility and precision" to the editorial layout, signaling the platform's robust B2B capabilities.

- **Headlines:** Use tight letter-spacing and bold weights to ground the page.
- **Data Labels:** Use JetBrains Mono in all-caps for status indicators (e.g., BOOKED, PENDING) to differentiate them from narrative content.

## Layout & Spacing
The layout follows a **Fluid Grid** model designed specifically for high-end mobile devices.

- **Margins:** A generous 24px side margin is mandatory to prevent content from feeling "cramped" and to maintain the premium editorial feel.
- **Rhythm:** Use a 4px base unit. Vertical spacing between sections (`section-gap`) should be significantly larger than standard apps (48px+) to allow the design to "breathe."
- **Alignment:** Content should predominantly be left-aligned to mirror professional document standards. Technical data points can be right-aligned within their respective containers.

## Elevation & Depth
This design system rejects heavy shadows in favor of **Tonal Layering** and **Fine Outlines**.

- **Surfaces:** Depth is achieved by placing `#FFFFFF` cards on `#FBF9F8` backgrounds.
- **Borders:** Use 1px solid strokes in `#EFEDED` for card boundaries. This creates "low-contrast outlines" that define space without adding visual weight.
- **Zero-Shadow Policy:** Avoid drop shadows entirely. For floating elements like Bottom Sheets or Modals, use a subtle 10% opacity Charcoal overlay on the background to pull the element forward.

## Shapes
The shape language is disciplined and controlled.

- **Standard Components:** Buttons, input fields, and cards use a **Soft (0.25rem)** radius. This provides just enough approachability without losing professional rigour.
- **Media/Hero Elements:** Photography and primary promotional banners should use **0px (Sharp)** corners to emphasize the editorial, "magazine-style" aesthetic.
- **Interactive States:** Active tabs or selections should use a bottom-border (2px Charcoal) rather than rounded pill shapes to maintain the sophisticated tone.

## Components
- **Buttons:** Primary buttons are solid Charcoal (`#1B1C1C`) with white text. Secondary buttons use a 1px Charcoal border with no fill. All buttons use 0.25rem radius.
- **Input Fields:** Minimalist design with a 1px border (`#EFEDED`) that transitions to Charcoal on focus. Labels use Manrope Medium 14px.
- **Status Badges:** Utilize JetBrains Mono. They are never pill-shaped; they are rectangular with 2px radius or sharp corners, using subtle background tints (e.g., Soft Gold background with Deep Gold text).
- **Cards:** White background, 1px `#EFEDED` border, 0.25rem radius. Content within cards should follow the generous spacing rules, with at least 16px internal padding.
- **Lists:** Clean dividers using 1px `#EFEDED`. Remove arrows (chevrons) where the interaction is implied, to keep the UI as clean as possible.
- **Specialty Component - "The Portfolio Grid":** A staggered or strictly aligned grid for hair service photos, utilizing sharp 0px corners and thin gutters (4px) to create a high-fashion look.