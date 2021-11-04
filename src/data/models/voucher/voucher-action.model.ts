export interface VoucherDetailProcessProps {
  id: string;
  type: string;
}
export interface VoucherDetailProcessAction {
  type: string;
  payload: VoucherDetailProcessProps;
  contextDispatch: (action: any) => any;
}
