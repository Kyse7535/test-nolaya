import forms from '@tailwindcss/forms'
import containerQueries from '@tailwindcss/container-queries'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      "colors": {
        "surface-container-low": "#f5f3f2",
        "on-secondary-fixed-variant": "#5c4200",
        "error": "#ba1a1a",
        "primary-container": "#1b1c1c",
        "on-background": "#1b1c1b",
        "on-error-container": "#93000a",
        "surface-container-lowest": "#ffffff",
        "on-primary": "#ffffff",
        "on-surface-variant": "#444748",
        "secondary-container": "#fdd587",
        "on-surface": "#1b1c1b",
        "on-tertiary": "#ffffff",
        "surface-bright": "#fbf9f8",
        "background": "#fbf9f8",
        "surface-dim": "#dbdad9",
        "on-secondary": "#ffffff",
        "tertiary": "#000000",
        "tertiary-container": "#271900",
        "primary": "#000101",
        "on-secondary-container": "#785a19",
        "inverse-primary": "#c7c6c6",
        "surface-variant": "#e4e2e1",
        "surface": "#fbf9f8",
        "on-tertiary-fixed": "#271900",
        "on-primary-fixed-variant": "#464747",
        "on-error": "#ffffff",
        "inverse-on-surface": "#f2f0ef",
        "surface-container-high": "#e9e8e7",
        "surface-tint": "#5e5e5e",
        "surface-container-highest": "#e4e2e1",
        "primary-fixed-dim": "#c7c6c6",
        "tertiary-fixed-dim": "#e9c177",
        "on-secondary-fixed": "#261900",
        "primary-fixed": "#e3e2e2",
        "secondary-fixed-dim": "#e8c176",
        "on-primary-container": "#848484",
        "tertiary-fixed": "#ffdea6",
        "on-primary-fixed": "#1b1c1c",
        "error-container": "#ffdad6",
        "on-tertiary-fixed-variant": "#5d4201",
        "secondary-fixed": "#ffdea3",
        "outline": "#747878",
        "on-tertiary-container": "#a17f3c",
        "secondary": "#775a19",
        "surface-container": "#efedec",
        "inverse-surface": "#303030",
        "outline-variant": "#c4c7c7"
      },
      "spacing": {
        "md": "16px",
        "unit": "4px",
        "xs": "4px",
        "3xl": "64px",
        "gutter": "24px",
        "2xl": "48px",
        "xl": "32px",
        "margin-mobile": "16px",
        "margin-desktop": "40px",
        "sm": "8px",
        "lg": "24px",
        "container-margin": "20px",
        "container-max": "1280px",
        "base": "0.25rem",
        "section-gap": "48px",
        "stack-lg": "32px",
        "stack-md": "16px",
        "stack-sm": "8px",
        "margin-tablet": "40px",
        "safe": "env(safe-area-inset-bottom)",
        "gutter-mobile": "12px",
        "xxl": "48px"
      },
      "fontFamily": {
        "headline-md": [
          "Manrope",
          "ui-sans-serif",
          "system-ui",
          "sans-serif"
        ],
        "body-sm": [
          "Manrope",
          "ui-sans-serif",
          "system-ui",
          "sans-serif"
        ],
        "headline-sm": [
          "Manrope",
          "ui-sans-serif",
          "system-ui",
          "sans-serif"
        ],
        "display-lg-mobile": [
          "Manrope",
          "ui-sans-serif",
          "system-ui",
          "sans-serif"
        ],
        "display-lg": [
          "Manrope",
          "ui-sans-serif",
          "system-ui",
          "sans-serif"
        ],
        "button-text": [
          "Manrope",
          "ui-sans-serif",
          "system-ui",
          "sans-serif"
        ],
        "body-md": [
          "Manrope",
          "ui-sans-serif",
          "system-ui",
          "sans-serif"
        ],
        "label-mono": [
          "JetBrains Mono",
          "ui-monospace",
          "monospace"
        ],
        "body-lg": [
          "Manrope",
          "ui-sans-serif",
          "system-ui",
          "sans-serif"
        ],
        "label-technical": [
          "JetBrains Mono",
          "ui-monospace",
          "monospace"
        ],
        "label-caps": [
          "JetBrains Mono",
          "ui-monospace",
          "monospace"
        ],
        "label-sm": [
          "JetBrains Mono",
          "ui-monospace",
          "monospace"
        ],
        "label-micro": [
          "JetBrains Mono",
          "ui-monospace",
          "monospace"
        ],
        "headline-lg": [
          "Manrope",
          "ui-sans-serif",
          "system-ui",
          "sans-serif"
        ],
        "headline-lg-mobile": [
          "Manrope",
          "ui-sans-serif",
          "system-ui",
          "sans-serif"
        ],
        "h1-mobile": [
          "Manrope",
          "ui-sans-serif",
          "system-ui",
          "sans-serif"
        ],
        "h2": [
          "Manrope",
          "ui-sans-serif",
          "system-ui",
          "sans-serif"
        ],
        "h1": [
          "Manrope",
          "ui-sans-serif",
          "system-ui",
          "sans-serif"
        ],
        "headline-xl": [
          "Manrope",
          "ui-sans-serif",
          "system-ui",
          "sans-serif"
        ],
        "label-status": [
          "JetBrains Mono",
          "ui-monospace",
          "monospace"
        ],
        "caption": [
          "Manrope",
          "ui-sans-serif",
          "system-ui",
          "sans-serif"
        ],
        "label-tech": [
          "JetBrains Mono",
          "ui-monospace",
          "monospace"
        ],
        "mono-data": [
          "JetBrains Mono",
          "ui-monospace",
          "monospace"
        ],
        "sans": [
          "Manrope",
          "ui-sans-serif",
          "system-ui",
          "sans-serif"
        ],
        "mono": [
          "JetBrains Mono",
          "ui-monospace",
          "monospace"
        ]
      },
      "fontSize": {
        "headline-md": [
          "24px",
          {
            "lineHeight": "32px",
            "fontWeight": "600"
          }
        ],
        "body-sm": [
          "14px",
          {
            "lineHeight": "20px",
            "fontWeight": "400"
          }
        ],
        "headline-sm": [
          "20px",
          {
            "lineHeight": "28px",
            "fontWeight": "600"
          }
        ],
        "headline-sm-mobile": [
          "20px",
          {
            "lineHeight": "28px",
            "fontWeight": "600"
          }
        ],
        "headline-md-mobile": [
          "24px",
          {
            "lineHeight": "32px",
            "fontWeight": "600"
          }
        ],
        "display-lg-mobile": [
          "32px",
          {
            "lineHeight": "40px",
            "letterSpacing": "-0.01em",
            "fontWeight": "700"
          }
        ],
        "display-lg": [
          "48px",
          {
            "lineHeight": "56px",
            "letterSpacing": "-0.02em",
            "fontWeight": "700"
          }
        ],
        "button-text": [
          "14px",
          {
            "lineHeight": "20px",
            "letterSpacing": "0.02em",
            "fontWeight": "600"
          }
        ],
        "body-md": [
          "16px",
          {
            "lineHeight": "24px",
            "fontWeight": "400"
          }
        ],
        "label-mono": [
          "12px",
          {
            "lineHeight": "16px",
            "letterSpacing": "0.05em",
            "fontWeight": "500"
          }
        ],
        "body-lg": [
          "18px",
          {
            "lineHeight": "28px",
            "fontWeight": "400"
          }
        ],
        "label-technical": [
          "11px",
          {
            "lineHeight": "14px",
            "fontWeight": "400"
          }
        ],
        "label-caps": [
          "12px",
          {
            "lineHeight": "16px",
            "letterSpacing": "0.05em",
            "fontWeight": "500"
          }
        ],
        "label-sm": [
          "12px",
          {
            "lineHeight": "1.5",
            "fontWeight": "500"
          }
        ],
        "label-micro": [
          "10px",
          {
            "lineHeight": "14px",
            "letterSpacing": "0.05em",
            "fontWeight": "500"
          }
        ],
        "icon-xs": ["14px", { "lineHeight": "1" }],
        "icon-sm": ["16px", { "lineHeight": "1" }],
        "icon": ["18px", { "lineHeight": "1" }],
        "icon-md": ["20px", { "lineHeight": "1" }],
        "icon-lg": ["24px", { "lineHeight": "1" }],
        "icon-xl": ["28px", { "lineHeight": "1" }],
        "icon-2xl": ["32px", { "lineHeight": "1" }],
        "headline-lg": [
          "24px",
          {
            "lineHeight": "1.2",
            "fontWeight": "700"
          }
        ],
        "headline-lg-mobile": [
          "20px",
          {
            "lineHeight": "1.2",
            "fontWeight": "700"
          }
        ],
        "h1-mobile": [
          "24px",
          {
            "lineHeight": "32px",
            "letterSpacing": "-0.01em",
            "fontWeight": "700"
          }
        ],
        "h2": [
          "24px",
          {
            "lineHeight": "32px",
            "letterSpacing": "-0.01em",
            "fontWeight": "600"
          }
        ],
        "h1": [
          "32px",
          {
            "lineHeight": "40px",
            "letterSpacing": "-0.02em",
            "fontWeight": "700"
          }
        ],
        "headline-xl": [
          "40px",
          {
            "lineHeight": "48px",
            "letterSpacing": "-0.02em",
            "fontWeight": "700"
          }
        ],
        "label-status": [
          "11px",
          {
            "lineHeight": "14px",
            "fontWeight": "400"
          }
        ],
        "caption": [
          "12px",
          {
            "lineHeight": "16px",
            "fontWeight": "500"
          }
        ],
        "label-tech": [
          "12px",
          {
            "lineHeight": "16px",
            "fontWeight": "400"
          }
        ],
        "mono-data": [
          "13px",
          {
            "lineHeight": "18px",
            "fontWeight": "400"
          }
        ]
      },
      "borderRadius": {
        "DEFAULT": "0.125rem",
        "lg": "0.25rem",
        "xl": "0.5rem",
        "full": "0.75rem"
      }
    },
  },
  plugins: [forms, containerQueries],
}
