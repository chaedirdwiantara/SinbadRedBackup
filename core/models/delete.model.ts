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
