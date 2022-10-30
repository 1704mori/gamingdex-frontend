import { IBase } from "./base";
import { IGameCharacter } from "./game";

export interface ICharacter extends IBase {
  urlId: number;
  name: string;
  slug: string;
  alternativeNames: string[];
  photo: string;
  about: string;

  games: IGameCharacter[];
}
