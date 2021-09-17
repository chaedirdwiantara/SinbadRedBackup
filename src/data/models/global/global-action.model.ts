import * as models from '@models';
/** === FCM FLAG === */
export interface IsFCMAction {
  type: string;
  payload: boolean;
}
/** === SELECTED VOUCHER DATA === */
export interface selectedVoucherDataAction {
  type: string;
  payload: models.selectedVoucherDataProps;
}
