interface ICoachmark {
  homeCoachmark: boolean;
  orderCoachmark: boolean;
  helpCoachmark: boolean;
  profileCoachmark: boolean;
}

export interface ICoachmarkData {
  data: ICoachmark;
}

export type ICoachmarkAction =
  | 'homeCoachmark'
  | 'orderCoachmark'
  | 'helpCoachmark'
  | 'profileCoachmark';
