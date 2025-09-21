import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-mystic hover:bg-primary/90 hover:shadow-glow",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border-2 border-primary/20 bg-transparent backdrop-blur-sm hover:bg-primary/10 hover:border-primary/40 hover:shadow-mystic",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent/20 hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        mystic: "bg-gradient-mystic text-white shadow-mystic hover:shadow-glow hover:scale-105",
        gold: "bg-gradient-gold text-foreground shadow-gold hover:shadow-glow hover:scale-105 font-semibold",
        glass: "glass-effect text-foreground hover:bg-white/20 hover:shadow-glow backdrop-blur-md",
        rose: "bg-gradient-rose text-white shadow-rose hover:shadow-glow hover:scale-105",
        lilac: "bg-gradient-lilac text-white shadow-lilac hover:shadow-glow hover:scale-105",
        mint: "bg-gradient-mint text-white shadow-mint hover:shadow-glow hover:scale-105",
        peach: "bg-gradient-peach text-white shadow-peach hover:shadow-glow hover:scale-105",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-full px-3",
        lg: "h-11 rounded-full px-8",
        icon: "h-10 w-10 rounded-full",
        xl: "h-12 rounded-full px-10 text-base",
        xxl: "h-14 rounded-full px-12 text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export { buttonVariants };
export type { VariantProps };
