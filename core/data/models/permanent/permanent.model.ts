interface IUserBanned {
  userId: number;
  isBanned: boolean;
}

export interface Permanent {
  isFCM: boolean;
  isIntroSinbad: boolean;
  searchedKeywords: Array<string>;
  appVersion: any;
  forceUpdateVersion: number;
  maintenance: boolean;
  advertisingId: string;
  userBanned: IUserBanned | null;
}
