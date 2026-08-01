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
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Manrope
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-technical:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.05em
  label-caps:
    fontFamily: Manrope
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.1em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 4px
  container-margin: 20px
  gutter: 12px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 32px
  section-gap: 48px
---

## Brand & Style

This design system embodies a "Premium Editorial" aesthetic tailored for the high-end Afro and textured hair industry. It balances the structural rigors of a B2B enterprise platform with the tactile, high-fashion sensibilities of a luxury lifestyle brand. 

The visual narrative is built on **Calm Minimalism**. It prioritizes heavy functional whitespace and a disciplined, high-contrast palette to ensure that hair artistry—captured in high-resolution photography—remains the focal point. The emotional response is one of expertise, heritage, and precision. By avoiding ephemeral trends like gradients or glassmorphism, the system establishes a timeless, trustworthy environment for both salon professionals and discerning clients.

## Colors

The palette is rooted in an "Ink and Parchment" philosophy, utilizing a stark contrast between deep charcoals and warm, off-white surfaces.

- **Primary (Charcoal):** Used for primary actions, heavy typography, and structural borders. It represents the "Atelier" (the workshop) and provides professional gravity.
- **Accent (Soft Gold & Muted Sand):** Used with extreme restraint. Soft Gold (#775A19) is reserved for active states, premium badges, or verification icons. The lighter gold (#FED488) acts as a high-visibility highlight for secondary interactions or technical status indicators when paired with JetBrains Mono.
- **Surfaces:** A layered approach using #FBF9F8 as the base, #FFFFFF for interactive cards, and #EFEDED for subtle structural separation. This prevents the "clinical" feel of pure white while maintaining a clean, high-end editorial look.

## Typography

The typographic hierarchy distinguishes between the **User Interface (Manrope)** and **Technical Metadata (JetBrains Mono)**.

Manrope provides a modern, refined grotesque feel that remains legible across dense booking schedules and client profiles. Large displays should utilize tight letter-spacing and bold weights to mimic fashion mastheads. 

JetBrains Mono is used exclusively for "System Truths"—booking IDs, price points, timestamps, and status labels. This monospaced contrast signals to the professional user that they are looking at raw data or technical confirmation, separating it from the fluid, conversational UI.

## Layout & Spacing

This design system employs a **mobile-first 4px base grid**. 

- **Layout Model:** A fluid grid with fixed outer margins of 20px on mobile. Elements should adhere to a strict vertical rhythm using multiples of 8px (2 units).
- **Whitespace:** Emphasize "luxury of space." Section headers should have significant clearance (stack-lg) from the content below to maintain an editorial feel.
- **Mobile Constraints:** Horizontal scrolling "shelves" should be used for hair style galleries, allowing the user to browse without vertical clutter. Insets for cards should be consistent at 16px (stack-md).

## Elevation & Depth

To maintain a premium, flat editorial feel, this design system **eschews traditional shadows**. Depth is created through:

1.  **Tonal Layering:** Interactive elements sit on #FFFFFF surfaces, while the background remains #FBF9F8.
2.  **Hairline Borders:** Use 1px solid borders in #EFEDED or #1B1C1C (for primary elements) to define boundaries.
3.  **Contrast Inversion:** Depth is signaled by switching background colors. A "raised" state or a primary call-to-action is often a solid Charcoal block with white text, rather than a shadowed button.
4.  **Strategic Blurs:** For modal overlays, use a subtle background dim (30% opacity Charcoal) to maintain focus without introducing complex shadow physics.

## Shapes

The shape language is "Architectural." All containers, buttons, and input fields utilize a **0.25rem (4px) corner radius**. This slight softening prevents the UI from feeling aggressive while maintaining the professional precision of a B2B platform. 

Images of hair (which are naturally organic and curvilinear) should remain sharp-edged or follow the 4px radius to provide a structural frame for the "fluidity" of the texture being showcased.

## Components

- **Buttons:** Primary buttons are solid Charcoal (#1B1C1C) with white Manrope text. Secondary buttons use a 1px Charcoal border. Small utility buttons or technical actions can use JetBrains Mono for the label.
- **Technical Badges:** Status indicators (e.g., "CONFIRMED", "IN-PROGRESS") use JetBrains Mono in uppercase, housed in a Soft Gold (#FED488) pill or a light neutral box.
- **Input Fields:** Minimalist design with only a bottom-border in #1B1C1C for a "ledger" look, or a full 1px border in #EFEDED. Labels sit above in Manrope (body-sm).
- **Cards:** Cards should be flat with a 1px border (#EFEDED). No shadows. Padding within cards is strictly 16px or 20px.
- **Service Chips:** Small, rectangular chips (4px radius) with #FBF9F8 backgrounds and Charcoal text, used for tags like "Locs," "Silk Press," or "Level 4 Stylist."
- **List Items:** Separated by 1px hairlines. High touch-targets (44px minimum height) with Manrope body-lg text.