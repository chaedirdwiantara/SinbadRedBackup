/** === IMPORT EXTERNAL MODEL === */
import * as models from './flag-rtdb.model';
/** === Flag RTDB === */
export interface isFlagRTDBChangeAction {
  type: string;
  payload: models.FlagRTDBData;
}
