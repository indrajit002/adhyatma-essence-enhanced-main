import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        mystic: {
          DEFAULT: "hsl(var(--mystic-purple))",
          light: "hsl(var(--mystic-light))",
          glow: "hsl(var(--mystic-glow))",
        },
        gold: {
          DEFAULT: "hsl(var(--gold-accent))",
          light: "hsl(var(--gold-light))",
        },
        peach: {
          DEFAULT: "hsl(var(--peach-soft))",
        },
        mint: {
          DEFAULT: "hsl(var(--mint-soft))",
        },
        rose: {
          DEFAULT: "hsl(var(--rose-soft))",
        },
        lilac: {
          DEFAULT: "hsl(var(--lilac-soft))",
        },
      },
      backgroundImage: {
        'gradient-mystic': 'var(--gradient-mystic)',
        'gradient-ethereal': 'var(--gradient-ethereal)',
        'gradient-glow': 'var(--gradient-glow)',
        'gradient-gold': 'var(--gradient-gold)',
        'gradient-soft': 'var(--gradient-soft)',
        'gradient-peach': 'var(--gradient-peach)',
        'gradient-mint': 'var(--gradient-mint)',
        'gradient-rose': 'var(--gradient-rose)',
        'gradient-lilac': 'var(--gradient-lilac)',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      boxShadow: {
        'mystic': 'var(--shadow-mystic)',
        'glow': 'var(--shadow-glow)',
        'soft': 'var(--shadow-soft)',
        'gold': 'var(--shadow-gold)',
        'peach': 'var(--shadow-peach)',
        'mint': 'var(--shadow-mint)',
        'rose': 'var(--shadow-rose)',
        'lilac': 'var(--shadow-lilac)',
      },
      fontFamily: {
        'playfair': ['Playfair Display', 'serif'],
        'inter': ['Inter', 'sans-serif'],
        'lobster': ['Lobster', 'Brush Script MT', 'Lucida Handwriting', 'Comic Sans MS', 'cursive', 'sans-serif'],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [tailwindcssAnimate],
} satisfies Config;
