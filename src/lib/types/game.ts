import { IBase } from "./base";
import { ICharacter } from "./character";
import { IPeople } from "./people";
import { IUser } from "./user";

export enum ERating {
  "UNKNOWN" = "unknown",
  "G" = "g",
  "t13" = "13",
  "t15" = "15",
  "r18" = "18",
  "R" = "r",
}

export enum EGameState {
  DRAFT = "draft",
  PENDING = "pending",
  DECLINED = "declined",
  PUBLISHED = "published",
}

export enum EGameStatus {
  NOT_PUBLISHED = "not_published",
  PUBLISHED = "published",
  CANCELED = "canceled",
}

export enum EGamingStatus {
  NOT_IN_LIST = "not_in_list",
  PLAYING = "playing",
  COMPLETED = "completed",
  DROPPED = "dropped",
  PAUSED = "paused",
  PLAN_TO_PLAY = "plan_to_play",
}

export interface IGame extends IBase {
  urlId: number;
  title: string;
  slug: string;
  alternativeTitles: string[];
  description: string;
  cover: string;
  banner: string;
  releaseDate: string;
  rating: keyof typeof ERating;
  releaseStatus: keyof typeof EGameStatus;
  status: keyof typeof EGameState;
  originalLanguage: string;
  retailLinks: {
    [site: string]: string;
  }[];
  score: number;
  members: string;

  reviews?: IReview[];
  genres?: IGameGenre[];
  platforms?: IGamePlatform[];
  developers?: IGameDeveloper[];
  publishers?: IGamePublisher[];
  characters?: IGameCharacter[];
  staff?: IGameStaff[];
  userGame?: IUserGame[];
}

export interface IReview extends IBase {
  gameId: string;
  userId: string;
  review: string;
  rating: number;
  recommend: string;
  hasSpoilers: boolean;

  user?: IUser;
  game?: IGame;
}

export interface IPlatform extends IBase {
  value: string;
  label: string;
}

export interface IGenre extends IBase {
  value: string;
  label: string;
}

export interface IDeveloper extends IBase {
  name: string;
  logo: string;
}

export interface IPublisher extends IBase {
  name: string;
  logo: string;
}

export interface IGameGenre extends IBase {
  gameId: string;
  genreId: string;

  game: IGame;
  genre: IGenre;
}

export interface IGamePlatform extends IBase {
  gameId: string;
  platformId: string;

  game: IGame;
  platform: IPlatform;
}

export interface IGameDeveloper extends IBase {
  gameId: string;
  developerId: string;

  game: IGame;
  developer: IDeveloper;
}

export interface IGamePublisher extends IBase {
  gameId: string;
  publisherId: string;

  game: IGame;
  publisher: IPublisher;
}

export interface IGameCharacter extends IBase {
  gameId: string;
  characterId: string;

  game: IGame;
  character: ICharacter;
}

export interface IGameStaff extends Omit<IBase, "role"> {
  gameId: string;
  staffId: string;
  role: {
    value: string;
    label: string;
  }[];

  game: IGame;
  people: IPeople;
}

export interface IUserGame extends IBase {
  userId: string;
  gameId: string;

  user: IUser;
  game: IGame;
}
