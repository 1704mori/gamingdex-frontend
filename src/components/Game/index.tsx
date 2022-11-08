"use client";

import {
  EditPencil,
  Heart,
  PlaylistAdd,
  ShareAndroid,
  StarOutline,
  Trash,
  WhiteFlag,
} from "iconoir-react";
import {
  buildGameUrl,
  classes,
  displayImage,
  pluralize,
} from "../../lib/helpers/common";
import { IGame } from "../../lib/types/game";
import Button from "../Button";
import autoAnimate from "@formkit/auto-animate";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { getPlatformIcon, getRetailLogo } from "./utils";
import useDelayState from "@/lib/hooks/useDelayState";
import Popover from "../Popover";
import { useModal } from "../Modal";
import StarRating from "./StarRating";
import Tippy from "@tippyjs/react";
import { useQuery } from "@tanstack/react-query";
import { gameService } from "@/lib/services/game";
import ListModal from "./ListModal";
import { useRouter } from "next/router";
import { Select, SelectItem } from "../Select";
import { useSession } from "next-auth/react";
import { ROUTES } from "@/lib/helpers/consts";
import Content from "./Content";
import Reviews from "./Tabs/Reviews";
import Characters from "./Tabs/Characters";
import Staff from "./Tabs/Staff";
import useAddToPathUrl from "@/lib/hooks/useAddToPathUrl";

export default function Game({ game }: { game: IGame }) {
  const [showDescription, setShowDescription] = useState(false);

  const {
    open: setShowListModal,
    modalOpen: showListModal,
    close: closeListModal,
  } = useModal();

  const [animateFingerprint, startFingerprintAnimation] = useDelayState({
    defaultState: false,
    duration: 2000,
    exitState: false,
  });

  const [url, setUrl] = useAddToPathUrl();

  const { data: session } = useSession();

  const descriptionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    descriptionRef.current && autoAnimate(descriptionRef.current);
  }, [descriptionRef]);

  const toggleDescription = () => setShowDescription(!showDescription);

  const { data: status, isLoading: isLoadingStatus } = useQuery(
    ["list_status"],
    async () => gameService.getListStatus(game.id)
  );

  const router = useRouter();

  const handleAddToMyList = async () => {
    if (!session) {
      router.push(ROUTES.login);
      return;
    }

    await gameService.addToMyList(game.id);
    router.reload();
  };

  return (
    <div className="flex gap-3 max-lg:flex-col w-full max-w-7xl items-start mb-auto lg:mt-12">
      <ListModal
        closeListModal={closeListModal}
        showListModal={showListModal}
        game={game}
        key={game.id}
      />
      <div className="hidden lg:block absolute h-[21rem] left-0 top-0 w-full">
        <div
          className=" w-full h-72 bg-cover bg-center bg-no-repeat after:absolute after:left-0 after:top-0 after:h-full after:w-full after:pointer-events-none after:bg-gradient-to-b after:from-black/50 after:to-transparent after:backdrop-blur-sm"
          style={{
            backgroundImage: `url(${displayImage(game.cover)})`,
          }}
        ></div>
      </div>

      <div className="relative flex flex-col max-lg:w-full z-10">
        <img
          src={displayImage(game.cover)}
          alt={game.title}
          className="w-full h-60 lg:w-60 lg:h-80 object-cover rounded-lg shadow-ni"
        />
        <div className="hidden lg:flex flex-col flex-wrap gap-3 w-full mt-3">
          <div className="bg-accent rounded-lg p-3 w-60">
            <span className="font-medium">Platforms</span>

            <div className="flex flex-wrap gap-2">
              {game.platforms && game.platforms.length > 0 ? (
                <>
                  {game.platforms.map((platform) => (
                    <Tippy
                      key={platform.id}
                      placement="auto"
                      content={platform.platform.label}
                    >
                      <div className="flex items-center gap-1 bg-accent-dark2 rounded-lg px-3 py-2 select-none">
                        {getPlatformIcon(platform.platform.value)}
                      </div>
                    </Tippy>
                  ))}
                </>
              ) : (
                <span>No platforms</span>
              )}
            </div>
          </div>

          <div className="bg-accent rounded-lg p-3 w-60">
            <span className="font-medium">Alternative Titles</span>
            <span className="flex flex-wrap overflow-y-auto max-h-24 alt-titles">
              {game.alternativeTitles && game.alternativeTitles.length > 0 ? (
                game.alternativeTitles.join(", ")
              ) : (
                <span>None</span>
              )}
            </span>
          </div>

          <div className="bg-accent rounded-lg p-3">
            <span className="font-medium">Where to buy</span>

            <div className="flex gap-2 overflow-x-auto">
              {game.retailLinks && game.retailLinks.length > 0 ? (
                <>
                  {game.retailLinks.map((link) => (
                    <div
                      key={link.id}
                      className="flex items-center gap-1 bg-accent-dark2 rounded-lg px-3 py-2"
                    >
                      {Object.keys(link).map((key) => (
                        <>
                          {getRetailLogo(key)}
                          <span
                            className="whitespace-nowrap font-medium"
                            key={key}
                          >
                            {link[key]}
                          </span>
                        </>
                      ))}
                    </div>
                  ))}
                </>
              ) : (
                <span>No links ⊙﹏⊙∥</span>
              )}
            </div>
          </div>

          <div className="bg-accent rounded-lg p-3">
            {/* <span className="font-medium">Admin</span> */}

            <div className="flex items-center flex-wrap gap-2">
              <Popover
                text="Copied to clipboard"
                visible={animateFingerprint}
                placement="right"
                className="flex"
              >
                <Tippy placement="auto" content="Copy ID">
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
                </Tippy>
              </Popover>
            </div>
          </div>
        </div>
        <div className="lg:hidden absolute top-0 left-0 w-full h-full bg-black bg-opacity-50" />

        <div className="lg:hidden flex flex-col absolute p-3 w-full h-full text-white">
          <span className="text-2xl font-bold">{game.title}</span>
          <StarRating filled={Math.floor(game.score / 2)} />
          <span className="font-medium">
            {game.reviews
              ? `${game.reviews.length} ${pluralize(
                  "review",
                  game.reviews.length
                )}`
              : "No reviews"}
          </span>
          <div className="flex items-center mt-auto">
            <Button>Status</Button>

            <div className="flex items-center gap-2 ml-auto">
              <button className="btn-icon bg-pink-600 hover:bg-pink-700">
                <Heart />
              </button>
              <button className="btn-icon">
                <ShareAndroid />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-5 px-3 w-full z-10">
        <div className="hidden lg:flex flex-col gap-3 text-white">
          <h2 className="hidden lg:block font-bold text-2xl">{game.title}</h2>

          <div className="hidden lg:flex flex-col">
            <span className="flex items-center gap-2 text-xl font-medium">
              Score:
              <span className="text-xl font-medium">
                {game?.score ?? "N/A"}
              </span>
            </span>
            <div className="stars flex items-center gap-2">
              <StarRating filled={Math.floor(game.score / 2)} />
            </div>
          </div>
          <div
            className={classes(
              "hidden lg:grid grid-cols-1 gap-2",
              !status?.status
                ? "lg:grid-cols-[200px_max-content_200px_100px_100px]"
                : "lg:grid-cols-[265px_max-content_200px_100px_100px]"
            )}
          >
            {!status?.status ? (
              <Button onClick={handleAddToMyList}>Add to library</Button>
            ) : (
              <div className="flex items-center gap-2 w-full">
                <Select
                  color="accent-light2"
                  className="w-full"
                  key="status"
                  onSelect={console.log}
                >
                  <SelectItem value="playing">Playing</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="on_hold">On-hold</SelectItem>
                  <SelectItem value="dropped">Dropped</SelectItem>
                  <SelectItem value="plan_to_play">Plan to play</SelectItem>
                </Select>
                <Select
                  color="accent-light2"
                  placeholder="⭐"
                  key="score"
                  onSelect={console.log}
                >
                  {[...Array(10)].map((_, i) => (
                    <SelectItem key={i} value={i}>
                      {i}
                    </SelectItem>
                  ))}
                </Select>
                <Button>
                  <Trash />
                </Button>
              </div>
            )}
            <Button color="pink">
              <StarOutline />
            </Button>
            <Button
              color="accent"
              className="!bg-accent-light2 hover:!bg-accent-light"
              onClick={setShowListModal}
            >
              <PlaylistAdd width="1.58em" height="1.58em" />
              Add to list
            </Button>
            <Button
              color="accent"
              className="!bg-accent-light2 hover:!bg-accent-light"
            >
              <EditPencil />
              Edit
            </Button>
            <Button
              color="accent"
              className="!bg-accent-light2 hover:!bg-accent-light"
            >
              <WhiteFlag />
              Report
            </Button>
          </div>
        </div>

        <div className="mt-4">
          <div className="flex items-center gap-3">
            <Button
              type="button"
              color={url === buildGameUrl(game) ? "primary" : "accent"}
              size="medium"
              onClick={() => setUrl(buildGameUrl(game))}
            >
              Overview
            </Button>
            <Button
              type="button"
              color={url.includes("characters") ? "primary" : "accent"}
              size="medium"
              onClick={() => setUrl(`${buildGameUrl(game)}/characters`)}
            >
              Characters
            </Button>
            <Button
              size="medium"
              type="button"
              color={url.includes("staff") ? "primary" : "accent"}
              onClick={() => setUrl(`${buildGameUrl(game)}/staff`)}
            >
              Staff
            </Button>
            <Button
              size="medium"
              type="button"
              color={url.includes("reviews") ? "primary" : "accent"}
              onClick={() => setUrl(`${buildGameUrl(game)}/reviews`)}
            >
              Reviews
            </Button>
          </div>

          {url == buildGameUrl(game) && (
            <div className="flex flex-col mt-3">
              <div className="flex flex-col gap-1">
                <h4 className="font-bold text-xl">History</h4>

                <div
                  className="flex flex-col p-3 bg-accent rounded-lg cursor-pointer"
                  ref={descriptionRef}
                  onClick={toggleDescription}
                >
                  {!showDescription && (
                    <>
                      <span className="!max-w-xs lg:!max-w-2xl xl:!max-w-3xl truncate">
                        {game.description}
                      </span>
                      <span className="font-medium">Show more</span>
                    </>
                  )}
                  {showDescription && (
                    <>
                      <span>{game.description}</span>
                      <span className="font-medium">Show less</span>
                    </>
                  )}
                </div>
              </div>

              <Content key="content" game={game} />
            </div>
          )}

          {url.includes("characters") && <Characters game={game} />}
          {url.includes("staff") && <Staff game={game} />}
          {url.includes("reviews") && <Reviews game={game} />}
        </div>
      </div>
    </div>
  );
}
