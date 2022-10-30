import { atom } from "jotai";

/**
 * @returns display, orderBy 
 */
export const filterAtom = atom<{
  [key: string]: any;
}>({});
