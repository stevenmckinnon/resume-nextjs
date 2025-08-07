import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all duration-300 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 hover:shadow-xl dark:bg-primary dark:text-primary-foreground dark:hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-lg hover:bg-destructive/90 hover:shadow-xl dark:bg-destructive dark:text-destructive-foreground dark:hover:bg-destructive/90",
        outline:
          "border border-input bg-background text-foreground shadow-lg hover:bg-accent hover:text-accent-foreground hover:shadow-xl dark:border-border dark:bg-background dark:text-foreground dark:hover:bg-accent dark:hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-lg hover:bg-secondary/80 hover:shadow-xl dark:bg-secondary dark:text-secondary-foreground dark:hover:bg-secondary/80",
        ghost: 
          "bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground shadow-none dark:bg-transparent dark:text-foreground dark:hover:bg-accent dark:hover:text-accent-foreground",
        link: 
          "bg-transparent text-primary underline-offset-4 hover:underline shadow-none dark:bg-transparent dark:text-primary",
      },
      size: {
        default: "h-11 px-8 py-2",
        sm: "h-8 rounded-full px-3 text-xs",
        lg: "h-10 rounded-full px-8",
        icon: "h-9 w-9 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        style={{
          // Add subtle inner glow effect
          boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 1px 3px rgba(0, 0, 0, 0.1)',
        }}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
