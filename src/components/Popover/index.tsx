import { classes } from "@/lib/helpers/common";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface Props {
  visible?: boolean;
  text: string;
  children?: React.ReactNode;
  placement?: "top" | "bottom" | "left" | "right";
  className?: string
}

export default function Popover(props: Props) {
  const { visible = false, text, children, placement = "top", className } = props;

  const [hovering, setHovering] = useState(false);
  const [show, setShow] = useState(visible);

  const handleMouseEnter = () => {
    setHovering(true);
  };

  const handleMouseLeave = () => {
    setHovering(false);
  };

  useEffect(() => {
    if (hovering) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [hovering]);

  return (
    <div
      // onMouseEnter={handleMouseEnter}
      // onMouseLeave={handleMouseLeave}
      className={classes("relative", className)}
    >
      {children}
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, y: -10, transform: "translateY(-50%)" }}
            animate={{ opacity: 1, y: 0, transform: "translateY(-50%)" }}
            exit={{ opacity: 0, y: -10, transform: "translateY(-50%)" }}
            transition={{ duration: 0.2 }}
            className={`${placement === "top"
                ? "bottom-full"
                : placement === "bottom"
                  ? "top-full"
                  : placement === "left"
                    ? "right-full"
                    : "left-full top-1/2 -translate-y-1/2"
              } absolute z-10 px-2 py-1 text-sm bg-primary text-white rounded-lg shadow-md whitespace-nowrap`}
          >
            {text}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
