import { Skeleton } from "@/components/ui/skeleton"
import { userService } from "@/lib/services/user"
import { userAtom } from "@/lib/stores/user"
import { IUser } from "@/lib/types/user"
import { useQuery } from "@tanstack/react-query"
import { useAtom } from "jotai"

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
      {games?.attributes.map((game) => (
        <div
          key={game.game.id}
          className="flex items-center gap-3 overflow-hidden relative rounded-lg bg-accent2 px-2 py-1">
          <div className="w-1 h-16 bg-green-600 rounded-l-lg absolute left-0"></div>
          <img src="https://i.imgur.com/22LGnau.png" className="w-20 h-16 rounded-lg" />
          <div className="flex flex-col gap-1 w-full">
            <strong className="text-sm font-medium">
              {game.game.title}
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
      ))}
    </>
  )
}
