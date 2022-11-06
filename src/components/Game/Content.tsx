import { classes, displayImage, humanize } from "@/lib/helpers/common";
import { IGame, IReview } from "@/lib/types/game";
import dayjs from "dayjs";
import { AnimatePresence, motion } from "framer-motion";
import { EyeOff, EyeEmpty, WhiteFlag } from "iconoir-react";
import { useRef, useState } from "react";
import { useModal } from "../Modal";
import ReviewModal from "./ReviewModal";
import { getRetailLogo } from "./utils";

export default function Content({ game }: { game: IGame }) {
  const [showInfo, setShowInfo] = useState(true);
  const [showReview, setShowReview] = useState<IReview>({} as IReview);

  const reviewRef = useRef<HTMLDivElement>(null);

  const {
    open: setReviewModalOpen,
    modalOpen: reviewModalOpen,
    close: closeReviewModal,
  } = useModal();

  const toggleInfo = () => setShowInfo(!showInfo);

  const toggleReview = (review: IReview) => {
    setShowReview(review);
    setReviewModalOpen();
  };

  return (
    <>
      <ReviewModal
        closeReviewModal={closeReviewModal}
        reviewModalOpen={reviewModalOpen}
        review={showReview}
      />
      <div className="flex flex-col gap-5">
        <div className="flex justify-between items-center">
          <h4 className="lg:hidden font-bold text-xl">Info</h4>
          <button className="lg:hidden" onClick={toggleInfo}>
            {!showInfo ? <EyeOff /> : <EyeEmpty />}
          </button>
        </div>

        <AnimatePresence>
          {showInfo ? (
            <motion.div
              className="flex flex-col gap-2 rounded-lg p-3 lg:bg-transparent lg:p-0"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              <div className="grid grid-cols-2 gap-5">
                <div className="flex flex-col">
                  <span className="lg:!text-xl font-medium">Developers</span>

                  {game.developers && game.developers.length > 0 ? (
                    <div
                      className={classes(
                        "flex flex-col lg:grid gap-2 lg:rounded-lg lg:p-1.5",
                        game.developers.length >= 3
                          ? "lg:grid-cols-3"
                          : `lg:grid-cols-${game.developers.length}`
                      )}
                    >
                      {game.developers.map((developer, i) => (
                        <div key={developer.id}>
                          <div className="flex items-center gap-2 bg-accent rounded-lg px-3 py-2">
                            {developer.developer.logo && (
                              <img
                                src={displayImage(developer.developer.logo)}
                                alt={developer.developer.name}
                                className="w-6 h-6 rounded-lg object-cover"
                              />
                            )}
                            <span className="whitespace-nowrap w-32 lg:w-auto truncate font-medium">
                              {developer.developer.name}
                            </span>
                          </div>
                          {/* {i === 2 && (
                          <button onClick={togglePublishers}>
                            {showPublishers ? <Minus /> : <Plus />}
                          </button>
                        )} */}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <span>No developers (っ °Д °;)っ</span>
                  )}
                </div>

                <div className="flex flex-col">
                  <span className="lg:!text-xl font-medium">Publishers</span>

                  {game.publishers && game.publishers.length > 0 ? (
                    <div
                      className={classes(
                        "flex flex-col lg:grid gap-2 lg:rounded-lg lg:p-1.5",
                        game.publishers.length >= 3
                          ? "lg:grid-cols-3"
                          : `lg:grid-cols-${game.publishers.length}`
                      )}
                    >
                      {game.publishers.map((publisher, i) => (
                        <div key={publisher.id}>
                          <div className="flex items-center gap-2 bg-accent rounded-lg px-3 py-2">
                            {publisher.publisher.logo && (
                              <img
                                src={displayImage(publisher.publisher.logo)}
                                alt={publisher.publisher.name}
                                className="w-6 h-6 rounded-lg object-cover"
                              />
                            )}
                            <span className="whitespace-nowrap w-32 lg:w-auto truncate font-medium">
                              {publisher.publisher.name}
                            </span>
                          </div>
                          {/* {i === 2 && (
                          <button onClick={togglePublishers}>
                            {showPublishers ? <Minus /> : <Plus />}
                          </button>
                        )} */}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <span>No publishers (ノへ￣、)</span>
                  )}
                </div>
              </div>

              <div className="flex flex-col lg:hidden gap-1">
                <span className="font-medium">Where to buy</span>

                {/* horizontal scrollable flex div */}
                {game.retailLinks && game.retailLinks.length > 0 ? (
                  <div className="flex gap-2 overflow-x-auto">
                    {game.retailLinks.map((link) => (
                      <div
                        key={link.id}
                        className="flex items-center gap-1 bg-accent rounded-lg px-3 py-2"
                      >
                        {Object.keys(link).map((key, i) => (
                          <div key={i} className="flex items-center gap-1">
                            {getRetailLogo(key)}
                            <span className="whitespace-nowrap font-medium">
                              {link[key]}
                            </span>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                ) : (
                  <span>No retail ＞︿＜ links</span>
                )}
              </div>
            </motion.div>
          ) : (
            <span className="font-medium">
              Click the eye icon to show more info
            </span>
          )}
        </AnimatePresence>

        <div className="flex flex-col">
          <span className="font-medium">Characters</span>

          {/* horizontal scrollable flex div */}
          {game.characters && game.characters.length > 0 ? (
            <div className="flex flex-col lg:grid lg:grid-cols-5 flex-wrap gap-3">
              {game.characters.slice(0, 5).map((character) => (
                <div
                  key={character.id}
                  className="flex items-center gap-1 bg-accent rounded-lg w-full"
                >
                  <img
                    className="w-12 h-16 rounded-lg rounded-r-none object-cover"
                    src={displayImage(character.character.photo)}
                    alt={character.character.name}
                  />
                  <div className="flex flex-col px-3 py-2">
                    <span className="whitespace-nowrap truncate font-medium">
                      {character.character.name}
                    </span>
                    <span>{character.role ?? "No role"}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <span>No characters ＞﹏＜</span>
          )}
        </div>

        <div className="flex flex-col">
          <span className="font-medium">Staff</span>

          {/* horizontal scrollable flex div */}
          {game.staff && game.staff.length > 0 ? (
            <div className="flex flex-col lg:grid lg:grid-cols-5 flex-wrap gap-3">
              {game.staff.slice(0, 5).map((staff) => (
                <div
                  key={staff.id}
                  className="flex items-center gap-1 bg-accent rounded-lg w-full"
                >
                  <img
                    className="w-12 h-16 rounded-lg rounded-r-none object-cover"
                    src={displayImage(staff.people.photo)}
                    alt={staff.people.name}
                  />
                  <div className="flex flex-col px-3 py-2">
                    <span className="whitespace-nowrap truncate font-medium">
                      {staff.people.name}
                    </span>
                    <span>{staff.role ?? "No role"}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <span>No staff ಥ_ಥ</span>
          )}
        </div>

        <div className="flex flex-col">
          <div className="flex items-center justify-between">
            <span className="lg:text-lg font-medium">Reviews</span>
            <button>View more</button>
          </div>

          {game.reviews && game.reviews.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {game.reviews.map((review) => (
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
                      <span className="font-medium">
                        {review.user?.username}
                      </span>
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
                  {/* limited review content with see more/less button */}
                  <div className="flex flex-col" ref={reviewRef}>
                    {review.hasSpoilers && (
                      <span className="text-red-500 font-medium">
                        This review may contain spoilers
                      </span>
                    )}
                    <div className="[display:_-webkit-box] [-webkit-box-orient:_vertical] overflow-hidden [-webkit-line-clamp:_3] h-auto">
                      {`${review.review}...`}
                    </div>
                    <button
                      className="mx-auto"
                      onClick={() => toggleReview(review)}
                    >
                      <span className="font-medium">See more</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <span>No reviews ಥ_ಥ</span>
          )}
        </div>
      </div>
    </>
  );
}
