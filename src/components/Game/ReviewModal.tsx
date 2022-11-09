import { humanize } from "@/lib/helpers/common";
import { IReview } from "@/lib/types/game";
import dayjs from "dayjs";
import { Cancel, ThumbsDown, ThumbsUp, WhiteFlag } from "iconoir-react";
import Button from "../Button";
import Modal from "../Modal";
import Typography from "../Typography";

export default function ReviewModal({
  review,
  reviewModalOpen,
  closeReviewModal,
}: {
  review: IReview;
  reviewModalOpen: boolean;
  closeReviewModal: () => void;
}) {
  return (
    <Modal
      width="w-full lg:w-1/3"
      className="max-h-[400px] lg:max-h-[700px] overflow-y-auto !rounded-none !bg-accent"
      modalOpen={reviewModalOpen}
      handleClose={closeReviewModal}
      floatingTop={
        <div className="flex flex-col lg:flex-row items-center self-start bg-accent rounded-lg rounded-b-none w-full mb-1 p-2">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-3">
              <img
                className="w-12 h-12 rounded-full object-cover"
                src="/default_avatar.svg"
              />
              <Typography thickness={3} ellipsis className="max-w-[350px]">
                {review?.user?.username}
                {"'"}s review
              </Typography>
              <Typography
                thickness={3}
                className="bg-primary text-white !px-1 mx-auto !py-0.5 rounded-lg"
              >
                {humanize(review?.recommend as string)}
              </Typography>
            </div>
            <button onClick={closeReviewModal}>
              <Cancel width="1.8em" height="1.8em" />
            </button>
          </div>
        </div>
      }
      floatingBottom={
        <div className="flex flex-col items-center justify-center bg-accent rounded-lg rounded-t-none w-full mt-1 p-2">
          <div className="flex flex-col gap-1 sm:flex-row items-center justify-between w-full">
            <Typography thickness={3}>Overall Score: 8</Typography>
            <div className="grid grid-cols-2 gap-3 mx-auto">
              <Button color="accent-light2">
                <ThumbsUp />
                1.5k
              </Button>
              <Button color="accent-light2">
                <ThumbsDown />
                1.5k
              </Button>
            </div>
            <div className="flex items-center gap-3">
              <Typography thickness={3}>
                {dayjs(review?.createdAt).format("DD MMM YYYY")}
              </Typography>
              <button>
                <WhiteFlag />
              </button>
            </div>
          </div>
        </div>
      }
    >
      {review?.review}
    </Modal>
  );
}
