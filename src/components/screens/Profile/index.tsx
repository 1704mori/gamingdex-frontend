"use client"
import Button from "@/components/Button";
import { UserIcon, UserPlus } from "lucide-react";
import ActivityHistory from "./ActivityHistory";
import History from "./components/History";
import Link from "next/link";
import { IUser } from "@/lib/types/user";
import { userAtom } from "@/lib/stores/user";
import { useAtom } from "jotai";
import { useQuery } from "@tanstack/react-query";
import { userService } from "@/lib/services/user";
import { Suspense } from "react";
import { LoadingRecentGames, RecentGames } from "./RecentGames";

type Props = {
  user: IUser;
}

function isLoggedUser(user: IUser, loggedUser?: IUser) {
  return loggedUser?.id === user.id;
}

export default function Profile({ user }: Props) {
  const [loggedUser] = useAtom(userAtom);

  return (
    <div className="flex flex-col mb-auto lg:mt-12 lg:flex-row gap-3 lg:max-w-5xl w-full h-full">
      <div className="hidden lg:block absolute h-[21rem] left-0 top-0 w-full">
        <div
          className=" w-full h-72 bg-cover bg-center bg-no-repeat after:absolute after:left-0 after:top-0 after:h-full after:w-full after:pointer-events-none after:bg-gradient-to-b after:from-black/50 after:to-transparent after:backdrop-blur-sm"
          style={{
            backgroundImage: `url(https://i.imgur.com/22LGnau.png)`,
          }}
        ></div>
      </div>
      <div className="relative hidden lg:flex flex-col items-center2 gap-6 w-full z-10 top-16">
        <div className="flex items-center gap-4 w-full">
          <img
            src="https://i.imgur.com/22LGnau.png"
            alt="profile cover"
            className="w-40 h-40 object-cover rounded-full shadow-lg"
          />
          <div className="flex flex-col mt-12 w-full">
            <div className="flex items-center justify-between">
              <strong className="text-xl font-semibold">
                {user.username}
              </strong>
              {
                // @ts-ignore
                loggedUser && isLoggedUser(user, loggedUser) && (
                  <button
                    type="button"
                    className="underline hover:text-slate-200"
                  >
                    Edit profile
                  </button>
                )
              }
            </div>
            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-between mt-8">
                <div className="flex items-center gap-6">
                  {
                    // @ts-ignore
                    loggedUser && !isLoggedUser(user, loggedUser) && (
                      <Button size="small" className="self-end font-semibold">
                        Follow
                      </Button>
                    )
                  }
                  <div className="flex flex-col text-center">
                    <div className="text-base">
                      Followers
                    </div>
                    <div className="text-sm font-medium px-1 py-1 bg-accent rounded-md">
                      123
                    </div>
                  </div>
                  <div className="flex flex-col text-center">
                    <div className="text-base">
                      Following
                    </div>
                    <div className="text-sm font-medium px-1 py-1 bg-accent rounded-md">
                      123
                    </div>
                  </div>
                </div>
                {
                  // @ts-ignore
                  !isLoggedUser(user, loggedUser) && (
                    <Button color="accent">
                      Report
                    </Button>
                  )
                }
              </div>
            </div>
          </div>
        </div>
        {user.bio && (
          <div>
            <span className="text-slate-300 text-sm font-medium">
              {user.bio}
            </span>
          </div>
        )}
        <div className="grid grid-cols-[1fr,27rem] gap-4 w-full">
          <div className="flex flex-col gap-1">
            <span className="font-medium">
              Activity
            </span>
            <Suspense fallback={<History data={[]} />}>
              <ActivityHistory user={user} />
            </Suspense>
          </div>
          <div className="flex flex-col gap-1 w-full">
            <span className="font-medium">
              Recent games
            </span>
            <div className="flex flex-col gap-4 bg-accent rounded-lg px-2 py-4">
              <Suspense fallback={<LoadingRecentGames />}>
                <RecentGames user={user} />
              </Suspense>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-start border-b border-zinc-700">
          <span className="font-medium divide-y-2 divide-white">
            Favorites
          </span>
        </div>
        <div className="flex flex-col gap-2 bg-accent rounded-lg p-3">
          <div className="flex flex-col gap-1">
            <span className="font-medium text-sm">
              Games
            </span>
            <div className="grid grid-cols-10 gap-3 bg-accent rounded-lg">
              {Array.from({ length: 10 }).map((_, index) => (
                <div className="group" key={index}>
                  <div className="relative overflow-hidden">
                    <Link href={"#"}>
                      <img
                        className="rounded-lg w-24 h-28 object-cover shadow-san group-hover:blur-[0.5px]"
                        src={"https://i.imgur.com/22LGnau.png"}
                      />
                    </Link>
                    <div className="flex items-center justify-between absolute opacity-100 bottom-0 lg:opacity-0 lg:-bottom-8 group-hover:opacity-100 group-hover:bottom-0 transition-all ease-in-out w-full px-2 py-2 bg-gradient-to-t from-black to-transparent rounded-b-lg pointer-events-none">
                      <span className="text-xs font-medium mx-auto #truncate">
                        Zelda: Tears of The Kingdom
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <span className="font-medium text-sm">
              Games
            </span>
            <div className="grid grid-cols-10 gap-3 bg-accent rounded-lg">
              {Array.from({ length: 10 }).map((_, index) => (
                <div className="group" key={index}>
                  <div className="relative overflow-hidden">
                    <Link href={"#"}>
                      <img
                        className="rounded-lg w-24 h-28 object-cover shadow-san group-hover:blur-[0.5px]"
                        src={"https://i.imgur.com/22LGnau.png"}
                      />
                    </Link>
                    <div className="flex items-center justify-between absolute opacity-100 bottom-0 lg:opacity-0 lg:-bottom-8 group-hover:opacity-100 group-hover:bottom-0 transition-all ease-in-out w-full px-2 py-2 bg-gradient-to-t from-black to-transparent rounded-b-lg pointer-events-none">
                      <span className="text-xs font-medium mx-auto #truncate">
                        Zelda: Tears of The Kingdom
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      <div className="flex flex-col relative">
        <img
          src="https://i.imgur.com/22LGnau.png"
          alt="profile cover"
          className="lg:hidden w-full h-60 lg:w-60 lg:h-80 object-cover rounded-lg shadow-ni bg-primary/50"
        />
        <div className="lg:hidden absolute top-0 left-0 w-full h-60 bg-black bg-opacity-50" />

        <div className="lg:hidden flex flex-col justify-end absolute gap-5 top-14 p-3 w-full h-full">
          <div className="flex items-center gap-3 w-full">
            <div className="bg-accent w-24 h-24 rounded-full">
              <UserIcon size="6rem" className="rounded-full" />
            </div>
            <div className="flex flex-col w-full">
              <div className="flex items-end justify-between mt-4">
                <h3 className="text-xl font-semibold">Username</h3>
                <button
                  type="button"
                  className="underline font-medium text-sm"
                >
                  Edit profile
                </button>
              </div>

              <div className="flex items-center justify-between mt-4">
                <Button size="small">
                  Follow
                </Button>
                <div className="flex flex-col text-center">
                  <div className="text-sm">
                    Followers
                  </div>
                  <div className="text-xs font-medium px-1 bg-accent rounded-md">
                    123
                  </div>
                </div>
                <div className="flex flex-col text-center">
                  <div className="text-sm">
                    Following
                  </div>
                  <div className="text-xs font-medium px-1 bg-accent rounded-md">
                    123
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="lg:hidden flex flex-col mt-14 px-4 gap-4">
        <div>
          <span className="text-slate-200 text-xs font-medium">
            Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.
          </span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center justify-between bg-accent px-2 py-4 rounded-lg">
            <span className="text-xs font-medium">Completed Games</span>

            <div className="rounded-full flex items-center justify-center bg-accent2 px-2.5 py-1">
              10
            </div>
          </div>
          <div className="flex items-center justify-between bg-accent px-2 py-4 rounded-lg">
            <span className="text-xs font-medium">Now Playing</span>
            <div className="rounded-full flex items-center justify-center bg-accent2 px-2.5 py-1">
              10
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-sm font-semibold">
            Recent games
          </span>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3 overflow-hidden rounded-lg bg-accent px-2 py-1 shadow-[0_15px_20px_-14px_hsla(119_,71%_,59%_,0.25)]">
              <img src="https://i.imgur.com/22LGnau.png" className="w-24 h-16 rounded-lg" />
              <div className="flex flex-col gap-1 w-full">
                <strong className="text-sm font-medium">
                  Zelda: Tears of the kingdom
                </strong>
                <div className="flex gap-1">
                  <span className="self-end text-xs font-medium text-slate-300">
                    Completed
                  </span>
                  <span className="self-end text-xs font-medium text-slate-300">
                    3 hours ago
                  </span>
                  <span className="text-sm font-medium ml-auto bg-primary w-7 h-7 flex justify-center items-center rounded-lg">
                    10
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 overflow-hidden rounded-lg bg-accent px-2 py-1 shadow-[0_15px_20px_-14px_hsla(119_,71%_,59%_,0.25)]">
              <img src="https://i.imgur.com/22LGnau.png" className="w-24 h-16 rounded-lg" />
              <div className="flex flex-col gap-1 w-full">
                <strong className="text-sm font-medium">
                  Zelda: Tears of the kingdom
                </strong>
                <div className="flex gap-1">
                  <span className="self-end text-xs font-medium text-slate-300">
                    Completed
                  </span>
                  <span className="self-end text-xs font-medium text-slate-300">
                    3 hours ago
                  </span>
                  <span className="text-sm font-medium ml-auto bg-primary w-7 h-7 flex justify-center items-center rounded-lg">
                    10
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 overflow-hidden rounded-lg bg-accent px-2 py-1 shadow-[0_15px_20px_-14px_hsla(119_,71%_,59%_,0.25)]">
              <img src="https://i.imgur.com/22LGnau.png" className="w-24 h-16 rounded-lg" />
              <div className="flex flex-col gap-1 w-full">
                <strong className="text-sm font-medium">
                  Zelda: Tears of the kingdom
                </strong>
                <div className="flex gap-1">
                  <span className="self-end text-xs font-medium text-slate-300">
                    Completed
                  </span>
                  <span className="self-end text-xs font-medium text-slate-300">
                    3 hours ago
                  </span>
                  <span className="text-sm font-medium ml-auto bg-primary w-7 h-7 flex justify-center items-center rounded-lg">
                    10
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-sm font-semibold">
            Favorite games
          </span>
          <div className="flex gap-2 px-2 py-3 bg-accent rounded-lg overflow-x-auto">
            <img src="https://i.imgur.com/22LGnau.png" className="w-20 h-24 rounded-lg" />
            <img src="https://i.imgur.com/22LGnau.png" className="w-20 h-24 rounded-lg" />
            <img src="https://i.imgur.com/22LGnau.png" className="w-20 h-24 rounded-lg" />
            <img src="https://i.imgur.com/22LGnau.png" className="w-20 h-24 rounded-lg" />
            <img src="https://i.imgur.com/22LGnau.png" className="w-20 h-24 rounded-lg" />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-sm font-semibold">
            Favorite characters
          </span>
          <div className="flex gap-2 px-2 py-3 bg-accent rounded-lg overflow-x-auto">
            <img src="https://i.imgur.com/22LGnau.png" className="w-20 h-24 rounded-lg" />
            <img src="https://i.imgur.com/22LGnau.png" className="w-20 h-24 rounded-lg" />
            <img src="https://i.imgur.com/22LGnau.png" className="w-20 h-24 rounded-lg" />
            <img src="https://i.imgur.com/22LGnau.png" className="w-20 h-24 rounded-lg" />
            <img src="https://i.imgur.com/22LGnau.png" className="w-20 h-24 rounded-lg" />
          </div>
        </div>

      </div>
    </div>
  );
}

