"use client";

import {
  EditPencil,
  EyeEmpty,
  EyeOff,
  Heart,
  PlaylistAdd,
  ShareAndroid,
  StarOutline,
  ThumbsDown,
  ThumbsUp,
  WhiteFlag,
} from "iconoir-react";
import { displayImage, humanize, pluralize } from "../../lib/helpers/common";
import { IGame, IReview } from "../../lib/types/game";
import Button from "../Button";
import Typography from "../Typography";
import autoAnimate from "@formkit/auto-animate";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { motion } from "framer-motion";
import { useMediaQuery } from "react-responsive";
import ReactTooltip from "react-tooltip";
import { getPlatformIcon, getRetailLogo } from "./utils";
import useDelayState from "@/lib/hooks/useDelayState";
import Popover from "../Popover";
import dayjs from "dayjs";
import Modal, { useModal } from "../Modal";
import StarRating from "./StarRating";

export default function Game({ game: _game }: { game: IGame }) {
  const [
    defaultPlatforms,
    defaultGenres,
    defaultDevelopers,
    defaultPublishers,
  ] = useMemo(() => {
    return [_game.platforms, _game.genres, _game.developers, _game.publishers];
  }, [_game.platforms, _game.genres, _game.developers, _game.publishers]);

  const isLg = useMediaQuery({
    query: "(min-width: 1024px)",
  });

  const [game, setGame] = useState<IGame>(_game);
  const [showDescription, setShowDescription] = useState(false);
  const [showDevelopers, setShowDevelopers] = useState(false);
  const [showPublishers, setShowPublishers] = useState(false);
  const [showReview, setShowReview] = useState<IReview>();
  const [showGenres, setShowGenres] = useState(false);
  const [displayGenres, setDisplayGenres] = useState(isLg);

  const {
    open: setReviewModalOpen,
    modalOpen: reviewModalOpen,
    close: closeReviewModal,
  } = useModal();

  const [animateFingerprint, startFingerprintAnimation] = useDelayState({
    defaultState: false,
    duration: 2000,
    exitState: false,
  });

  const descriptionRef = useRef<HTMLDivElement>(null);
  const developersRef = useRef<HTMLDivElement>(null);
  const publishersRef = useRef<HTMLDivElement>(null);
  const genresRef = useRef<HTMLDivElement>(null);
  const reviewRef = useRef<HTMLDivElement>(null);

  const toggleDescription = () => setShowDescription(!showDescription);
  const toggleDevelopers = () => setShowDevelopers(!showDevelopers);
  const togglePublishers = () => setShowPublishers(!showPublishers);
  const toggleGenres = useCallback(
    () => setShowGenres(!showGenres),
    [showGenres]
  );
  const toggleShowGenres = () => setDisplayGenres(!displayGenres);
  const toggleReview = (review: IReview) => {
    setShowReview(review);
    setReviewModalOpen();
  };

  useEffect(() => {
    if (!isLg) {
      setShowGenres(true);
      return;
    }

    setGame((prev) => ({
      ...prev,
      developers: prev.developers.slice(0, 3),
      publishers: prev.publishers.slice(0, 3),
      genres: prev.genres.slice(0, 3),
    }));
  }, [isLg, toggleGenres]);

  useEffect(() => {
    if (_game.developers) {
      if (!showDevelopers) {
        setGame((prev) => ({
          ...prev,
          developers: prev.developers.slice(0, 3),
        }));
      } else {
        setGame((prev) => ({ ...prev, developers: defaultDevelopers }));
      }
    }

    if (_game.publishers) {
      if (!showPublishers) {
        setGame((prev) => ({
          ...prev,
          publishers: prev.publishers.slice(0, 3),
        }));
      } else {
        setGame((prev) => ({ ...prev, publishers: defaultPublishers }));
      }
    }

    if (_game.genres) {
      if (!showGenres) {
        setGame((prev) => ({
          ...prev,
          genres: prev.genres.slice(0, 3),
        }));
      } else {
        setGame((prev) => ({ ...prev, genres: defaultGenres }));
      }
    }
  }, [
    showDevelopers,
    _game.developers,
    defaultDevelopers,
    showPublishers,
    _game.publishers,
    defaultPublishers,
    showGenres,
    _game.genres,
    defaultGenres,
  ]);

  useEffect(() => {
    descriptionRef.current && autoAnimate(descriptionRef.current);
    publishersRef.current && autoAnimate(publishersRef.current);
    developersRef.current && autoAnimate(developersRef.current);
    genresRef.current && autoAnimate(genresRef.current);
  }, [descriptionRef, publishersRef, developersRef, genresRef]);

  return (
    <div className="flex flex-col lg:flex-row gap-3 lg:max-w-7xl lg:m-auto">
      <Modal
        width="w-full lg:w-1/3"
        className="max-h-[700px] overflow-y-auto !rounded-none"
        modalOpen={reviewModalOpen}
        handleClose={closeReviewModal}
        floatingTop={
          <div className="flex flex-col lg:flex-row items-center self-start darkbg-gray-500 bg-gray-200 rounded-lg rounded-b-none w-full mb-1 p-2">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-3">
                <img
                  className="w-12 h-12 rounded-full object-cover"
                  src="/default_avatar.svg"
                />
                <Typography thickness={3}>
                  {showReview?.user?.username}
                  {"'"}s review
                </Typography>
                <Typography
                  thickness={3}
                  className="bg-primary-300 !px-1 mx-auto !py-0.5 rounded-lg"
                >
                  {humanize(showReview?.recommend as string)}
                </Typography>
                <Typography thickness={3}>Overall Score: 8</Typography>
              </div>
              <div className="flex items-center gap-3">
                <Typography thickness={3}>
                  {dayjs(showReview?.createdAt).format("DD MMM YYYY")}
                </Typography>
                <button>
                  <WhiteFlag />
                </button>
              </div>
            </div>
          </div>
        }
        floatingBottom={
          <div className="flex flex-col  items-center justify-center dark:bg-gray-500 bg-gray-200 rounded-lg rounded-t-none w-full mt-1 p-2">
            <div className="grid grid-cols-2 gap-3">
              <Button color="secondary" icon={<ThumbsUp />}>
                1.5k
              </Button>
              <Button color="secondary" icon={<ThumbsDown />}>
                1.5k
              </Button>
            </div>
          </div>
        }
      >
        {showReview?.review}
      </Modal>
      <ReactTooltip effect="solid" />
      <div className="hidden lg:block absolute h-[21rem] left-0 top-0 w-full -z-10">
        <div
          className=" w-full h-72 bg-cover bg-center bg-no-repeat after:absolute after:left-0 after:top-0 after:h-full after:w-full after:pointer-events-none after:bg-gradient-to-r after:from-primary-300/25 after:to-transparent after:backdrop-blur-lg"
          style={{
            backgroundImage: `url(${displayImage(game.cover)})`,
          }}
        ></div>
      </div>
      <div className="relative flex flex-col">
        <img
          src={displayImage(game.cover)}
          alt={game.title}
          className="w-full h-60 lg:w-60 lg:h-80 object-cover rounded-lg shadow-ni"
        />
        <div className="hidden lg:flex flex-col flex-wrap gap-3 w-full mt-3">
          <div className="dark:bg-gray-500 bg-gray-100 rounded-lg p-3 w-60">
            <Typography thickness={4}>Platforms</Typography>

            {game.platforms && game.platforms.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {game.platforms.map((platform) => (
                  <div
                    key={platform.id}
                    className="flex items-center gap-1 dark:bg-gray-400 bg-gray-100 rounded-lg px-3 py-2 !text-white"
                    data-tip={platform.platform.label}
                  >
                    {getPlatformIcon(platform.platform.value)}
                  </div>
                ))}
              </div>
            ) : (
              <Typography>No platforms</Typography>
            )}
          </div>

          <div className="dark:bg-gray-500 bg-gray-100 rounded-lg p-3 w-60">
            <Typography thickness={4}>Alternative Titles</Typography>
            <Typography className="flex flex-wrap overflow-y-auto max-h-24 alt-titles">
              {game.alternativeTitles && game.alternativeTitles.length > 0 ? (
                game.alternativeTitles.join(", ")
              ) : (
                <Typography>None</Typography>
              )}
            </Typography>
          </div>

          <div className="dark:bg-gray-500 bg-gray-100 rounded-lg p-3">
            <Typography thickness={4}>External Links</Typography>

            {game.retailLinks && game.retailLinks.length > 0 ? (
              <div className="flex gap-2 overflow-x-auto">
                {game.retailLinks.map((link) => (
                  <div
                    key={link.id}
                    className="flex items-center gap-1 dark:bg-gray-400 bg-gray-100 rounded-lg px-3 py-2"
                  >
                    {Object.keys(link).map((key) => (
                      <>
                        {getRetailLogo(key)}
                        <Typography thickness={3} className="whitespace-nowrap">
                          {link[key]}
                        </Typography>
                      </>
                    ))}
                  </div>
                ))}
              </div>
            ) : (
              <Typography>No external links ⊙﹏⊙∥</Typography>
            )}
          </div>

          <div className="dark:bg-gray-500 bg-gray-100 rounded-lg p-3">
            <Typography thickness={4}>Admin</Typography>

            <div className="flex items-center flex-wrap gap-2">
              <Popover
                text="Copied to clipboard"
                visible={animateFingerprint}
                placement="right"
              >
                <motion.button
                  data-tip="Copy ID"
                  onTap={() => {
                    startFingerprintAnimation();
                    window.navigator.clipboard.writeText(game.id);
                  }}
                >
                  <svg
                    width="2em"
                    height="2em"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    color="currentColor"
                  >
                    <motion.path
                      d="M7 16v-4.639c0-.51.1-.999.285-1.453M17 16v-3.185m-7.778-5.08A5.506 5.506 0 0112 7c2.28 0 4.203 1.33 4.805 3.15M10 17v-2.177M14 17v-5.147C14 10.83 13.105 10 12 10s-2 .83-2 1.853v.794"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={"none"}
                      animate={animateFingerprint ? "active" : "none"}
                      variants={{
                        active: {
                          pathLength: [0, 1],
                        },
                        none: { pathLength: 1 },
                      }}
                      transition={{ duration: 3 }}
                    ></motion.path>
                    <motion.path
                      d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></motion.path>
                  </svg>
                </motion.button>
              </Popover>
            </div>
          </div>

          {/* <div className="flex items-center dark:bg-gray-500 bg-gray-100 rounded-lg p-3">
            <Button rounded>
              <Twitter />
            </Button>
            <div className="w-1 h-full dark:bg-gray-450 bg-gray-150 mx-3"></div>
            <Button rounded>
              <WhiteFlag fill="var(--text-color)" color="var(--text-color)" />
            </Button>
          </div> */}
          {/* divider */}
          {/* <div className="w-full h-0.5 bg-gray-300 dark:bg-gray-500 my-3"></div> */}
        </div>
        <div className="lg:hidden absolute top-0 left-0 w-full h-full bg-black bg-opacity-50" />

        <div className="lg:hidden flex flex-col absolute p-3 w-full h-full">
          <Typography.Title thickness={5} level="2">
            {game.title}
          </Typography.Title>
          <StarRating filled={Math.floor(game.score / 2)} />
          <Typography thickness={3}>
            {game.reviews
              ? `${game.reviews.length} ${pluralize(
                  "review",
                  game.reviews.length
                )}`
              : "No reviews"}
          </Typography>
          <div className="flex items-center mt-auto">
            <Button>Status</Button>

            <div className="flex items-center gap-2 ml-auto">
              <Button rounded>
                <Heart />
              </Button>
              <Button rounded>
                <ShareAndroid />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-5 px-3">
        <div className="hidden lg:flex flex-col gap-3">
          <Typography.Title className="hidden lg:block" thickness={5} level="1">
            {game.title}
          </Typography.Title>

          <div className="hidden lg:flex flex-col gap-1">
            <Typography
              className="flex items-center gap-2 !text-xl"
              thickness={3}
            >
              Score:
              <Typography className="!text-xl" thickness={4}>
                {game?.score ?? "N/A"}
              </Typography>
            </Typography>
            <div className="stars flex items-center gap-2">
              {/* fill star based on game.score */}
              {/* score range 0-10 */}
              <StarRating filled={Math.floor(game.score / 2)} />
              {/* {[0, 1, 2, 3, 4].map((i) => (
                <StarOutline
                  key={i}
                  width="1.5em"
                  color="yellow"
                  height="1.5em"
                  fill={i < game.score ? "yellow" : "none"}
                  />
              ))} */}
            </div>
          </div>

          <div className="hidden lg:grid grid-cols-1 lg:grid-cols-[200px_max-content_100px_100px] gap-2">
            <Button icon={<PlaylistAdd width="1.58em" height="1.58em" />}>
              Add to list
            </Button>
            <Button className="lg:!w-fit bg-pink-600 hover:bg-pink-500">
              <StarOutline />
            </Button>
            <Button
              className="bg-gray-400 hover:bg-gray-450 dark:bg-gray-100"
              icon={<EditPencil />}
            >
              Edit
            </Button>
            <Button
              className="bg-gray-400 hover:bg-gray-450 dark:bg-gray-100"
              icon={<WhiteFlag />}
            >
              Report
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Typography.Title level="4" thickness={3}>
            History
          </Typography.Title>

          <div
            className="p-3 dark:bg-gray-500 bg-gray-100 rounded-lg cursor-pointer"
            ref={descriptionRef}
            onClick={toggleDescription}
          >
            {!showDescription && (
              <>
                <Typography ellipsis className="!max-w-xs lg:!max-w-4xl">
                  {game.description}
                </Typography>
                <Typography thickness={3}>Show more</Typography>
              </>
            )}
            {showDescription && (
              <>
                <Typography>{game.description}</Typography>
                <Typography thickness={3}>Show less</Typography>
              </>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Typography.Title className="lg:hidden" level="4" thickness={3}>
            Info
          </Typography.Title>

          <div className="flex flex-col gap-2 rounded-lg p-3 lg:bg-transparent lg:p-0">
            <div className="grid grid-cols-2 gap-5">
              <div className="flex flex-col">
                <div className="flex items-center justify-between">
                  <Typography className="lg:!text-xl" thickness={3}>
                    Developers
                  </Typography>
                  <motion.button
                    onClick={toggleDevelopers}
                    animate={{ rotate: showDevelopers ? 180 : 0 }}
                  >
                    {showDevelopers ? (
                      <EyeOff width="1.8em" height="1.8em" />
                    ) : (
                      <EyeEmpty width="1.8em" height="1.8em" />
                    )}
                  </motion.button>
                </div>

                {game.developers && game.developers.length > 0 ? (
                  <div
                    className="flex flex-col lg:grid lg:grid-cols-3 gap-2 lg:dark:bg-gray-500 lg:bg-gray-100 lg:rounded-lg lg:p-1.5"
                    ref={developersRef}
                  >
                    {game.developers.map((developer, i) => (
                      <div key={developer.id}>
                        <div className="flex items-center gap-2 dark:bg-gray-450 bg-gray-150 rounded-lg px-3 py-2">
                          {developer.developer.logo && (
                            <img
                              src={displayImage(developer.developer.logo)}
                              alt={developer.developer.name}
                              className="w-6 h-6 rounded-lg object-cover"
                            />
                          )}
                          <Typography
                            thickness={3}
                            ellipsis
                            className="whitespace-nowrap w-32 lg:w-auto"
                          >
                            {developer.developer.name}
                          </Typography>
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
                  <Typography>No developers (っ °Д °;)っ</Typography>
                )}
              </div>

              <div className="flex flex-col">
                <div className="flex items-center justify-between">
                  <Typography className="lg:!text-xl" thickness={3}>
                    Publishers
                  </Typography>
                  <motion.button
                    onClick={togglePublishers}
                    animate={{ rotate: showPublishers ? 180 : 0 }}
                  >
                    {showPublishers ? (
                      <EyeOff width="1.8em" height="1.8em" />
                    ) : (
                      <EyeEmpty width="1.8em" height="1.8em" />
                    )}
                  </motion.button>
                </div>

                {game.publishers && game.publishers.length > 0 ? (
                  <div
                    className="flex flex-col lg:grid lg:grid-cols-3 gap-2 lg:dark:bg-gray-500 lg:bg-gray-100 lg:rounded-lg lg:p-1.5"
                    ref={publishersRef}
                  >
                    {game.publishers.map((publisher, i) => (
                      <div key={publisher.id}>
                        <div className="flex items-center gap-2 dark:bg-gray-450 bg-gray-150 rounded-lg px-3 py-2">
                          {publisher.publisher.logo && (
                            <img
                              src={displayImage(publisher.publisher.logo)}
                              alt={publisher.publisher.name}
                              className="w-6 h-6 rounded-lg object-cover"
                            />
                          )}
                          <Typography
                            thickness={3}
                            ellipsis
                            className="whitespace-nowrap w-32 lg:w-auto"
                          >
                            {publisher.publisher.name}
                          </Typography>
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
                  <Typography>No publishers (ノへ￣、)</Typography>
                )}
              </div>
            </div>

            <div className="flex flex-col lg:hidden">
              <Typography thickness={3}>Where to buy</Typography>

              {/* horizontal scrollable flex div */}
              {game.retailLinks && game.retailLinks.length > 0 ? (
                <div className="flex gap-2 overflow-x-auto">
                  {game.retailLinks.map((link) => (
                    <div
                      key={link.id}
                      className="flex items-center gap-1 dark:bg-gray-450 bg-gray-150 rounded-lg px-3 py-2"
                    >
                      {Object.keys(link).map((key) => (
                        <>
                          {getRetailLogo(key)}
                          <Typography
                            thickness={3}
                            className="whitespace-nowrap"
                          >
                            {link[key]}
                          </Typography>
                        </>
                      ))}
                    </div>
                  ))}
                </div>
              ) : (
                <Typography>No retail ＞︿＜ links</Typography>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className="flex flex-col">
            <div className="flex items-center justify-between">
              <Typography className="lg:!text-lg" thickness={3}>
                Genres
              </Typography>
              <motion.button
                onClick={isLg ? toggleGenres : toggleShowGenres}
                animate={{
                  rotate: (isLg ? showGenres : displayGenres) ? 180 : 0,
                }}
              >
                {(isLg ? showGenres : displayGenres) ? (
                  <EyeOff width="1.8em" height="1.8em" />
                ) : (
                  <EyeEmpty width="1.8em" height="1.8em" />
                )}
              </motion.button>
            </div>

            {!displayGenres && (
              <Typography thickness={3}>
                Click the eye icon to show genres
              </Typography>
            )}
            {game.genres && game.genres.length > 0 ? (
              <div
                className="flex flex-wrap lg:grid lg:grid-cols-3 gap-2 lg:dark:bg-gray-500 lg:bg-gray-100 lg:rounded-lg lg:p-1.5"
                ref={genresRef}
              >
                {displayGenres &&
                  game.genres.map((genre, i) => (
                    <div key={genre.id}>
                      <Typography
                        thickness={3}
                        ellipsis
                        className="whitespace-nowrap lg:!w-auto dark:bg-gray-450 bg-gray-150 rounded-lg px-3 py-2"
                      >
                        {genre.genre.label}
                      </Typography>
                    </div>
                  ))}
              </div>
            ) : (
              <Typography>No genres /_ \</Typography>
            )}
          </div>
        </div>

        <div className="flex flex-col">
          <Typography thickness={3}>Characters</Typography>

          {/* horizontal scrollable flex div */}
          {game.characters && game.characters.length > 0 ? (
            <div className="flex flex-col lg:grid lg:grid-cols-5 flex-wrap gap-3">
              {game.characters.slice(0, 5).map((character) => (
                <div
                  key={character.id}
                  className="flex items-center gap-1 dark:bg-gray-500 bg-gray-100 rounded-lg w-full"
                >
                  <img
                    className="w-12 h-16 rounded-lg rounded-r-none object-cover"
                    src={displayImage(character.character.photo)}
                    alt={character.character.name}
                  />
                  <div className="flex flex-col px-3 py-2">
                    <Typography
                      ellipsis
                      thickness={3}
                      className="whitespace-nowrap"
                    >
                      {character.character.name}
                    </Typography>
                    <Typography>{character.role ?? "No role"}</Typography>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <Typography>No characters ＞﹏＜</Typography>
          )}
        </div>

        <div className="flex flex-col">
          <Typography thickness={3}>Staff</Typography>

          {/* horizontal scrollable flex div */}
          {game.staff && game.staff.length > 0 ? (
            <div className="flex flex-col lg:grid lg:grid-cols-5 flex-wrap gap-3">
              {game.staff.slice(0, 5).map((staff) => (
                <div
                  key={staff.id}
                  className="flex items-center gap-1 dark:bg-gray-500 bg-gray-100 rounded-lg w-full"
                >
                  <img
                    className="w-12 h-16 rounded-lg rounded-r-none object-cover"
                    src={displayImage(staff.people.photo)}
                    alt={staff.people.name}
                  />
                  <div className="flex flex-col px-3 py-2">
                    <Typography
                      ellipsis
                      thickness={3}
                      className="whitespace-nowrap w-32"
                    >
                      {staff.people.name}
                    </Typography>
                    <Typography>{staff.role ?? "No role"}</Typography>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <Typography>No staff ಥ_ಥ</Typography>
          )}
        </div>

        <div className="flex flex-col">
          <div className="flex items-center justify-between">
            <Typography className="lg:!text-lg" thickness={3}>
              Reviews
            </Typography>
            <button>View more</button>
          </div>

          {game.reviews && game.reviews.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {game.reviews.map((review) => (
                <div
                  key={review.id}
                  className="flex flex-col gap-3 dark:bg-gray-500 bg-gray-100 rounded-lg w-full px-2 py-1"
                >
                  <div className="flex flex-col lg:flex-row items-center justify-between gap-3">
                    <div className="flex flex-wrap items-center gap-3">
                      <img
                        className="w-12 h-12 rounded-full object-cover"
                        src="/default_avatar.svg"
                      />
                      <Typography thickness={3}>
                        {review.user?.username}
                      </Typography>
                      <Typography
                        thickness={3}
                        className="bg-primary-300 !px-1 mx-auto !py-0.5 rounded-lg"
                      >
                        {humanize(review.recommend)}
                      </Typography>
                    </div>
                    <div className="flex items-center gap-3">
                      <Typography thickness={3}>
                        {dayjs(review.createdAt).format("MMM DD, YYYY")}
                      </Typography>
                      <button>
                        <WhiteFlag />
                      </button>
                    </div>
                  </div>
                  {/* limited review content with see more/less button */}
                  <div className="flex flex-col" ref={reviewRef}>
                    {review.hasSpoilers && (
                      <Typography className="text-red-500" thickness={3}>
                        This review may contain spoilers
                      </Typography>
                    )}
                    <div className="[display:_-webkit-box] [-webkit-box-orient:_vertical] overflow-hidden [-webkit-line-clamp:_3] h-auto">
                      {`${review.review}...`}
                    </div>
                    <button
                      className="mx-auto"
                      onClick={() => toggleReview(review)}
                    >
                      <Typography thickness={3}>See more</Typography>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <Typography>No reviews ಥ_ಥ</Typography>
          )}
        </div>
      </div>
    </div>
  );
}
