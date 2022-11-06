import { classes } from "@/lib/helpers/common";
import { Slot } from "@radix-ui/react-slot";
import React, { forwardRef } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: "primary" | "pink" | "accent" | "accent-light" | "accent-light2";
  size?: "small" | "medium" | "large";
  rounded?: boolean;
  asChild?: boolean;
}

const Button: React.FC<ButtonProps> = forwardRef<
  HTMLButtonElement,
  ButtonProps
>(
  (
    {
      color = "primary",
      size = "medium",
      rounded = false,
      asChild,
      className,
      ...props
    },
    ref
  ) => {
    const Component = asChild ? Slot : "button";

    return (
      <Component
        ref={ref}
        className={classes(
          `inline-flex items-center justify-center bg-${
            color !== "pink" && color
          } transition-colors text-text border border-transparent font-medium rounded-lg shadow-sm focus:outline-none`,
          size === "small" && "px-2.5 py-1.5 text-xs",
          size === "medium" && "px-3 py-2 text-sm",
          size === "large" && "px-4 py-2 text-base",
          rounded && "rounded-full",
          color === "accent" &&
            "hover:bg-accent-dark dark:hover:bg-accent-light",
          color === "accent-light" && "hover:bg-accent",
          color === "accent-light2" && "hover:bg-accent-light",
          color === "pink" && "text-white bg-pink-600 hover:!bg-pink-700",
          color === "primary" &&
            "!text-white hover:bg-primary-dark shadow-[inset_0_0_0.2em_0_var(--primary),_0_0_0.2em_0_var(--primary)]",
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export default Button;
