import { classes } from "@/lib/helpers/common";

interface Props {
  width?: string;
  height?: string;
  className?: string;
}

export default function Spinner({ width, height, className }: Props) {
  return (
    <div className={classes(className, "spinner-container")}>
      <svg
        viewBox="0 0 50 50"
        className="spinner"
        width={width}
        height={height}
        style={{
          borderRadius: "50%",
          width,
          height,
        }}
      >
        113.097 0
        <circle
          fill="transparent"
          stroke="currentColor"
          strokeWidth="4px"
          cx="25"
          cy="25"
          r="18"
          strokeDasharray="113.097"
          strokeLinecap="round"
          className="line"
        ></circle>
      </svg>
    </div>
  );
}
