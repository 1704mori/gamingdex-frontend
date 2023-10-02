import { userService } from "@/lib/services/user";
import { IUser } from "@/lib/types/user"
import { useQuery } from "@tanstack/react-query";
import History from "./components/History";

type Props = {
  user: IUser;
}

export default function ActivityHistory({ user }: Props) {
  const { data: history } = useQuery(
    ["history", user.id],
    async () => userService.history(user.id),
    {
      suspense: true,
      enabled: !!user.id
    }
  );

  return <History data={history?.attributes} />
}
