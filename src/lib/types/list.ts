import { IBase } from "./base";
import { IUser } from "./user";

export enum EListType {
  PUBLIC = "public",
  PRIVATE = "private",
}

export interface IList extends IBase {
  urlId: string;
  title: string;
  description: string;
  type: EListType;
  userId: string;

  user?: IUser;
}
