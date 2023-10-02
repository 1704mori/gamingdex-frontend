import Profile from "@/components/screens/Profile";
import { resolvePromise } from "@/lib/helpers/common";
import { userService } from "@/lib/services/user";

export const revalidate = 3600;

export default async function ProfilePage({ params }: { params: { username: string } }) {
  const [user, err] = await resolvePromise(userService.profile(params?.username));

  if (err) {
    throw err
  }

  // @ts-ignore
  return <Profile user={user?.data.attributes} />
};
