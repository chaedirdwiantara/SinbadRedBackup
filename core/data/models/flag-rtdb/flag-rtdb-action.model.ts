/** === IMPORT EXTERNAL MODEL === */
import * as models from './flag-rtdb.model';
/** === Flag RTDB === */
export interface isFlagChangeAction {
  type: string;
  payload: models.FlagRTDBData;
}
