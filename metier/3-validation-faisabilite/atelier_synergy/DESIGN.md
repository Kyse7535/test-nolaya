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
  headline-xl:
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
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
  headline-md:
    fontFamily: Manrope
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
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
  label-status:
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
  margin-mobile: 20px
  margin-tablet: 40px
  gutter: 16px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 32px
---

## Brand & Style
The design system embodies a premium, editorial aesthetic tailored for the discerning textured hair professional. It prioritizes structure and calm, moving away from cluttered "salon" tropes toward a high-end atelier environment. 

The style is **Modern Minimalist with Tonal Sophistication**. It relies on expansive whitespace, a restricted color palette, and high-quality editorial photography to communicate value. The interface acts as a quiet, professional gallery that showcases the artistry of the professional and the beauty of textured hair (coils, curls, braids, locs). All interactions are intentional, avoiding excessive decoration in favor of clarity and prestige.

## Colors
The palette is rooted in a "Charcoal and Bone" foundation to create a high-contrast, editorial feel. 

- **Primary Charcoal (#1B1C1C):** Used for primary text, iconography, and high-priority call-to-action buttons. It provides the grounding weight for the system.
- **Gold Accents (#775A19 / #FED488):** These are "High-Value Highlights." Use them exclusively for premium tiers, luxury service markers, or critical success states. Never use gold for decorative flourishes.
- **Atmospheric Neutrals (#FBF9F8, #EFEDED):** These define the surface layers. The off-white (#FBF9F8) serves as the primary canvas to reduce eye strain compared to pure white, which is reserved for card interiors and elevated surfaces.
- **Exclusions:** This system strictly avoids gradients, neon colors, and dark mode transitions to maintain a consistent, physical-print editorial quality.

## Typography
The typography strategy creates a dialogue between modern geometric sans-serif and precise technical mono.

- **Manrope** is the primary voice. It should be typeset with slightly tighter letter-spacing for headlines to achieve a customized, premium look. Headlines use semi-bold and bold weights to provide structural hierarchy against the airy backgrounds.
- **JetBrains Mono** is used for "Technical Metadata." This includes appointment timestamps, SKU numbers, service durations, and status tags (e.g., "CONFIRMED", "IN-PROGRESS"). This provides a professional, functional contrast to the editorial body text.
- Use **Body-LG** for introductory paragraphs and **Body-MD** for standard UI copy.

## Layout & Spacing
The system utilizes a **Fluid-Inset Model**. While content is constrained by generous horizontal margins (20px on mobile), the vertical rhythm is driven by the "Stack" variables.

- **Editorial Breathing Room:** Sections should be separated by `stack-lg` (32px) to ensure the UI never feels crowded.
- **Mobile Grid:** A 4-column layout for mobile, moving to an 8-column layout for tablet.
- **Image-to-Copy Ratio:** High-quality imagery should occupy at least 40% of primary landing screens, utilizing full-bleed or large-margin containers to emphasize the "Atelier" feel.

## Elevation & Depth
In alignment with the premium, flat editorial style, this design system **eschews heavy shadows**. 

- **Depth through Tone:** Differentiation between elements is achieved through tonal shifts (e.g., a #FFFFFF card sitting on a #FBF9F8 background).
- **Ghost Outlines:** Use 1px solid borders in #EFEDED for secondary containers and input fields.
- **Active Elevation:** Only use a very subtle, highly-diffused ambient shadow (4% opacity Charcoal) for primary floating action buttons or top-level modal sheets to suggest they exist above the scroll.
- **Zero-Blur Borders:** Most containers should rely on their background color contrast rather than shadows to define their boundaries.

## Shapes
The shape language is **Structured and Softened**. 

A baseline radius of 4px (`0.25rem`) is applied to almost all components. This specific radius is enough to remove the "sharpness" of the digital screen while maintaining the professional, architectural feel of a high-end brand. 

- **Containers & Cards:** Use 4px for standard cards. 
- **Large Sections:** For large image containers or hero sections, use 8px (`rounded-lg`) to provide a gentler frame for photography.
- **Buttons:** Maintain the 4px standard; avoid pill-shapes to keep the aesthetic "structured" rather than "playful."

## Components
- **Buttons:** 
  - *Primary:* Charcoal (#1B1C1C) background with White text. 4px radius.
  - *Secondary:* Transparent background with a 1px Charcoal border.
  - *Premium:* Charcoal background with Gold (#FED488) text for exclusive member actions.
- **Input Fields:** 1px #EFEDED border, Manrope Body-MD text. Labels use JetBrains Mono in Charcoal at 60% opacity.
- **Chips/Status:** Use JetBrains Mono. Success states should use a subtle #775A19 (Gold) text on a #FBF9F8 background—never bright green.
- **Lists:** Clean dividers using 1px #EFEDED. High vertical padding (16px+) to maintain the editorial feel.
- **Cards:** White (#FFFFFF) background, 4px radius, 1px #EFEDED border. No shadow.
- **Service Tags:** Small, monospaced labels used to categorize hair textures (e.g., "4C", "3B").
- **Image Holders:** Always include a subtle 1px inner stroke on light images to ensure they don't bleed into the #FBF9F8 background.