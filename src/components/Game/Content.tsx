import { buildGameUrl, classes, displayImage } from "@/lib/helpers/common";
import { IGame } from "@/lib/types/game";
import { AnimatePresence, motion } from "framer-motion";
import { EyeOff, EyeEmpty } from "iconoir-react";
import { useRouter } from "next/router";
import { useState } from "react";
import Character from "./Character";
import Review from "./Review";
import Staff from "./Staff";
import { getRetailLogo } from "./utils";

export default function Content({ game }: { game: IGame }) {
  const [showInfo, setShowInfo] = useState(true);

  const toggleInfo = () => setShowInfo(!showInfo);

  const router = useRouter();

  return (
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
            <Character characters={game.characters} key={game.id} />
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
            <Staff staff={game.staff} key={game.id} />
          </div>
        ) : (
          <span>No staff ಥ_ಥ</span>
        )}
      </div>

      <div className="flex flex-col">
        <div className="flex items-center justify-between">
          <span className="lg:text-lg font-medium">Reviews</span>
          <button
            type="button"
            onClick={() =>
              router.push(buildGameUrl(game), `${buildGameUrl(game)}/reviews`, {
                shallow: true,
              })
            }
          >
            View more
          </button>
        </div>

        {game.reviews && game.reviews.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <Review reviews={game.reviews} key={game.id} />
          </div>
        ) : (
          <span>No reviews ಥ_ಥ</span>
        )}
      </div>
    </div>
  );
}
