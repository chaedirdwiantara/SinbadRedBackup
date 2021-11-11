/** === FCM FLAG === */
export interface IsFCMAction {
  type: string;
  payload: boolean;
}
/** === INTRO SINBAD FLAG === */
export interface IsIntroSinbadAction {
  type: string;
  payload: boolean;
}

export interface CartId {
  type: string;
  payload: string | null;
}
