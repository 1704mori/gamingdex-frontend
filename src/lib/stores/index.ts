import { atom } from "jotai";
import { IReview } from "../types/game";

/**
 * @returns display, orderBy
 */
export const filterAtom = atom<{
  sort?: {
    title?: "desc" | "asc" | undefined;
    score?: "desc" | "asc" | undefined;
    members?: "desc" | "asc" | undefined;
    createdAt?: "desc" | "asc" | undefined;
    updateAt?: "desc" | "asc" | undefined;
  };
  display?: "list" | "grid" | undefined;
}>({});

// export const gameTabAtom = atom<"all" | "characters" | "staff" | "reviews">(
//   "all"
// );

export const gameReviewAtom = atom<IReview | null>(null);

export const showReviewModalAtom = atom<boolean>(false);
