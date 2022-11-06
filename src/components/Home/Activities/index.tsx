import { useInfiniteQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import Link from "next/link";
import { Heart } from "iconoir-react";
import Button from "../../Button";
import { userService } from "@/lib/services/user";
import { buildGameUrl, displayImage } from "@/lib/helpers/common";

dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(timezone);

export default function Activities() {
  const {
    status,
    data,
    isFetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(
    ["activities"],
    ({ pageParam }) =>
      userService.activities({
        includes: ["likes", "user", "game"],
        offset: pageParam,
        limit: 6,
      }),
    {
      getNextPageParam: (lastPage) =>
        lastPage?.data.pagination.next ?? undefined,
    }
  );

  return (
    <>
      {status === "loading" && <div>Loading...</div>}
      {status === "error" && <div>Error</div>}

      {status === "success" && (
        <div className="flex flex-col gap-3">
          {data.pages.map((page, i) => (
            <div
              className="activities flex overflow-x-auto lg:grid lg:grid-cols-2 gap-3 py-1"
              key={i}
            >
              {page?.data && page.data.data.length > 0 ? (
                page?.data.data.map((activity) => (
                  // <Activity className="flex" key={activity.id}></Activity>
                  <div
                    className="activity flex flex-col lg:flex-row bg-accent rounded-lg"
                    key={activity.id}
                  >
                    <Link href={buildGameUrl(activity.game)} className="game-cover-link">
                      <img
                        className="w-full h-24 object-cover game-cover rounded-lg rounded-b-none"
                        src={displayImage(activity.game.cover)}
                        alt={activity.game.title}
                      />
                    </Link>
                    <div className="p-2 flex justify-between w-full">
                      <div className="grid grid-cols-1 justify-center w-full">
                        <div className="flex items-center justify-between w-full">
                          <div className="flex items-center">
                            <Link href={`/profile/${activity.user.username}`}>
                              <img
                                className="w-8 h-8 object-cover rounded-full"
                                src="/default_avatar.svg"
                                alt="Profile"
                              />
                            </Link>
                            <Link
                              href={`/profile/${activity.user.username}`}
                              className="ml-1 text-sm font-medium max-w-[8rem] truncate"
                            >
                              {activity.user.username}
                            </Link>
                          </div>
                          <span className="text-sm font-medium">
                            {dayjs
                              .utc(activity.createdAt)
                              .tz(dayjs.tz.guess())
                              .fromNow()}
                          </span>
                        </div>
                        <div className="gap-1 flex md:items-center justify-between">
                          <div className="text-sm flex gap-1 mt-auto max-w-[11rem] lg:max-w-[25rem] truncate">
                            <span className="text-sm" style={{ opacity: 0.9 }}>
                              {activity.action}
                            </span>
                            <Link href={buildGameUrl(activity.game)}>
                              <span className="font-medium">
                                {activity.game.title}
                              </span>
                            </Link>
                          </div>
                          <div className="mt-auto mr-2 flex items-center gap-1">
                            <button
                            // disabled={loading || isLiking}
                            // onClick={() => handleLikeActivity(activity)}
                            >
                              {/* <FaHeart
                              className={`transition-colors text-accent-2 hover:text-pink-1 ${classNames(
                                {
                                  "text-pink-1": liked[activity.id]?.liked,
                                }
                              )}`}
                            /> */}
                              <Heart width="1.2em" height="1.2em" />
                            </button>
                            <span className="text-sm font-medium">157</span>
                          </div>
                        </div>
                      </div>
                      <div className="actions flex flex-col"></div>
                    </div>
                  </div>
                ))
              ) : (
                <span className="font-medium">
                  How sad, we {"didn't"} find any activity yet, be the first to
                  add one! \^o^/
                </span>
              )}
            </div>
          ))}
          <Button
            onClick={() => {
              fetchNextPage();
            }}
            disabled={!hasNextPage || isFetchingNextPage}
          >
            {isFetchingNextPage
              ? "Loading more..."
              : hasNextPage
              ? "Load More"
              : "Nothing more to load"}
          </Button>
        </div>
      )}
    </>
  );
}
