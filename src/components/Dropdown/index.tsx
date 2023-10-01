import { classes } from "@/lib/helpers/common";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import React, { useState, useRef, cloneElement, createElement } from "react";
import useClickOutside from "../../lib/hooks/useClickOutside";

interface Props {
  label: string | React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  disableArrow?: boolean;
  width?: string;
  hoverColor?: "accent" | "accent2" | "accent3" | "primary";
  visible?: boolean;
}

function DropdownItem(props: {
  children: React.ReactNode;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
}) {
  const { children, iconLeft, iconRight, ...rest } = props;

  const hasHref = children && (children as any)?.props?.href;

  let child = children as any;

  const tailwindClass =
    "text-center !px-4 !py-2 !cursor-pointer !transition-colors !duration-200 !h-10 !w-full";

  // if child is string
  if (typeof child === "string") {
    child = <span className="!w-full">{child}</span>;
  }

  if (hasHref) {
    child = createElement(child.type, {
      ...child.props,
      className: classes(child.props.className, tailwindClass, "!font-normal"),
    });
  } else {
    child = cloneElement(child as React.ReactElement, {
      className: tailwindClass,
    });
  }

  return (
    <div
      {...rest}
      className={classes(
        hasHref && "!p-0",
        "flex items-center justify-between",
        "dropdown-item py-2 px-4 cursor-pointer transition-colors h-10 w-full text-center hover:bg-accent2"
      )}
    >
      {iconLeft && iconLeft}
      {child}
      {iconRight && iconRight}
    </div>
  );
}

function Dropdown(props: Props) {
  const { label, hoverColor = "accent", visible = false, children } = props;
  const [isOpen, setIsOpen] = useState(visible);
  const _ref = useRef<HTMLButtonElement>(null);

  useClickOutside(_ref, () => setIsOpen(false));

  return (
    <div className="flex flex-col gap-1 select-none">
      <motion.button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        ref={_ref}
        className={classes(
          props.className,
          "dropdown relative flex items-center justify-center w-full"
        )}
      >
        {label && (
          <div
            className={`clickable cursor-pointer flex items-center justify-between gap-1 rounded-lg py-2 px-4 h-10 w-full transition-colors hover:bg-${hoverColor}`}
          >
            {React.isValidElement(label) ? (
              label
            ) : (
              <span className="font=medium">{label}</span>
            )}
            {!props.disableArrow && (
              <motion.div animate={{ rotate: isOpen ? 0 : 180 }}>
                <ArrowUp width="1.2em" height="1.2em" />
              </motion.div>
            )}
          </div>
        )}

        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="dropdown-menu flex flex-col gap-2 mt-3 absolute top-12 py-2 z-[100] bg-accent rounded-lg shadow-san"
              initial={{ opacity: 0, y: -10, width: props.width || "auto" }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{
                duration: 0.2,
              }}
            >
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}

Dropdown.Item = DropdownItem;

export default Dropdown;
