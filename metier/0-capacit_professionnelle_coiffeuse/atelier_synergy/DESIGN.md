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
  background: '#fcf8f8'
  on-background: '#1c1b1b'
  surface-variant: '#e5e2e1'
typography:
  display-lg:
    fontFamily: manrope
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: manrope
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: manrope
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: manrope
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: manrope
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-caps:
    fontFamily: jetbrainsMono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.05em
  label-technical:
    fontFamily: jetbrainsMono
    fontSize: 11px
    fontWeight: '400'
    lineHeight: 14px
  display-lg-mobile:
    fontFamily: manrope
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
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
  xl: 40px
  container-margin: 20px
  gutter: 12px
---

## Brand & Style
The design system for this platform prioritizes the intersection of high-end editorial aesthetics and enterprise-grade reliability. It serves a dual audience: the highly skilled afro/textured hair professional and the discerning premium client.

The visual direction is **Minimalist / Corporate Modern**. It leverages generous whitespace to create a "calm" atmosphere, reducing cognitive load during busy salon operations. The aesthetic is characterized by high-contrast monochrome foundations punctuated by refined metallic accents. Every element is designed to feel intentional, structured, and respectful of the craft it facilitates.

## Colors
The color palette is rooted in a "Charcoal and Bone" foundation. 

- **Primary:** Charcoal (#1b1c1c) is used for all primary actions, typography, and structural lines to maintain an authoritative, high-end feel.
- **Accent:** Soft Gold (#775a19) is used sparingly for highlights, verified statuses, or premium tier indicators. It should never exceed 5% of the screen real estate.
- **Surfaces:** Use #fbf9f8 as the primary canvas color. #efeded is reserved for secondary containers, input fields, or subtle section dividers to maintain a soft, tactile separation without harsh lines.
- **Accessibility:** Ensure all gold accents on light backgrounds meet WCAG AA standards by using the deeper (#775a19) variant for text and the lighter (#fed488) variant only for large decorative or background elements.

## Typography
The typography system balances the warmth of **Manrope** with the precision of **JetBrains Mono**.

- **Manrope** handles all human-centric information: names, services, pricing, and navigation. Use semi-bold weights for hierarchy rather than excessive color changes.
- **JetBrains Mono** is utilized strictly for technical data: appointment timestamps, SKU numbers, status badges (e.g., PENDING, COMPLETED), and metadata. This distinction reinforces the "Atelier" (craft) and "Synergy" (system) concept.
- **Hierarchy:** Maintain large margins around headlines. Body text should use a slightly increased line height (1.5x) to ensure legibility on mobile devices during active work sessions.

## Layout & Spacing
This design system utilizes a **Fluid-Fixed Hybrid** model optimized for professional mobile use. 

- **Grid:** A 4-column mobile grid with 20px outside margins and 12px gutters.
- **Rhythm:** All spacing must be a multiple of 4px. Use 24px (lg) for vertical section spacing and 16px (md) for internal component padding.
- **Safe Areas:** Adhere strictly to mobile safe areas. Content-heavy views (like schedules) should utilize a "sticky-header/scrollable-body" model to keep primary tools within the thumb-zone.

## Elevation & Depth
Depth is conveyed through **Tonal Layers** and **Low-Contrast Outlines** rather than heavy shadows.

- **Level 0 (Base):** #fbf9f8 (Surface Base).
- **Level 1 (Cards/Inputs):** #ffffff (White) with a 1px solid border of #efeded. No shadow.
- **Level 2 (Floating Elements):** #ffffff with a 1px border and an extremely soft ambient shadow (0px 4px 20px, 4% opacity Charcoal).
- **Separators:** Use 1px solid lines in #efeded for horizontal rules. Avoid dividers where whitespace can suffice to create grouping.

## Shapes
The shape language is "Soft-Mechanical." 

The default corner radius is **4px (0.25rem)**. This creates a professional, slightly architectural look that feels precise. 
- **Small Elements (Checkboxes/Badges):** 2px radius.
- **Standard Elements (Buttons/Inputs/Cards):** 4px radius.
- **Large Containers (Modals/Sheets):** 12px top-only radius to indicate overlay priority.

## Components

- **Buttons:** Primary buttons use Charcoal (#1b1c1c) backgrounds with White text. Secondary buttons use a 1px Charcoal border with no fill. Tertiary buttons are text-only with JetBrains Mono labels.
- **Inputs:** Fields use a White background with an #efeded border. On focus, the border transitions to Charcoal. Labels always use Manrope (body-md).
- **Status Badges:** Utilize JetBrains Mono (label-technical). "Verified" or "Premium" badges use a #fed488 (Soft Gold) background with #775a19 (Deep Gold) text.
- **Cards:** White background, 4px radius, 1px border in #efeded. Use internal padding of 16px.
- **Lists:** Clean rows separated by 1px #efeded lines. Use JetBrains Mono for right-aligned metadata (e.g., durations or prices).
- **Selection Controls:** Checkboxes and Radio buttons are Charcoal when active. Avoid rounded "toggle" switches; use square-ish checkboxes to align with the architectural style.
- **Scheduling Block:** A specialized component using a vertical timeline. The "Current Time" indicator should be a fine Charcoal line with a JetBrains Mono timestamp.