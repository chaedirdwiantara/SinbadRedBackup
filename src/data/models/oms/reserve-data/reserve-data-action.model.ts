import * as models from '@models';
/** => set reserved at */
export interface SetReservedAt {
  type: string;
  payload: models.ReserveData;
}
