import { classes } from "@/lib/helpers/common";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp } from "iconoir-react";
import React, { useState, useRef, cloneElement, createElement } from "react";
import useClickOutside from "../../lib/hooks/useClickOutside";
import Typography from "../Typography";

interface Props {
  label: string | React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  disableArrow?: boolean;
  width?: string;
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

  console.log(hasHref, child);

  // if child is string
  if (typeof child === "string") {
    child = <Typography className="!w-full">{child}</Typography>;
  }

  if (hasHref) {
    console.log(child.props.children);
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
        "dropdown-item py-2 px-4 cursor-pointer transition-colors h-10 w-full text-center hover:bg-gray-150 hover:dark:bg-gray-450 rounded-lg"
      )}
    >
      {iconLeft && iconLeft}
      {child}
      {iconRight && iconRight}
    </div>
  );
}

function Dropdown(props: Props) {
  const { label, children } = props;
  const [isOpen, setIsOpen] = useState(false);
  const _ref = useRef<HTMLDivElement>(null);

  useClickOutside(_ref, () => setIsOpen(false));

  return (
    <div className="flex flex-col gap-1 select-none">
      <motion.div
        onClick={() => setIsOpen(!isOpen)}
        ref={_ref}
        className={classes(
          props.className,
          "relative flex items-center justify-center w-full"
        )}
      >
        {label && (
          <div className="clickable cursor-pointer flex items-center justify-between rounded-lg py-2 px-4 h-10 w-full transition-colors hover:bg-gray-150 dark:hover:bg-gray-450">
            {React.isValidElement(label) ? (
              label
            ) : (
              <Typography thickness={3}>{label}</Typography>
            )}
            {!props.disableArrow && (
              <motion.div animate={{ rotate: isOpen ? 0 : 180 }}>
                <ArrowUp />
              </motion.div>
            )}
          </div>
        )}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className={classes(
                "flex flex-col gap-2 mt-3 absolute top-12 px-3 py-2 z-[100] bg-gray-200 dark:bg-gray-500 rounded-lg shadow-san"
              )}
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
      </motion.div>
    </div>
  );
}

Dropdown.Item = DropdownItem;

export default Dropdown;
