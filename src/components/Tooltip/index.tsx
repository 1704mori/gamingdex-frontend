import React, { cloneElement, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Typography from "../Typography";
import { ArrowUp } from "iconoir-react";
import { classes } from "@/lib/helpers/common";
import useHover from "../../lib/hooks/useHover";

export default function Tooltip({
  children,
  text,
  placement = "bottom",
}: {
  children?: any;
  text?: string;
  placement?: "top" | "bottom";
}) {
  const [isOver, setIsOver] = useState(false);

  let trigger;

  if (isReactText(children)) {
    trigger = (
      <motion.div
        onHoverStart={() => setIsOver(true)}
        onHoverEnd={() => setIsOver(false)}
      >
        {children}
      </motion.div>
    );
  } else {
		trigger = <motion.div onHoverStart={() => setIsOver(true)} onHoverEnd={() => setIsOver(false)}>{children}</motion.div>;
  }

  return (
    <>
      {trigger}
      <AnimatePresence>
        {isOver && (
          <motion.div
            className="tooltip-box absolute"
            initial={{ opacity: 0, y: placement === "top" ? -8 : 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{
              type: "spring",
              damping: 30,
              stiffness: 500,
            }}
          >
            {text}
            <ArrowUp
              className={classes(
                "absolute",
                placement === "top" ? "rotate-180" : "rotate-0"
              )}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function isReactText(children: any) {
  return ["string", "number"].includes(typeof children);
}
