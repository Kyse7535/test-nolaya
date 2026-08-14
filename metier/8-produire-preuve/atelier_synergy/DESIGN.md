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
  tertiary: '#000101'
  on-tertiary: '#ffffff'
  tertiary-container: '#1b1c1c'
  on-tertiary-container: '#848484'
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
  tertiary-fixed: '#e4e2e2'
  tertiary-fixed-dim: '#c7c6c6'
  on-tertiary-fixed: '#1b1c1c'
  on-tertiary-fixed-variant: '#464747'
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
  label-caps:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.05em
  mono-data:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
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
  xxl: 48px
  gutter: 16px
  margin-mobile: 20px
---

## Brand & Style

The design system is rooted in a **Premium Enterprise** aesthetic, specifically tailored for the luxury textured hair market. The brand personality is authoritative yet serene, balancing the structural rigor of a B2B platform with the high-touch editorial feel of a luxury salon.

The style leverages **Minimalism** with a focus on "Calm Editorial Whitespace." It avoids trendy digital effects like glassmorphism or neomorphism in favor of clear hierarchy, high-quality photography, and precise alignment. The emotional response should be one of competence, respect, and quiet sophistication, centering the needs of Black and mixed-race women and the professionals who serve them.

## Colors

The palette is intentionally restrained to allow professional photography—capturing the richness of hair textures and skin tones—to take center stage.

- **Primary (Charcoal):** Used for typography, icons, and high-emphasis interactive states.
- **Secondary (Soft Gold):** Reserved for moments of excellence, premium membership indicators, or subtle accents. It is never used for primary action buttons.
- **Surface Strategy:** Use `#FBF9F8` as the primary application background. Use `#FFFFFF` for cards and content containers to create a subtle "lift." Use `#EFEDED` for structural elements like dividers, search bars, or secondary utility backgrounds.
- **Status:** Adhere to a monochrome status philosophy. Use the Primary Charcoal or Status Black for success/error states through iconography and clear messaging rather than traffic-light colors, maintaining the premium editorial feel.

## Typography

The typographic system utilizes **Manrope** for its modern, balanced, and highly legible sans-serif qualities across UI and editorial content. 

**JetBrains Mono** is introduced for technical metadata, badges, and professional data points (e.g., appointment IDs, time slots, pricing codes). This creates a functional contrast that reinforces the "Enterprise" aspect of the platform.

For mobile accessibility, body text never drops below 14px. Headlines utilize a slight negative letter-spacing to appear tighter and more professional at larger scales.

## Layout & Spacing

This design system uses a **Fluid Grid** model based on a 4px baseline shift. 

- **Mobile Layout:** 4-column grid with 20px outside margins and 16px gutters.
- **Touch Targets:** All interactive elements must maintain a minimum hit area of 44x44px, even if the visual asset is smaller.
- **Vertical Rhythm:** Use 24px (lg) spacing between logical sections and 8px (sm) between related elements (e.g., a label and its input field).
- **Whitespace:** Emphasize "Editorial Whitespace" by using 48px (xxl) padding at the top of major views to give the content room to breathe.

## Elevation & Depth

This system avoids heavy drop shadows and aggressive blurs. Depth is communicated through **Tonal Layering** and **Low-Contrast Outlines**.

- **Level 0 (Base):** Surface `#FBF9F8`.
- **Level 1 (Cards):** Pure White `#FFFFFF` with a 1px border of `#EFEDED`. No shadow.
- **Interaction:** On press, elements may transition to a slightly darker background (e.g., `#EFEDED`) or use a subtle 2px inset stroke.
- **Floating Actions:** If a floating element is required, use a high-diffuse "Ambient Shadow" (10% opacity Charcoal, 12px blur, 4px Y-offset) to keep the look soft and realistic.

## Shapes

The shape language is defined by **Soft** (0.25rem / 4px) roundedness. This provides a clean, architectural feel that is more professional than "bubbly" rounded corners but more approachable than sharp 90-degree angles.

- **Standard Elements:** Buttons, Input Fields, and Chips use a 4px radius.
- **Containers:** Large cards or bottom sheets may use `rounded-lg` (8px) or `rounded-xl` (12px) for the top corners to provide a gentle enclosure for content.

## Components

- **Buttons:** Primary buttons are Solid Charcoal (`#1B1C1C`) with White text. Secondary buttons are outlined with a 1px border of `#1B1C1C`. Gold is never used for background fills of buttons.
- **Input Fields:** Use a 1px `#EFEDED` border on a `#FFFFFF` background. Labels are `body-md` in Charcoal. Focus states use a 1.5px Charcoal border.
- **Chips/Badges:** Use JetBrains Mono for the text. Use `#EFEDED` backgrounds with Charcoal text for standard categories. Gold backgrounds with White text are reserved for "Premium" or "Elite" professional tiers.
- **Lists:** Clean dividers of 1px `#EFEDED`. Use 16px horizontal padding and 12px vertical padding for list items to ensure accessible touch targets.
- **Cards:** White background, 4px radius, 1px border of `#EFEDED`. Use 16px internal padding.
- **Specialized Components:** 
    - *Texture Swatches:* Circular thumbnails for hair texture types.
    - *Portfolio Blocks:* Square aspect ratio images with minimal metadata using JetBrains Mono.
    - *Calm Progress:* Thin 2px progress bars in Charcoal rather than thick colored loaders.