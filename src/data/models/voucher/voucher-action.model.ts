import { DetailProcessAction, SaveSelectedVoucher } from '..';

export interface VoucherDetailProcessProps {
  id: string;
}
export interface VoucherDetailProcessAction {
  type: string;
  payload: VoucherDetailProcessProps;
  contextDispatch: (action: any) => any;
}
export interface VoucherListProcessProps {
  uniqueCode?: string;
  totalOrder: number;
}

export interface VoucherListProcessAction
  extends Omit<DetailProcessAction, 'payload'> {
  payload: VoucherListProcessProps;
}

export interface VoucherLocalData {
  selectedSinbadVoucher: SaveSelectedVoucher | null;
}

export interface SaveSelectedVoucherAction {
  type: string;
  payload: SaveSelectedVoucher | null;
}

export interface ResetSelectedVoucherAction {
  type: string;
}
