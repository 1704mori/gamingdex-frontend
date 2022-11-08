import { atom } from "jotai";
import { IReview } from "../types/game";

/**
 * @returns display, orderBy
 */
export const filterAtom = atom<{
  [key: string]: any;
}>({});

// export const gameTabAtom = atom<"all" | "characters" | "staff" | "reviews">(
//   "all"
// );

export const gameReviewAtom = atom<IReview | null>(null);

export const showReviewModalAtom = atom<boolean>(false);
