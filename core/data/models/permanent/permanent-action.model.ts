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
/** === SET SEARCH KEYWORDS FLAG === */
export interface SetSearchKeywordActions {
  type: string;
  payload: Array<string>;
}
/** === APP VERSION === */
export interface AppVersionActions {
  type: string;
  payload: any;
}
/** === FOR FORCE UPDATE VERSION === */
export interface ForceUpdateVersionActions {
  type: string;
  payload: number;
}
