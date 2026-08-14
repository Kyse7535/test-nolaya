---
name: Nolaya
colors:
  surface: '#fcf8f8'
  surface-dim: '#ddd9d8'
  surface-bright: '#fcf8f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f7f3f2'
  surface-container: '#f1edec'
  surface-container-high: '#ebe7e7'
  surface-container-highest: '#e5e2e1'
  on-surface: '#1c1b1b'
  on-surface-variant: '#444748'
  inverse-surface: '#313030'
  inverse-on-surface: '#f4f0ef'
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
  tertiary-container: '#1e1b1a'
  on-tertiary-container: '#888381'
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
  tertiary-fixed: '#e8e1df'
  tertiary-fixed-dim: '#ccc5c3'
  on-tertiary-fixed: '#1e1b1a'
  on-tertiary-fixed-variant: '#4a4645'
  background: '#fcf8f8'
  on-background: '#1c1b1b'
  surface-variant: '#e5e2e1'
typography:
  h1:
    fontFamily: Manrope
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  h1-mobile:
    fontFamily: Manrope
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.01em
  h2:
    fontFamily: Manrope
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Manrope
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Manrope
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Manrope
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-mono:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Manrope
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 40px
  2xl: 64px
  margin-mobile: 16px
  margin-desktop: 32px
  gutter: 16px
---

## Brand & Style

The design system is rooted in the "Premium Studio" aesthetic—a blend of high-end editorial clarity and professional enterprise reliability. It targets a B2B2C audience in the Afro/textured hair industry, requiring a UI that feels both technologically precise and culturally sophisticated. 

The visual language follows a **Minimalist / Editorial** approach. It prioritizes generous whitespace (macro-typography), structured layouts, and a restrained use of ornamentation. The emotional goal is to evoke a sense of calm, expertise, and "high-touch" service. Surfaces are clean and flat, avoiding gradients and heavy effects in favor of structural integrity and photographic prominence.

## Colors

The palette is anchored by a high-contrast foundation of Charcoal and Off-White, creating an "Ink on Paper" feel. 

- **Primary (Charcoal):** Used for primary text, iconography, and high-priority call-to-action surfaces.
- **Secondary (Soft Gold):** Reserved for moments of prestige, "Pro" status indicators, or subtle highlights. It is never used for large background fills.
- **Backgrounds:** The interface utilizes a tiered system of whites. `#fbf9f8` serves as the global canvas, while `#ffffff` is used for interactive cards and containers to provide subtle lift. `#efeded` provides structural separation for borders and secondary sections.

## Typography

This design system uses a dual-font strategy to balance elegance with technical utility.

- **Manrope** is the workhorse for the UI. It provides a modern, refined, and highly legible experience across all standard prose and navigation. Headlines should use tighter letter spacing to maintain a "lock-up" feel.
- **JetBrains Mono** is introduced for metadata, status badges, technical specifications, and time-stamps. It signals the "enterprise/data" side of the platform, providing a clean, utilitarian contrast to the softer Manrope.

All typography must adhere to a strict vertical rhythm, primarily utilizing the `body-md` for standard interactions and `label-mono` for all category-tagging and professional certifications.

## Layout & Spacing

The layout philosophy is built on a **4px baseline grid** to ensure mathematical harmony. 

For mobile, use a 4-column fluid grid with 16px side margins. For desktop, transition to a 12-column fixed grid (max-width 1280px) to maintain the editorial "narrow column" readability. 

Whitespace is a functional element in this design system. "Macro-white-space" (40px+) should be used between major sections to prevent the UI from feeling crowded, while "Micro-white-space" (8px-16px) defines the relationship between internal component elements. Hero images should always span the full width of their containers to emphasize the "Studio" mood.

## Elevation & Depth

This design system eschews traditional shadows in favor of **Tonal Layering and Low-Contrast Outlines**.

Depth is communicated through color shifts:
- **Level 0 (Base):** `#fbf9f8` (Surface).
- **Level 1 (Cards/Inputs):** `#ffffff` (Pure White) with a 1px solid border of `#efeded`.
- **Active State:** A 1px solid border of `#1b1c1c` (Charcoal).

Shadows are only permitted in extreme cases (e.g., floating action buttons or dropdown menus) and must be "Ambient Shadows": extremely diffused, 4% opacity Charcoal, with no offset. The goal is to make elements feel like they are resting on the page, not floating far above it.

## Shapes

The shape language is primarily **Soft (4px / 0.25rem)** for functional UI components. This provides just enough approachable warmth without losing the professional "edge."

- **Components:** Buttons, inputs, and chips use the standard `rounded` (4px) setting.
- **Media/Hero Images:** Use a `sharp` (0px) radius to mimic high-end fashion photography and magazine layouts.
- **Status Badges:** May use `rounded-xl` (12px) for a "pill" look, but only when using the JetBrains Mono font.

## Components

- **Buttons:** Primary buttons are solid Charcoal with White text. Secondary buttons are White with a Charcoal 1px border. Use 16px horizontal padding. Avoid icons unless necessary for navigation.
- **Chips & Badges:** Use JetBrains Mono. Badges for "Pro" status use a Soft Gold background with Charcoal text. All other technical badges use Soft Grey with Charcoal text.
- **Input Fields:** Pure White background, 4px radius, 1px Soft Grey border. On focus, the border transitions to Charcoal. Labels should be small and uppercase Manrope.
- **Lists:** Clean rows separated by a 1px Soft Grey line. No chevron icons unless the list item is a direct navigation link.
- **Cards:** Pure White fill, 4px radius, 1px Soft Grey border. Padding inside cards should be generous (24px) to maintain the editorial feel.
- **Media Containers:** Always 0px radius. Captions should be placed immediately below in JetBrains Mono.
- **Checkboxes/Radios:** Square (4px radius) for checkboxes, circular for radios. Solid Charcoal fill when selected.