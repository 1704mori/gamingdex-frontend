import { IBase } from "./base";
import { IFile } from "./file";
import { IGame } from "./game";

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

  follower: IUser[];
  following: IUser[];
  roles: UserRoles[];
  profileImage: IFile;
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

export type TGamingStatus = "not_in_list" | "playing" | "completed" | "dropped" | "on_hold" | "plan_to_play";

export interface IUserGame extends IBase {
  userId: string;
  gameId: string;
  status: TGamingStatus;
  score: number;

  user: IUser;
  game: IGame;
}
