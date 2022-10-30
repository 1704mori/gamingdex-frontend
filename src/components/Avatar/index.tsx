import { classes } from "@/lib/helpers/common";
import { UserCircleAlt } from "iconoir-react";
import Image, { ImageProps } from "next/image";
import React from "react";
import { toBase64 } from "../../lib/helpers/common";

interface Props extends Omit<ImageProps, "src" | "alt"> {
  default?: boolean;
  src?: string;
  alt?: string;
}

type ImageLoadingStatus = "unknown" | "loading" | "loaded" | "error";

const convertImage = (w: string | number, h: string | number) => `
  <svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <defs>
      <linearGradient id="g">
        <stop stop-color="var(--gray-300)" offset="20%" />
        <stop stop-color="var(--gray-200)" offset="50%" />
        <stop stop-color="var(--gray-300)" offset="70%" />
      </linearGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="var(--gray-300)" />
    <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
    <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
  </svg>`;

const Avatar = React.forwardRef<typeof Image, Props>((props) => {
  const [imageLoadingStatus, setImageLoadingStatus] =
    React.useState<ImageLoadingStatus>("unknown");

  return (
    <Image
      {...props}
      src={props.default ? "/default_avatar.svg" : (props.src as string)}
      alt={props.alt as string}
      className={classes("rounded-full w-10 h-10", props.className)}
      width={40}
      height={40}
      placeholder={imageLoadingStatus === "unknown" ? "blur" : "empty"}
      blurDataURL={`data:image/svg+xml;base64,${toBase64(
        convertImage("40", "40")
      )}`}
      onLoadingComplete={() => setImageLoadingStatus("loaded")}
      onError={() => setImageLoadingStatus("error")}
    />
  );
});

Avatar.displayName = "Avatar";

export default Avatar;
