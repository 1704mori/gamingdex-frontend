import { createContext, useContext } from "react";
import { IUser } from "./types/user";

interface IUserContext {
  user?: IUser;
  setUser: (user: IUser) => void;
  refreshUser: () => void;
  // hasUserPermission: (permissions: TPermission[]) => boolean;
  hasUserRole: (roles: string[]) => boolean;
}

const UserContext = createContext<IUserContext>({} as IUserContext);
const UserContextProvider = UserContext.Provider;

export function useUserContext() {
  return useContext(UserContext);
}

export default UserContextProvider;
