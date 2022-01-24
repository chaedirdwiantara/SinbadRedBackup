import { ErrorProps } from '@core/models/error.model';
export interface QuestListProcessProps {
  status: string;
}

export interface QuestListQueryOptions {
  status: string;
}

export interface QuestDetailProcessProps {
  id: number;
}

export interface QuestValidateVoucherProcessProps {
  code: string;
}

export interface QuestDetailProcessAction {
  type: string;
  payload: QuestDetailProcessProps;
  contextDispatch: (action: any) => any;
}

export interface QuestTaskProcessProps {
  questId: number;
  taskId: number;
  status: string;
}

export interface QuestTaskProcessAction {
  type: string;
  payload: QuestTaskProcessProps;
  contextDispatch: (action: any) => any;
}

export interface QuestValidateVoucherProcessAction {
  type: string;
  payload: QuestValidateVoucherProcessProps;
  contextDispatch: (action: any) => any;
}

export interface ValidateVoucherItemProps<T> {
  loading: boolean;
  refresh?: boolean;
  data: T | null;
  error: ErrorProps | null;
}

export interface ValidateVoucherProps<T> {
  validate: ValidateVoucherItemProps<T>;
}

export interface DatatSuccessSubmitVoucherProps {
  id: string;
  message: string;
  createdAt: string;
  updatedAt: string;
}
export interface SubmitItemProps {
  loading: boolean;
  data: DatatSuccessSubmitVoucherProps | null;
  error: ErrorProps | null;
}

export interface submitVoucherProps {
  submit: SubmitItemProps;
}

export interface SubmitVoucherProcessProps<T> {
  data: T;
}

export interface SubmitVoucherProcessAction<T> {
  type: string;
  payload: SubmitVoucherProcessProps<T>;
  contextDispatch: (action: any) => any;
}
