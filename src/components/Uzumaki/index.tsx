import { motion } from "framer-motion";

interface Props extends React.SVGAttributes<SVGElement> {
  duration?: number;
  easing?: string;
}

export default function Uzumaki(props: Props) {
  const { duration = 3, easing = "easeInOut", ...rest } = props;

  return (
    <div className="relative">
      <svg
        {...rest}
        xmlns="http://www.w3.org/2000/svg"
        width={rest.width ? rest.width : "64"}
        height={rest.height ? rest.height : "64"}
        viewBox="0 0 500 500"
      >
        {/* <motion.path
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 2 L22 12 L12 22 L2 12 Z"
        animate={{
          pathLength: [0, 1],
          rotate: [0, 360],
        }}
        transition={{
          duration,
          ease: easing,
          repeat: Infinity,
        }}
      /> */}
        <motion.path
          d="M 239 17 C 142 17 48.5 103 48.5 213.5 C 48.5 324 126 408 244 408 C 362 408 412 319 412 213.5 C 412 108 334 68.5 244 68.5 C 154 68.5 102.68 135.079 99 213.5 C 95.32 291.921 157 350 231 345.5 C 305 341 357.5 290 357.5 219.5 C 357.5 149 314 121 244 121 C 174 121 151.5 167 151.5 213.5 C 151.5 260 176 286.5 224.5 286.5 C 273 286.5 296.5 253 296.5 218.5 C 296.5 184 270 177 244 177 C 218 177 197 198 197 218.5 C 197 239 206 250.5 225.5 250.5 C 245 250.5 253 242 253 218.5"
          fill="transparent"
          strokeWidth="12"
          stroke="rgba(255, 255, 255, 0.69)"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{
            pathLength: 1,
            // rotate: [0, 60, 90, 160, 190, 260, 290, 360], // test
          }}
          transition={{
            duration,
            ease: easing,
            yoyo: Infinity,
          }}
        />
      </svg>
    </div>
  );
}
