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
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Manrope
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
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
  body-md:
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
  unit: 4px
  margin-mobile: 20px
  gutter-mobile: 12px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 32px
---

## Brand & Style
The design system is a premium, high-utility mobile framework specifically tailored for the professional Afro and textured hair industry. It bridges the gap between enterprise-grade scheduling and high-fashion editorial aesthetics. 

The visual identity is rooted in **Minimalism** with an **Editorial** focus. It prioritizes clarity, calm, and high-quality imagery of diverse hair textures. The interface remains quiet to let the rich photography of curls and coils serve as the primary visual driver. The emotional response is one of expertise, luxury, and cultural resonance—avoiding the clinical feel of standard SaaS in favor of a sophisticated, high-end salon atmosphere.

## Colors
The palette is built on a foundation of "Charcoal and Cream" to ensure a timeless, premium feel.

- **Primary (Charcoal):** Used for typography, navigation elements, and primary icons. It provides a grounded, authoritative contrast against light surfaces.
- **Accents (Golds):** Soft Gold (#775A19) and Pale Gold (#FED488) are used sparingly for success states, premium features, or subtle call-to-actions. They should never overwhelm the layout.
- **Neutrals (Off-White):** Off-white (#FBF9F8) and light grey (#EFEDED) surfaces are used to create "tonal depth" without relying on shadows.
- **Prohibited:** Neon colors, purples, and aggressive gradients are strictly forbidden to maintain the professional B2B2C tone.

## Typography
This design system utilizes a dual-font strategy to balance elegance with technical precision.

- **Manrope:** Serves as the primary workhorse for all UI elements and body copy. It is modern, refined, and highly legible at small mobile sizes.
- **JetBrains Mono:** Used exclusively for status badges, technical hints (e.g., SKU numbers, appointment durations), and utility labels. This adds a "pro-tool" layer to the interface, signaling precision to business users.
- **Scale:** Large display titles are used on landing or profile views, while condensed headings are favored for functional list-heavy screens.

## Layout & Spacing
The system follows a **4px baseline grid** with a fluid-width column model for mobile.

- **Margins:** Standard 20px horizontal margins for mobile screens to ensure content doesn't feel cramped against device edges.
- **Gutters:** 12px gutters between cards or list items.
- **Rhythm:** Vertical spacing is generous. Use `stack-lg` (32px) to separate logical sections and `stack-sm` (8px) for grouping related labels and inputs.
- **Whitespace:** Emphasize "calm editorial whitespace." Do not fill every pixel; prioritize breathability to allow the user to focus on hair texture details in the photography.

## Elevation & Depth
In alignment with the premium, understated aesthetic, this design system avoids heavy drop shadows.

- **Tonal Layering:** Depth is achieved by placing elements on different surface colors. For example, a card (#FFFFFF) sitting on a background (#FBF9F8).
- **Ghost Outlines:** Instead of shadows, use 1px solid borders in #EFEDED or #1B1C1C (at low opacity) to define boundaries.
- **Active States:** Subtle shifts in background color (e.g., white to #EFEDED) indicate interactivity.
- **Exception:** For high-priority floating elements (like a "Book Now" FAB), a minimal, highly diffused 10% opacity black shadow may be used.

## Shapes
The shape language is structured and architectural. 

- **Radius:** A consistent **0.25rem (4px)** radius is applied to all buttons, input fields, and cards. This provides a "soft-brutalist" edge that feels more professional and precise than fully rounded "bubbly" designs.
- **Containers:** Large image containers and hero sections maintain this 4px radius, ensuring a cohesive look across the entire UI.
- **Icons:** Use linear, 2px stroke icons with slightly rounded caps to match the typography.

## Components
- **Buttons:** Primary buttons are solid Charcoal (#1B1C1C) with white Manrope text. Secondary buttons are outlined in Charcoal. Small "utility" buttons use the Soft Gold (#775A19) for text-only interactions.
- **Chips/Badges:** These must use **JetBrains Mono**. Status badges (e.g., "Confirmed," "In-Progress") use a light grey fill with charcoal text. No high-saturation background colors.
- **Lists:** High-density lists (for client management) feature 1px bottom borders in #EFEDED. Profile avatars are square with the 4px radius.
- **Input Fields:** Minimalist design with a 1px bottom border that transforms into a full 1px Charcoal box on focus.
- **Cards:** White surfaces with 4px radius. Card titles use `headline-sm` and secondary data uses `label-mono`.
- **Image Treatment:** Photography of textured hair should be high-resolution, avoiding filters that distort natural curl patterns. Images are always framed with the 4px corner radius.