---
name: Nolaya
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
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Manrope
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.01em
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
  button-text:
    fontFamily: Manrope
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.02em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 48px
  3xl: 64px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 40px
---

## Brand & Style

The design system is crafted for the intersection of artisanal skill and professional enterprise. It targets high-end Afro and textured hair specialists who require a tool that mirrors the premium nature of their service. The brand personality is **calm, professional, and authoritative**, evoking the feeling of a high-end physical atelier.

The visual style is a blend of **Minimalism and Corporate Modern**, characterized by:
- **Editorial Whitespace:** Generous breathing room to emphasize clarity and premium positioning.
- **Precision:** A focus on alignment and structured information density.
- **Subtlety:** Eschewing loud effects in favor of high-quality typography and a restrained color palette.
- **Tactile Professionalism:** Using soft 4px radii and micro-interactions to provide a modern, responsive feel without sacrificing the "serious" nature of a B2B2C platform.

## Colors

The palette is rooted in a sophisticated, high-contrast foundation designed for maximum legibility and an "enterprise-luxury" aesthetic.

- **Primary (Charcoal):** Used for primary text, main navigation elements, and high-emphasis buttons. It provides a grounded, authoritative weight.
- **Accent (Soft Gold):** The primary gold (#775A19) is reserved for meaningful actions, brand highlights, and active states. The light gold (#FED488) is used for subtle backgrounds, low-contrast badges, or decorative highlights.
- **Surfaces:** The background uses a soft off-white (#FBF9F8) to reduce eye strain, while cards and containers utilize pure white (#FFFFFF) to create clear visual separation.
- **Borders:** A consistent light grey (#EFEDED) is used for structural definition, keeping the UI clean and airy.

## Typography

This design system uses a dual-font strategy to balance editorial elegance with technical precision.

- **Manrope** is the workhorse font, used for all headlines, body copy, and UI labels. Its geometric yet warm character ensures readability across both large-scale brand messaging and dense data tables.
- **JetBrains Mono** is utilized exclusively for technical meta-data, status badges, timestamps, and ID strings. This provides a clear "functional" layer that distinguishes administrative data from user-generated content.

**Usage Rules:**
- Keep tracking tight on large headings to maintain a modern, "impactful" look.
- Use `label-mono` in all-caps when used in status chips to maximize professional utility.

## Layout & Spacing

The layout philosophy follows a **Fixed Grid** approach for internal application views and a **Fluid Content** model for marketing or gallery sections.

- **Desktop:** 12-column grid with 24px gutters. Content should be centered with a max-width of 1440px.
- **Tablet:** 8-column grid with 24px gutters.
- **Mobile:** 4-column grid with 16px gutters and 16px side margins.

**Rhythm:**
Spacing is strictly based on a 4px (unit) scale. Use `lg` (24px) for standard padding within cards and `2xl` (48px) for vertical section spacing. Vertical rhythm should prioritize white space to maintain the "Atelier" editorial feel.

## Elevation & Depth

To maintain a premium, understated aesthetic, this design system avoids heavy shadows and deep stacking. 

- **Tonal Layers:** Depth is primarily conveyed through the contrast between the neutral background (#FBF9F8) and pure white (#FFFFFF) card surfaces. 
- **Low-Contrast Outlines:** Use 1px borders (#EFEDED) for most containers and input fields.
- **Minimal Elevation:** If a shadow is necessary for context (e.g., a floating menu), use a "Ghost Shadow": `0px 4px 12px rgba(27, 28, 28, 0.04)`.
- **Interactive Depth:** On hover, a card may transition from a light border to a slightly darker one (#DEDCDC), rather than lifting off the page.

## Shapes

The shape language is defined by a **Soft (4px)** radius. This subtle rounding maintains a professional, architectural feel while softening the edges enough to appear modern and accessible.

- **Base Radius:** 4px (0.25rem) for buttons, input fields, and small components.
- **Large Radius:** 8px (0.5rem) for cards and containers.
- **Pill (Exceptions):** Badges and tags using JetBrains Mono may use a full pill radius to differentiate them as discrete "technical tokens."

## Components

### Buttons
- **Primary:** Solid Charcoal (#1B1C1C) with White text. 4px radius. 
- **Secondary:** Outlined Soft Gold (#775A19) with 1px border.
- **Tertiary:** Text-only, Soft Gold, bold weight.
- **Touch Targets:** Minimum 44px height for all interactive elements.

### Inputs & Selects
- 1px border (#EFEDED), 4px radius, pure white background.
- Focus state: 1px border becomes Soft Gold (#775A19) with a 2px outer "glow" using the light gold at 20% opacity.

### Chips & Badges
- Use **JetBrains Mono** for content. 
- Backgrounds should be light (Light Gold or Neutral) with high-contrast text.
- 4px radius or full pill.

### Cards
- White background (#FFFFFF), 8px radius, 1px border (#EFEDED). 
- No shadows unless the card is part of a drag-and-drop interaction.

### Specialist-Specific Components
- **Portfolio Grid:** Use sharp-edged imagery within 8px rounded containers to maintain the "Atelier" look.
- **Booking Calendar:** High-density Manrope typography, using Soft Gold for "Available" slots and Charcoal for "Booked."
- **Service Tags:** Small, mono-spaced tags identifying hair textures (e.g., 4C, 4B) using JetBrains Mono for a technical, expert classification feel.