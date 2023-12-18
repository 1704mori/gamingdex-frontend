import Button from "@/components/Button";
import Switch from "@/components/Switch";
import TextArea from "@/components/TextArea";
import StarRating from "../StarRating";
import { X } from "lucide-react";
import Modal from "@/components/Modal";
import MdEditor from "@/components/MdEditor";
import { RESET, atomWithStorage } from "jotai/utils";
import { useAtom } from "jotai";
import { useState } from "react";

type Props = {
  open: boolean;
  close: () => void;
};

const reviewAtom = atomWithStorage("review", "");

export default function CreateReviewModal({ open, close }: Props) {
  const [review, setReview] = useAtom(reviewAtom);
  const [draftWarning, setDraftWarning] = useState(false);

  const onClose = () => {
    if (!review) {
      close();
      return;
    }
    setDraftWarning(true);
    // close();
  };

  const handleDiscardDraft = () => {
    setReview(RESET);
    setDraftWarning(false);
    close();
  };

  const handleSaveDraft = () => {
    setReview(review);
    setDraftWarning(false);
    close();
  };

  return (
    <Modal className="w-[36rem]" modalOpen={open} handleClose={onClose}>
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Write a review</h3>

          {!draftWarning && (
            <button onClick={close}>
              <X />
            </button>
          )}
        </div>

        {!draftWarning ? (
          <>
            <div className="flex flex-col gap-1">
              <div className="text-base">Your rating</div>
              <StarRating filled={0} />
            </div>

            <MdEditor output={(o) => setReview(o)} />
            <div className="flex items-center space-x-2">
              <Switch id="spoilers" />
              <label className="font-medium" htmlFor="spoilers">
                Spoilers warning
              </label>
            </div>
          </>
        ) : (
          <>
            <span>
              You{"'"}re closing this review without saving. Do you want to save
              it as a draft?
            </span>
            <span className="text-sm opacity-70">
              If you opt to save it as a draft, when you come back write a
              review, it will be there waiting for you.
            </span>
          </>
        )}

        <div className="flex items-center self-end gap-3">
          {draftWarning ? (
            <>
              <button
                className="hover:underline"
                type="button"
                onClick={handleDiscardDraft}
              >
                Discard
              </button>
              <Button onClick={handleSaveDraft}>Yes</Button>
            </>
          ) : (
            <>
              <button className="hover:underline" type="button" onClick={close}>
                Cancel
              </button>
              <Button>Post</Button>
            </>
          )}
        </div>
      </div>
    </Modal>
  );
}
