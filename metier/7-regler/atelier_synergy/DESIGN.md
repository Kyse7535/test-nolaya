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
  display-lg-mobile:
    fontFamily: Manrope
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 38px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Manrope
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-sm:
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
  label-mono:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.05em
  caption:
    fontFamily: Manrope
    fontSize: 12px
    fontWeight: '500'
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
  gutter: 16px
  margin-mobile: 20px
  margin-desktop: 64px
---

## Brand & Style
The design system is rooted in **Modern Minimalism** with an **Editorial** flair, tailored specifically for the premium Afro and textured hair industry. It balances the high-end aesthetic of a luxury salon with the robust utility of a B2B enterprise platform. 

The visual narrative avoids the typical "tech" look in favor of a sophisticated "Atelier" feel—prioritizing high-quality imagery, generous whitespace, and a restrained use of color. The emotional response should be one of calm expertise, prestige, and cultural resonance. Surface transitions are subtle, and the interface feels grounded rather than floating, reflecting the tangible nature of hair artistry.

## Colors
This design system utilizes a high-contrast charcoal base with warm, organic neutrals to create a sense of tactile luxury.

- **Primary (Charcoal):** Used for primary actions, headings, and high-emphasis UI elements. It provides the "anchor" for the brand.
- **Secondary (Deep Gold):** Used sparingly for secondary call-to-actions, active states, or premium indicators.
- **Tertiary (Soft Gold):** Reserved for low-opacity backgrounds, highlights, or accent borders to provide warmth without being flashy.
- **Neutral Palette:** The backgrounds utilize `#fbf9f8` for the main canvas to reduce eye strain compared to pure white, while `#efeded` handles structural divisions and muted surfaces.

## Typography
The typographic system uses a dual-font approach to differentiate between the lifestyle "Art" of the service and the "Technical" precision of the platform.

- **Manrope** is the workhorse. It is used for all primary UI, headings, and body copy. Its wide apertures and modern proportions ensure legibility for appointment details and client notes.
- **JetBrains Mono** is the functional accent. It is used for technical metadata: time stamps, price tags, service codes, and status badges. This creates a distinct visual hierarchy that separates data from content.

## Layout & Spacing
The layout follows a **Fluid Grid** model with an 8px base rhythm. For mobile, a 4-column grid is used with 20px margins to allow content to breathe—mimicking an editorial magazine layout.

- **Vertical Rhythm:** Use larger `xl` (40px) gaps between major sections (e.g., between "Client Portfolio" and "Upcoming Appointments") to maintain a premium, unhurried feel.
- **Internal Spacing:** Components like cards use `md` (16px) padding consistently.
- **Alignment:** All technical labels (JetBrains Mono) should align to the top-right of containers or stay tucked into small badges with 4px horizontal padding.

## Elevation & Depth
In this design system, depth is conveyed through **Tonal Layers** and **Low-Contrast Outlines** rather than heavy shadows.

- **Surface Tiers:** Backgrounds are `#fbf9f8`. Primary cards use `#ffffff` with a subtle 1px border of `#efeded`.
- **Shadows:** Only used for floating elements like bottom sheets or modals. When used, they must be extremely soft: `0px 10px 30px rgba(0, 0, 0, 0.04)`.
- **Interaction Depth:** On press, a card does not lift; instead, it shifts background color slightly to `#fbf9f8` or adds a 1px internal stroke of the Secondary Gold.

## Shapes
The shape language is strictly **Soft (0.25rem)**. This subtle rounding provides a human touch while maintaining the architectural rigor of a professional B2B platform. 

- **Standard Elements:** Buttons, Input fields, and Cards use the 4px (0.25rem) radius.
- **Interactive Small Elements:** Checkboxes use a 2px radius to appear sharp yet intentional. 
- **Full Circles:** Only used for user avatars or icon containers to create a distinct visual contrast against the otherwise rectangular UI.

## Components

- **Buttons:** Primary buttons are solid Charcoal (#1b1c1c) with white Manrope text. Secondary buttons are outlined in `#efeded` with a subtle gold hover state.
- **Input Fields:** Use a "minimalist float" style. A simple 1px bottom border in `#1b1c1c` or a full 4px-radius box with a very light `#efeded` fill.
- **Badges:** Utilizing JetBrains Mono, badges are rectangular with 4px padding. Statuses (e.g., "Confirmed", "In-Progress") use the Soft Gold background at 10% opacity with Deep Gold text.
- **Cards:** Cards should be border-heavy rather than shadow-heavy. Use 1px borders of `#efeded` to define sections.
- **Lists:** Clean dividers of 0.5px in `#efeded`. Use generous 16px vertical padding between list items to accommodate touch targets for professionals on the move.
- **Booking Calendar:** A custom component using high-contrast Charcoal for selected dates and Soft Gold dots for "High-Density" booking slots.