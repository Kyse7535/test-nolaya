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
  label-caps:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.05em
  label-tech:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '400'
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

The design system is rooted in **Editorial Minimalism** with a focus on high-end B2B2C hair care services. The brand personality is authoritative yet welcoming, bridging the gap between professional enterprise tools and a luxury salon experience. 

The aesthetic prioritizes whitespace and high-contrast photography of textured hair (braids, locs, coils). Drawing from modern editorial layouts, the UI uses structured grids and intentional typography to create a "Calm Tech" environment. Visual complexity is minimized to allow the craftsmanship of the stylists and the health of the hair to remain the focal point. 

Key characteristics include:
- **Quiet Luxury:** Premium feel achieved through spacing and precision rather than decorative elements.
- **Cultural Resonance:** Imagery and tone specifically curated for the Afro/textured hair community.
- **Enterprise Precision:** Functional clarity for business operations (B2B) combined with an accessible, high-end consumer interface (B2C).

## Colors

The palette is strictly high-contrast and professional, avoiding decorative gradients or neon tones.

- **Charcoal (#1B1C1C):** Used for primary text, iconography, and high-emphasis UI elements like primary buttons.
- **Soft Gold (Primary: #775A19 / Accent: #FED488):** Used sparingly. The deep gold (#775A19) is for priority interactive states or meaningful accents, while the lighter gold (#FED488) is reserved for status badges or subtle highlights.
- **Surfaces (#FBF9F8, #EFEDED):** Layered neutral tones create depth without the need for heavy shadows.
- **White (#FFFFFF):** The primary background color to ensure maximum readability and a clean editorial feel.

## Typography

Typography in the design system is a balance of human-centric geometry and technical precision.

- **Manrope** is the workhorse font, used for all primary UI, headlines, and body copy. It provides a modern, balanced look that feels professional yet approachable.
- **JetBrains Mono** is utilized strictly for utility and metadata. This includes status badges, technical hints (e.g., SKU numbers, timestamps), and "Label Caps" for section headers. This adds a "pro-tool" layer to the editorial aesthetic.

Headlines should use tight letter spacing for a more impactful, premium appearance. Body text remains standard for legibility.

## Layout & Spacing

The design system utilizes a **Fixed Grid** philosophy for desktop and a **Fluid Content** model for mobile.

- **Rhythm:** A 4px baseline grid ensures consistent vertical rhythm.
- **Mobile:** Uses a 4-column grid with 20px outside margins and 16px gutters.
- **Desktop:** Uses a 12-column centered grid (max-width 1280px) with 64px margins.
- **Editorial Breathing Room:** Generous use of `xl` (40px) spacing between major sections to maintain a premium, uncluttered feel. Elements should be grouped logically using `sm` (8px) for internal padding and `md` (16px) for component separation.

## Elevation & Depth

To maintain an editorial feel, the design system avoids heavy shadows in favor of **Tonal Layers** and **Ghost Borders**.

- **Surface Tiering:** Depth is communicated by placing Charcoal or White elements on #FBF9F8 or #EFEDED backgrounds.
- **Outlines:** Use 1px solid borders in #EFEDED for card containers and input fields.
- **Shadows:** When necessary for high-level overlays (modals), use a single "Ambient Shadow": `0px 4px 20px rgba(0, 0, 0, 0.05)`. This shadow should be nearly imperceptible, providing just enough lift to separate the element from the surface.

## Shapes

The shape language is a mix of **Soft** and **Sharp** to reflect "Professional Precision."

- **Soft (0.25rem / 4px):** Applied to interactive components like buttons, input fields, and standard cards. This provides a subtle approachability.
- **Sharp (0px):** Hero media, large imagery, and full-bleed containers use sharp corners to mimic the look of a premium fashion magazine or high-end lookbook.

## Components

### Buttons
- **Primary:** Solid Charcoal (#1B1C1C) with White text. 4px radius. High-contrast.
- **Secondary:** Outline Charcoal (1px) with Charcoal text.
- **Accent:** Solid Soft Gold (#775A19) used exclusively for "Book Now" or "Purchase" actions.

### Chips & Badges
- **Status Badges:** Use JetBrains Mono. Background in #FBF9F8 with a 1px border. For "Priority" statuses, use #FED488 background.
- **Service Chips:** Rounded-sm (4px), charcoal text on #EFEDED background.

### Input Fields
- Understated 1px #EFEDED border. On focus, the border transitions to Charcoal (#1B1C1C). Labels use Manrope Bold at 12px.

### Cards
- White background on #FBF9F8 surfaces. 1px #EFEDED border. No shadows. 
- Image containers within cards should maintain sharp 0px top corners if they are hero-led.

### Lists
- Clean dividers (1px #EFEDED). Generous vertical padding (16px) to ensure touch targets are accessible and the interface feels uncrowded.

### Specialized Components
- **The Lookbook Grid:** An asymmetrical grid for showcasing hair styles, mixing large "Hero" sharp-cornered images with smaller "Detail" images.
- **Stylist Profile:** Minimalist headers with high-resolution circular avatars (the only frequent use of circles) and JetBrains Mono "Years of Experience" badges.