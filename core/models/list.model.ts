import { ErrorProps } from './error.model';
/** === FETCH ITEM === */
export interface ListItemProps<T> {
  loading: boolean;
  loadMore: boolean;
  refresh: boolean;
  data: T;
  error: ErrorProps | null;
  total: number;
  skip: number;
}
/** === FETCH DATA === */
export interface ListProps<T> {
  list: ListItemProps<T>;
}
/** === THIS FOR PROCESS FETCH DATA === */
export interface ListProcessProps {
  loading: boolean;
  skip: number;
  limit: number;
  sort?: 'asc' | 'desc';
  sortBy?: string;
  search?: string;
}
/** === THIS FOR PAGINATION === */
export interface Pagination {
  limit: number;
  skip: number;
  total: number;
}
/** === THIS FOR SUCCESS FETCH DATA === */
export interface ListSuccessProps<T> {
  meta: Pagination;
  data: T;
}
