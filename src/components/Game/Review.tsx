import { humanize } from "@/lib/helpers/common";
import { gameReviewAtom, showReviewModalAtom } from "@/lib/stores";
import { IReview } from "@/lib/types/game";
import dayjs from "dayjs";
import { WhiteFlag } from "iconoir-react";
import { useAtom } from "jotai";
import { useRef } from "react";
import ReviewModal from "./ReviewModal";

export default function Review({ reviews }: { reviews: IReview[] }) {
  const [showReviewModal, setShowReviewModal] = useAtom(showReviewModalAtom);
  const [review, setReview] = useAtom(gameReviewAtom);

  const closeReviewModal = () => setShowReviewModal(false);

  const reviewRef = useRef<HTMLDivElement>(null);

  const toggleReview = (review: IReview) => {
    setReview(review);
    setShowReviewModal(true);

    console.log(showReviewModalAtom);
  };

  return (
    <>
      <ReviewModal
        closeReviewModal={closeReviewModal}
        reviewModalOpen={showReviewModal}
        review={review as IReview}
      />
      {reviews?.map((review) => (
        <div
          key={review.id}
          className="flex flex-col gap-3 bg-accent rounded-lg w-full px-2 py-1"
        >
          <div className="flex flex-col lg:flex-row items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-3">
              <img
                className="w-12 h-12 rounded-full object-cover"
                src="/default_avatar.svg"
              />
              <span className="font-medium">{review.user?.username}</span>
              <span className="bg-primary px-1 mx-auto py-0.5 rounded-lg font-medium">
                {humanize(review.recommend)}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-medium">
                {dayjs(review.createdAt).format("MMM DD, YYYY")}
              </span>
              <button>
                <WhiteFlag />
              </button>
            </div>
          </div>
          <div className="flex flex-col" ref={reviewRef}>
            {review.hasSpoilers && (
              <span className="text-red-500 font-medium">
                This review may contain spoilers
              </span>
            )}
            <div className="[display:_-webkit-box] [-webkit-box-orient:_vertical] overflow-hidden [-webkit-line-clamp:_3] h-auto">
              {`${review.review}...`}
            </div>
            <button className="mx-auto" onClick={() => toggleReview(review)}>
              <span className="font-medium">See more</span>
            </button>
          </div>
        </div>
      ))}
    </>
  );
}
