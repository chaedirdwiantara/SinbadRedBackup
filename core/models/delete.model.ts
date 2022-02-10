import { ErrorProps } from './error.model';
/** === THIS FOR SUCCESS DELETE DATA === */
export interface DeleteSuccessProps {
  message: string;
  code: number;
}
/** === THIS FOR DELETE ITEM === */
export interface DeleteItemProps {
  loading: boolean;
  data: DeleteSuccessProps | null;
  error: ErrorProps | null;
}
export interface DeleteProps {
  delete: DeleteItemProps;
}
/** === THIS FOR PROCESS DELETE DATA === */
export interface DeleteProcessProps {
  id: string;
}
/**
 * ================================
 * VERSION 3
 * ================================
 */
/** === THIS FOR SUCCESS DELETE DATA === */
export interface DeleteSuccessV3Props {
  message: string;
}
/** === THIS FOR DELETE ITEM === */
export interface DeleteItemV3Props {
  loading: boolean;
  data: DeleteSuccessV3Props | null;
  error: ErrorProps | null;
}

export interface DeleteV3Props {
  delete: DeleteItemV3Props;
}
