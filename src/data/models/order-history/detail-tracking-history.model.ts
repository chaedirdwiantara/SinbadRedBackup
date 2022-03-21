import * as models from '@models';

export interface OrderHistoryLogs {
  id: string;
  logLabel: string;
  logCreatedAt: string;
}

export interface orderTrackingDetailHistory {
  id: string;
  status: string;
  orderHistoryLogs: OrderHistoryLogs[];
}

export interface OrderHistoryTrackingDetailProcessProps
  extends models.DetailProcessProps {}

export interface OrderHistoryTrackingDetailProcessAction {
  type: string;
  payload: OrderHistoryTrackingDetailProcessProps;
  contextDispatch: (action: any) => any;
}
