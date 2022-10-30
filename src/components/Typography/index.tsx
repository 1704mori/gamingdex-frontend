import { classes } from "@/lib/helpers/common";
import { useCallback } from "react";

interface Props {
  thickness?: 1 | 2 | 3 | 4 | 5;
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  ellipsis?: boolean;
}

interface TitleProps extends Props {
  level?: "1" | "2" | "3" | "4" | "5" | "6";
}

const getLevel = (level: string) => {
  switch (level) {
    case "1":
      return "text-4xl";
    case "2":
      return "text-3xl";
    case "3":
      return "text-2xl";
    case "4":
      return "text-xl";
    case "5":
      return "text-lg";
    case "6":
      return "text-base";
    default:
      return "text-2xl";
  }
};

const getThickness = (thickness: number) => {
  switch (thickness) {
    case 1:
      return "font-light";
    case 2:
      return "font-normal";
    case 3:
      return "font-medium";
    case 4:
      return "font-semibold";
    case 5:
      return "font-bold";
    default:
      return "font-normal";
  }
};

const Title = (props: TitleProps) => {
  const { level = "3", children, thickness = 2, className, ...rest } = props;

  return (
    <div
      title={children?.toString()}
      className={`${getLevel(level)} ${getThickness(
        thickness
      )} typography typography-title, ${classes(className)}`}
      {...rest}
    >
      {children}
    </div>
  );
};

const Link = (props: Props) => {
  const { children, thickness = 2, ...rest } = props;

  return (
    <a
      {...rest}
      title={children?.toString()}
      className={classes(
        "hover:underline cursor-pointer typography typography-link",
        getThickness(thickness)
      )}
    >
      {children}
    </a>
  );
};

const Typography = (props: Props) => {
  const { children, thickness = 2, className, ellipsis, ...rest } = props;

  return (
    <div
      title={children?.toString()}
      className={`text-base w-fit typography typography-text ${getThickness(
        thickness
      )} ${classes(className, ellipsis && "truncate")}`}
      {...rest}
    >
      {children}
    </div>
  );
};

Typography.Title = Title;
Typography.Link = Link;

export default Typography;
