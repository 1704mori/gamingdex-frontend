import { AxiosResponse } from "axios";
import { IGame } from "../types/game";
import { ElementType, Attributes, ReactElement, createElement } from "react";
import { CDN_URL } from "@/settings";
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Returns only truthy classes given.
 * @param classes Classes to be applied to the element.
 * @returns A string of classes.
 */
export const classes = (...classes: any[]): string => {
  return classes
    .filter((el) => el)
    .join(" ")
    .trim();
};


/**
 * Convert a date to a relative time string, such as
 * "a minute ago", "in 2 hours", "yesterday", "3 months ago", etc.
 * using Intl.RelativeTimeFormat
 */
// found on internet
export function getRelativeTimeString(
  date: Date | number,
  lang = navigator.language
): string {
  // Allow dates or times to be passed
  const timeMs = typeof date === "number" ? date : date.getTime();

  // Get the amount of seconds between the given date and now
  const deltaSeconds = Math.round((timeMs - Date.now()) / 1000);

  // Array reprsenting one minute, hour, day, week, month, etc in seconds
  const cutoffs = [60, 3600, 86400, 86400 * 7, 86400 * 30, 86400 * 365, Infinity];

  // Array equivalent to the above but in the string representation of the units
  const units: Intl.RelativeTimeFormatUnit[] = ["second", "minute", "hour", "day", "week", "month", "year"];

  // Grab the ideal cutoff unit
  const unitIndex = cutoffs.findIndex(cutoff => cutoff > Math.abs(deltaSeconds));

  // Get the divisor to divide from the seconds. E.g. if our unit is "day" our divisor
  // is one day in seconds, so we can divide our seconds by this to get the # of days
  const divisor = unitIndex ? cutoffs[unitIndex - 1] : 1;

  // Intl.RelativeTimeFormat do its magic
  const rtf = new Intl.RelativeTimeFormat(lang, { numeric: "auto" });
  return rtf.format(Math.floor(deltaSeconds / divisor), units[unitIndex]);
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Converts a string to base64.
 * @param str String to be converted.
 * @returns A base64 string.
 */

export const toBase64 = (str: string) =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);

/**
 * Delay function that returns a promise.
 * @param ms Milliseconds to delay.
 */

export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Returns the photo url
 * @param photo Photo to be displayed.
 * @param banner If the photo is a banner.
 */

export function displayImage(photo: string, banner: boolean = false) {
  if (!photo || photo === "default_photo") return "/default_avatar.svg";
  if (photo.includes("covers/"))
    return `${CDN_URL}/${photo}${banner ? `_cover.jpg` : ``}`;
  if (photo.includes("uploads/")) return `${CDN_URL}/files/${photo}`;
  return photo;
}

type ErrorResponse = {
  error: string;
  message: string;
};

/**
 * Returns the data and error from the response
 * @param promiseToResolve Promise to be resolved.
 */

export async function resolvePromise<T>(
  promiseToResolve: Promise<T>
): Promise<[data: T, error: AxiosResponse<ErrorResponse>]> {
  try {
    const data = await promiseToResolve;
    return [data, null as any];
  } catch (err: any) {
    const errResponse = err.response;
    return [null as any, errResponse];
  }
}

/**
 * Returns a humanized string
 * @param value String to be humanized.
 */

export function humanize(value: string) {
  if (!value) return;

  return value
    .replace(/_/g, " ")
    .replace(
      /\w\S*/g,
      (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    );
}

/**
 * Pluralizes a string
 * @param value String to be pluralized.
 * @param count Count of the string.
 */

export function pluralize(value: string, count: number) {
  if (!value) return;

  return count > 1 ? `${value}s` : value;
}

/**
 * Build the game url
 * @params asUUID Should build the game url using its real id
 * @returns The built url as string
 */

export function buildGameUrl(game: IGame, asUUID = false) {
  return `/game/${asUUID ? game.id : game.urlId}/${game.slug}`;
}

/**
 *
 * @param type Type of the element or component.
 * @param className
 * @returns A React element.
 */

export function styled<P extends Record<string, unknown>>(
  type: ElementType | keyof JSX.IntrinsicElements,
  ...className: string[]
): (
  props?: (Attributes & P & { className?: string }) | null
) => ReactElement<P> {
  return function Classed(props) {
    return createElement(type, {
      ...props,
      className: classes(props?.className, ...className),
    });
  };
}

export const addPathToUrl = (path: string) => {
  window.history.replaceState(
    { ...window.history.state, as: path, url: path },
    "",
    path
  );

  return true;
};
