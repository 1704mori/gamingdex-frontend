import { IBase } from "./base";
import { IGameStaff } from "./game";

export interface IPeople extends IBase {
  urlId: number;
  name: string;
  slug: string;
  alternativeNames: string[];
  language: string;
  photo: string;
  about: string;

  games: IGameStaff[];
}
