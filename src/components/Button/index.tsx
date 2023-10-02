import { classes } from "@/lib/helpers/common";
import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import React, { forwardRef } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: "primary" | "pink" | "accent" | "accent2" | "accent3";
  size?: "small" | "medium" | "large";
  outlined?: boolean;
  rounded?: boolean;
  asChild?: boolean;
  fit?: boolean;
}

const Button: React.FC<ButtonProps> = forwardRef<
  HTMLButtonElement,
  ButtonProps
>(
  (
    {
      color = "primary",
      size = "medium",
      outlined = false,
      rounded = false,
      asChild,
      fit = false,
      type = "button",
      className,
      ...props
    },
    ref
  ) => {
    const Component = asChild ? Slot : "button";

    return (
      <Component
        ref={ref}
        className={cn(
          `inline-flex gap-1 items-center justify-center bg-${color !== "pink" && color
          } transition-colors text-text border border-transparent font-medium rounded-lg shadow-sm focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed`,
          fit && "w-fit",
          outlined && `border-${color} bg-transparent text-${color}`,
          size === "small" && "px-2.5 py-1.5 text-xs",
          size === "medium" && "px-3 py-2 text-sm",
          size === "large" && "px-4 py-2 text-base",
          rounded && "btn-icon",
          color === "accent" && "hover:bg-accent2",
          color === "accent2" && "hover:bg-accent3",
          color === "accent3" && "hover:bg-accent4",
          color === "pink" && "text-white bg-pink-600 hover:!bg-pink-700",
          color === "primary" &&
          "!text-white hover:bg-primary2 shadow-[inset_0_0_0.2em_0_var(--primary),_0_0_0.2em_0_var(--primary)]",
          className,
          (props.children as any)?.props?.href &&
          "!p-0 !text-primary-light2 hover:underline !bg-transparent shadow-none"
        )}
        type={type}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export default Button;
