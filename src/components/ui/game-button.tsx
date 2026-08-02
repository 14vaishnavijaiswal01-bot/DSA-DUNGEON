import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";
import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "relative inline-flex items-center justify-center gap-2 rounded-xl font-semibold tracking-wide transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-40 active:scale-[0.97] overflow-hidden",
  {
    variants: {
      variant: {
        primary:
          "text-primary-foreground bg-[image:var(--gradient-primary)] shadow-[var(--shadow-glow)] hover:brightness-110 hover:-translate-y-0.5",
        accent:
          "text-accent-foreground bg-[image:var(--gradient-accent)] shadow-[var(--shadow-glow-accent)] hover:brightness-110 hover:-translate-y-0.5",
        outline:
          "border border-border bg-card/40 text-foreground backdrop-blur-md hover:border-primary/60 hover:bg-card/70",
        ghost: "text-muted-foreground hover:text-foreground hover:bg-card/60",
        danger: "bg-destructive text-destructive-foreground hover:brightness-110",
        success: "bg-success text-success-foreground hover:brightness-110",
      },
      size: {
        sm: "h-9 px-4 text-xs",
        md: "h-11 px-6 text-sm",
        lg: "h-14 px-9 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props}>
        {children}
      </Comp>
    );
  },
);
Button.displayName = "Button";

export { buttonVariants };
