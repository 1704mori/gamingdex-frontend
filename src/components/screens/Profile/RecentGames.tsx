import { Skeleton } from "@/components/ui/skeleton"
import { userService } from "@/lib/services/user"
import { IUser, TGamingStatus } from "@/lib/types/user"
import { useQuery } from "@tanstack/react-query"
import { buildGameUrl, cn, displayImage, getRelativeTimeString, humanize } from "@/lib/helpers/common"
import Link from "next/link";

export function LoadingRecentGames() {
  return (
    <div className="flex flex-col gap-3">
      <div
        className="flex items-center gap-3 overflow-hidden relative rounded-lg bg-accent2 px-2 py-1"
      >
        <Skeleton className="w-20 h-16 rounded-lg" color="accent" />
        <div className="flex flex-col gap-1 w-full">
          <div className="flex flex-col gap-1">
            <Skeleton className="w-2/3 h-5 rounded-md" color="accent" />
            <Skeleton className="w-1/3 h-5 rounded-md" color="accent" />
          </div>
        </div>
      </div>
      <div
        className="flex items-center gap-3 overflow-hidden relative rounded-lg bg-accent2 px-2 py-1"
      >
        <Skeleton className="w-20 h-16 rounded-lg" color="accent" />
        <div className="flex flex-col gap-1 w-full">
          <div className="flex flex-col gap-1">
            <Skeleton className="w-2/3 h-5 rounded-md" color="accent" />
            <Skeleton className="w-1/3 h-5 rounded-md" color="accent" />
          </div>
        </div>
      </div>
      <div
        className="flex items-center gap-3 overflow-hidden relative rounded-lg bg-accent2 px-2 py-1"
      >
        <Skeleton className="w-20 h-16 rounded-lg" color="accent" />
        <div className="flex flex-col gap-1 w-full">
          <div className="flex flex-col gap-1">
            <Skeleton className="w-2/3 h-5 rounded-md" color="accent" />
            <Skeleton className="w-1/3 h-5 rounded-md" color="accent" />
          </div>
        </div>
      </div>
    </div>
  )
}

type Props = {
  user: IUser;
}

function buildStatusColor(status: TGamingStatus) {
  if (status === "playing") return "bg-green-600"
  if (status === "completed") return "bg-primary"
  if (status === "dropped") return "bg-red-600"
  if (status === "on_hold") return "bg-yellow-600"
  if (status === "plan_to_play") return "bg-accent4"
}

export function RecentGames({ user }: Props) {
  const { data: games, isLoading } = useQuery(
    ["activities", user?.id],
    async () => userService.games(user.id, {
      includes: ["game"],
      limit: 3,
    }),
    {
      suspense: true,
    }
  )

  return (
    <>
      {!games?.attributes.length && (
        <span className="text-sm font-medium text-slate-300">
          No recent games
        </span>
      )}
      {/* reverse cuz ordering is not implemented yet */}
      {games?.attributes.reverse().map((game) => (
        <div
          key={game.game.id}
          className="flex items-center gap-3 overflow-hidden relative rounded-lg bg-accent2 px-2 py-1">
          <div className={cn("w-1 h-16 rounded-l-lg absolute left-0", buildStatusColor(game.status))}></div>
          <Link href={buildGameUrl(game.game)}>
            <img src={displayImage(game.game.cover)} className="w-20 h-16 rounded-lg" />
          </Link>
          <div className="flex flex-col gap-1 w-full">
            <strong className="text-sm font-medium">
              <Link href={buildGameUrl(game.game)}>
                {game.game.title}
              </Link>
            </strong>
            <div className="flex gap-1">
              <span className="self-end text-xs font-medium text-slate-300">
                {
                  humanize(game.status)
                }
              </span>
              <span className="self-end text-xs font-medium text-slate-300">
                {getRelativeTimeString(new Date(game.createdAt))}
              </span>
              <span className="text-sm font-medium ml-auto bg-primary w-7 h-7 flex justify-center items-center rounded-lg">
                {game.score}
              </span>
            </div>
          </div>
        </div>
      ))}
    </>
  )
}
