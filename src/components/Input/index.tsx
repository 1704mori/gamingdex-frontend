import { classes } from "@/lib/helpers/common";
import { forwardRef } from "react";

type InputProps = {
  icon?: any;
  iconAlign?: "left" | "right";
  color?: "primary" | "secondary";
  label?: string;
  errors?: any;
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
    ...rest
  } = props;

  function getInputColors(color: InputProps["color"] = "primary") {
    const colors = {
      primary: "primary",
      secondary: "secondary",
    };

    return colors[color];
  }

  const error = errors && errors[props.name as string];

  return (
    <div className="flex flex-col gap-1 input-container relative w-full">
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
              "icon absolute inset-0 w-7 h-7",
              iconAlign === "left" && "left-2",
              iconAlign === "right" && "right-2"
            )}
          >
            {icon}
          </div>
        )}
        <input
          className={`${getInputColors(color)} ${classes(
            icon && iconAlign === "left" && "indent-8",
            className
          )} input`}
          ref={forwardRef as any}
          {...rest}
        />
      </div>
    </div>
  );
});

Input.displayName = "Input";

export default Input;
