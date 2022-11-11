import { classes } from "@/lib/helpers/common";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp } from "iconoir-react";
import React, { forwardRef, useState, useEffect, useRef } from "react";
import useClickOutside from "../../lib/hooks/useClickOutside";
import Typography from "../Typography";

interface Props {
  color?: "primary" | "pink" | "accent" | "accent2" | "accent3";
  label?: string;
  placeholder?: string;
  onSelect?: (value: string) => void;
  value?: string;
  children?: React.ReactNode;
  clean?: boolean;
  className?: string;
}

interface SelectItemProps extends Omit<Props, "value"> {
  value: string | number;
}

const SelectItem = forwardRef<HTMLDivElement, SelectItemProps>(
  ({ value, children, className, ...props }, ref) => {
    const { onSelect, ...rest } = props;

    return (
      <div ref={ref} {...rest} className={classes("select-item", className)}>
        {children}
      </div>
    );
  }
);

SelectItem.displayName = "SelectItem";

const Select = forwardRef<HTMLDivElement, Props>(
  ({ children, ...props }, ref) => {
    const { color = "accent", onSelect, placeholder, value, ...rest } = props;
    const [placeholderText, setPlaceholderText] = useState(
      placeholder || "Select"
    );
    const [isOpen, setIsOpen] = useState(false);
    const _ref = useRef<HTMLDivElement>(ref as any);

    useEffect(() => {
      if (rest.clean) {
        setPlaceholderText(placeholder || "Select");
        return;
      }

      if (placeholder) {
        setPlaceholderText(placeholder);
      }
    }, [rest.clean, setPlaceholderText, placeholder]);

    useEffect(() => {
      if (value) {
        const childrenValue = React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return child.props.value === value ? child.props.children : null;
          }
        });

        if (childrenValue) {
          setPlaceholderText(childrenValue as unknown as string);
        }

        if (onSelect) {
          onSelect(value);
        }
      }
    }, [value, onSelect, children, setPlaceholderText]);

    useClickOutside(_ref, () => setIsOpen(false));

    const childrenWithProps = React.Children.map(children, (child) => {
      if (React.isValidElement(child)) {
        return React.cloneElement<any>(child, {
          onClick: () => {
            if (onSelect) {
              onSelect(child.props.value);
              setPlaceholderText(child.props.children);
            }
          },
          className: classes(
            color === "accent" &&
              "hover:bg-accent2",
            color === "accent2" && "hover:bg-accent3",
            color === "accent3" && "hover:bg-accent4",
            color === "pink" && "text-white bg-pink-600 hover:!bg-pink-700",
            color === "primary" &&
              "!text-white hover:bg-primary shadow-[inset_0_0_0.2em_0_var(--primary),_0_0_0.2em_0_var(--primary)]"
          ),
        });
      }
      return child;
    });

    return (
      <div
        className={classes("flex flex-col gap-1 select-none", props.className)}
      >
        {props.label && (
          <Typography className="!text-xs uppercase" thickness={3}>
            {props.label}
          </Typography>
        )}
        <div
          ref={_ref}
          {...rest}
          onClick={() => setIsOpen(!isOpen)}
          className="select"
        >
          {placeholderText && (
            <div
              className={`bg-${color} clickable flex items-center justify-between !transition-colors ${classes(
                color === "accent" &&
                  "hover:bg-accent2",
                color === "accent2" && "hover:bg-accent3",
                color === "accent3" && "hover:bg-accent4",
                color === "pink" && "text-white bg-pink-600 hover:!bg-pink-700",
                color === "primary" &&
                  "!text-white hover:bg-primary shadow-[inset_0_0_0.2em_0_var(--primary),_0_0_0.2em_0_var(--primary)]"
              )}`}
            >
              <Typography thickness={3}>{placeholderText}</Typography>
              <motion.div animate={{ rotate: isOpen ? 0 : 180 }}>
                <ArrowUp />
              </motion.div>
            </div>
          )}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                className={`flex flex-col gap-2 mt-3 absolute select-options bg-${color} max-h-56 overflow-y-auto`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{
                  duration: 0.2,
                }}
              >
                {childrenWithProps}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    );
  }
);

Select.displayName = "Select";

export { Select, SelectItem };
