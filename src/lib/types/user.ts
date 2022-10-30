import { IBase } from "./base";

type Role = {
  name: string;
  permissionIds: string[];
} & IBase;

type UserRoles = {
  userId: string;
  roleId: string;

  user: IUser;
  role: Role;
} & IBase;

export interface IUser extends IBase {
  username: string;
  email: string;
  bio: string;

  roles?: UserRoles[];
}

export interface IUserActivity extends IBase {
  userId: string;
  gameId: string;
  action: string;

  user: IUser;
  game: any;
  likes: IUserActivityLike[];
}

export interface IUserActivityLike extends IBase {
  userId: string;
  activityId: string;

  user: IUser;
  activity: IUserActivity;
}
