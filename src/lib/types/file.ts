import { IBase } from "./base";
import { IUser } from "./user";

export interface IFile extends IBase {
  name: string;
  mimetype: string;
  cdnUrl: string;
  userId: string;
  user: IUser;
}
