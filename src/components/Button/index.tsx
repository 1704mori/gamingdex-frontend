import { classes } from "@/lib/helpers/common";
import React, { forwardRef } from "react";
import Spinner from "../Spinner";

type ButtonProps = {
  icon?: React.ReactNode;
  iconAlign?: "left" | "right";
  children?: React.ReactNode;
  className?: string;
  as?: "anchor";
  color?:
    | "primary"
    | "secondary"
    | "success"
    | "danger"
    | "warning"
    | "transparent";
  outlined?: boolean;
  href?: string;
  loading?: boolean;
  rounded?: boolean;
  noStyles?: boolean;
  styles?: "text";
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const {
    icon,
    className,
    iconAlign = "left",
    color = "primary",
    as = "button",
    type = "button",
    noStyles = false,
    children,
    loading,
    rounded,
    href,
    onClick,
    outlined,
    styles,
    ...rest
  } = props;

  function getButtonColors(color: ButtonProps["color"] = "primary") {
    const colors = {
      primary:
        "bg-primary-300 text-white hover:bg-primary-200 transition-colors",
      secondary: "bg-gray-400 text-white",
      success: "bg-green-500 text-white hover:bg-green-600 transition-colors",
      danger: "bg-red-500 text-white",
      warning: "bg-yellow-500 text-white",
      transparent: "bg-transparent hover:bg-gray-400 transition-colors",
    };

    if (outlined) {
      return getButtonOutlinedColors(color as any);
    }

    return colors[color];
  }

  function getButtonOutlinedColors(type: ButtonProps["type"]) {
    const colors = {
      primary:
        "bg-transparent hover:bg-primary-200/50 border border-primary-300 transition-colors",
      warning: "outlined-warning",
      danger: "outlined-danger",
      transparent: "outlined-transparent",
      success: "outlined-success",
      contrast: "outlined-contrast",
      pink: "outlined-pink",
    };

    return colors[type as keyof typeof colors];
  }

  if (as === "anchor") {
    return (
      <a
        href={href}
        className={classes(
          "relative inline-flex items-center justify-center cursor-pointer",
          getButtonColors(color),
          className,
          styles === "text" && "!bg-transparent"
        )}
      >
        {icon && (
          <div
            className={`absolute top-[calc(50%-_0.5em)] w-7 h-7 ${classes({
              "left-2": iconAlign === "left",
              "right-2": iconAlign === "right",
            })}`}
          >
            {icon}
          </div>
        )}
        <div>{loading ? <Spinner width="5px" /> : children}</div>
      </a>
    );
  }

  return (
    <button
      ref={ref}
      className={classes(
        "flex items-center justify-center h-10 font-medium rounded-lg px-3",
        icon && "gap-2",
        icon && !children && "w-10 h-10",
        // "no-styles" && "block h-10 border-none",
        rounded && "!rounded-full",
        getButtonColors(color),
        className,
        styles === "text" && "!bg-transparent"
      )}
      onClick={onClick}
      type={type}
      {...rest}
    >
      {icon && (
        <div
          className={`top-[calc(50%-_0.5em)] ${classes({
            "left-2": iconAlign === "left",
            "right-2": iconAlign === "right",
          })}`}
        >
          {icon}
        </div>
      )}
      <>{loading ? <Spinner width="5px" /> : children}</>
    </button>
  );
});

Button.displayName = "Button";

export default Button;
