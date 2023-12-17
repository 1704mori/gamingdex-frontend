import { classes } from "@/lib/helpers/common";
import { forwardRef } from "react";

type InputProps = {
  icon?: any;
  iconAlign?: "left" | "right";
  color?: "accent" | "accent2" | "accent3";
  label?: string;
  errors?: any;
  fit?: boolean;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const TextArea = forwardRef(({ ...props }: InputProps, forwardRef) => {
  const {
    icon,
    label,
    errors,
    iconAlign = "left",
    color = "accent",
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
        className,
      )}
    >
      {label && (
        <div
          className={`font-medium text-xs ${classes(
            error && "flex !items-center text-red-500",
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
              iconAlign === "right" && "right-2",
            )}
          >
            {icon}
          </div>
        )}
        <textarea
          className={`bg-${color} ${classes(
            icon && iconAlign === "left" && "indent-8",
            className,
            "w-full h-auto px-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none outline-none focus:border-primary active:border-primary transition-colors text-text placeholder-text",
            color === "accent" && "border border-accent2",
            color === "accent2" && "border border-accent3",
            color === "accent3" && "border border-accent4",
          )}`}
          ref={forwardRef as any}
          {...rest}
        />
      </div>
    </div>
  );
});

TextArea.displayName = "TextArea";

export default TextArea;
