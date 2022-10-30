import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface Props {
  visible?: boolean;
  text: string;
  children?: React.ReactNode;
  placement?: "top" | "bottom" | "left" | "right";
}

export default function Popover(props: Props) {
  const { visible = false, text, children, placement = "top" } = props;

	console.log("Popover props", props)

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
      className="relative"
    >
      {children}
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, y: -10 , transform: "translateY(-50%)" }}
            animate={{ opacity: 1, y: 0, transform: "translateY(-50%)" }}
            exit={{ opacity: 0, y: -10, transform: "translateY(-50%)" }}
            transition={{ duration: 0.2 }}
            className={`${
              placement === "top"
                ? "bottom-full"
                : placement === "bottom"
                ? "top-full"
                : placement === "left"
                ? "right-full"
                : "left-full top-1/2 -translate-y-1/2"
            } absolute z-10 p-2 bg-gray-800 text-white rounded-lg shadow-md whitespace-nowrap`}
          >
            {text}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
