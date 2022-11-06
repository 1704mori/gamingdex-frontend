import { useSession } from "next-auth/react";

export default function useHasUserRole(...roles: string[]) {
  const { data: session, status } = useSession();

  if (!session || !session.user || status !== "authenticated") {
    return false;
  }

  const userRoles = session.user.roles;

  return roles.some((role) => userRoles.includes(role));
}
