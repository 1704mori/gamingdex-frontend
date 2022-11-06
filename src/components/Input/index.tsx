import { classes } from "@/lib/helpers/common";
import { forwardRef } from "react";

type InputProps = {
  icon?: any;
  iconAlign?: "left" | "right";
  color?:
    | "accent"
    | "accent-light"
    | "accent-light2"
    | "accent-dark"
    | "accent-dark2";
  label?: string;
  errors?: any;
  fit?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef(({ ...props }: InputProps, forwardRef) => {
  const {
    icon,
    label,
    errors,
    iconAlign = "left",
    pattern,
    color = "primary",
    className,
    fit = true,
    ...rest
  } = props;

  const error = errors && errors[props.name as string];

  return (
    <div
      className={classes(
        "flex flex-col gap-1 input-container relative",
        fit && "w-full",
        className
      )}
    >
      {label && (
        <div
          className={`font-medium text-xs ${classes(
            error && "flex !items-center text-red-500"
          )}`}
        >
          <div className="uppercase">{label}</div>
          {error && (
            <div className="ml-1 italic font-normal">- {error.message}</div>
          )}
        </div>
      )}

      <div className="relative">
        {icon && (
          <div
            className={classes(
              "icon absolute inset-0 w-7 h-7 top-[calc(50%-0.8em)]",
              iconAlign === "left" && "left-2",
              iconAlign === "right" && "right-2"
            )}
          >
            {icon}
          </div>
        )}
        <input
          className={`$bg-${color} ${classes(
            icon && iconAlign === "left" && "indent-8",
            className,
            "w-full h-10 px-3 border border-accent-light2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none focus:outline active:outline outline-primary transition-colors text-text placeholder-text"
          )}`}
          ref={forwardRef as any}
          {...rest}
        />
      </div>
    </div>
  );
});

Input.displayName = "Input";

export default Input;
