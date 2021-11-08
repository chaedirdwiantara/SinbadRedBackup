import { ErrorProps } from './error.model';
/** === GET ITEM === */
export interface DetailItemProps<T> {
  loading: boolean;
  refresh?: boolean;
  data: T | null;
  error: ErrorProps | null;
}
/** === GET DATA === */
export interface DetailProps<T> {
  detail: DetailItemProps<T>;
}
/** === THIS FOR PROCESS GET DATA === */
export interface DetailProcessProps {
  id: string;
}
/** === THIS FOR SUCCESS GET DATA === */
export interface DetailSuccessProps<T> {
  data: T;
}
