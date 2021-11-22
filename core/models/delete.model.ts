import { ErrorProps } from './error.model';
/** === GET ITEM === */
export interface DeleteItemProps {
  loading: boolean;
  data: DeleteSuccessProps | null;
  error: ErrorProps | null;
}
/** === GET DATA === */
export interface DeleteProps {
  delete: DeleteItemProps;
}
/** === THIS FOR PROCESS GET DATA === */
export interface DeleteProcessProps {
  id: string;
}
/** === THIS FOR SUCCESS GET DATA === */
export interface DeleteSuccessProps {}
