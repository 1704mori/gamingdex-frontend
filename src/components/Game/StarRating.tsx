import React, { useState, useEffect } from "react";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import { StarOutline } from "iconoir-react";

const starVariants = {
  initial: {
    scale: 1,
  },
  animate: (i: number) => ({
    scale: 1,
    transition: {
      delay: i * 0.04,
      duration: 0.25,
      type: "spring",
      stiffness: 175,
    },
  }),
  exit: (i: number) => ({
    scale: 1,
    transition: {
      duration: 0.25,
      delay: 0.2 - i * 0.04,
    },
  }),
  hovered: {
    scale: 0.8,
    transition: {
      duration: 0.2,
    },
  },
};

const Star = ({
  i,
  filled,
  isHoveringWrapper,
  isClicked,
}: {
  i: number;
  filled: number;
  isHoveringWrapper: boolean;
  isClicked: boolean;
}) => {
  const [isHovering, setIsHovering] = useState(false);
  const starControls = useAnimation();
  const backgroundControls = useAnimation();

  useEffect(() => {
    if (isHovering) starControls.start("hovered");
    else if (isClicked) starControls.start("animate");
    else starControls.start("exit");
  }, [isClicked, isHovering, starControls]);

  useEffect(() => {
    if (isHoveringWrapper) backgroundControls.start({ background: "#ffd700" });
    else backgroundControls.start({ background: "transparent" });
  }, [isHoveringWrapper, backgroundControls]);

  return (
    <AnimatePresence>
      <motion.i
        onMouseOver={() => setIsHovering(true)}
        onMouseOut={() => setIsHovering(false)}
        variants={starVariants}
        initial="initial"
        animate={starControls}
        custom={i}
      >
        <StarOutline fill={i < filled ? "#ffd700" : "transparent"} />
      </motion.i>
    </AnimatePresence>
  );
};
const StarRating = ({ filled: _filled }: { filled: number }) => {
  const [isClicked, setIsClicked] = useState(_filled);
  const [filled, setFilled] = useState(_filled);
  const [isHovering, setIsHovering] = useState(0);

  return (
    <div className="stars-container">
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.div
          className="star-wrapper"
          onMouseOver={() => setIsHovering(i)}
          onClick={() => {
            setIsClicked(i + 1);
            setFilled(i + 1);
          }}
          key={i}
        >
          <Star
            i={i}
            filled={filled}
            isHoveringWrapper={isHovering >= i}
            isClicked={isClicked >= i}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default StarRating;
