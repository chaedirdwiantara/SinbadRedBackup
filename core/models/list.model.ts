import { ErrorProps } from './error.model';
/**
 * ==============================
 * VERSION 1
 * ==============================
 */
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
export interface ListProcessDefaultProps {
  loading: boolean;
  skip: number;
  limit: number;
  sort?: 'asc' | 'desc';
  sortBy?: string;
  keyword?: string;
}

export type ListProcessProps<T = object> = ListProcessDefaultProps & T;
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
/**
 * ==============================
 * VERSION 2
 * ==============================
 */
/** === FETCH ITEM === */
export interface ListItemV2Props<T> {
  loading: boolean;
  loadMore: boolean;
  refresh: boolean;
  page: number;
  perPage: number;
  data: T;
  error: ErrorProps | null;
}
/** === FETCH DATA === */
export interface ListV2Props<T> {
  list: ListItemV2Props<T>;
}
/** === THIS FOR PROCESS FETCH DATA === */
export interface ListProcessDefaultV2Props {
  loading: boolean;
  page: number;
  sort?: 'asc' | 'desc';
  sortBy?: string;
  keyword?: string;
}

export type ListProcessV2Props<T = object> = ListProcessDefaultV2Props & T;
/** === THIS FOR PAGINATION === */
export interface PaginationV2 {
  page: number;
}
/** === THIS FOR SUCCESS FETCH DATA === */
export interface ListSuccessV2Props<T> {
  meta: PaginationV2;
  data: T;
}
/**
 * ==============================
 * VERSION 3
 * ==============================
 */
/** === FETCH ITEM === */
export interface ListItemV3Props<T> {
  loading: boolean;
  loadMore: boolean;
  refresh: boolean;
  page: number;
  perPage: number;
  data: T;
  error: ErrorProps | null;
}
/** === FETCH DATA === */
export interface ListV3Props<T> {
  list: ListItemV3Props<T>;
}
/** === THIS FOR PROCESS FETCH DATA === */
export interface ListProcessDefaultV3Props {
  loading: boolean;
  page: number;
  sort?: 'asc' | 'desc';
  sortBy?: string;
  keyword?: string;
}

export type ListProcessV3Props<T = object> = ListProcessDefaultV3Props & T;
/** === THIS FOR PAGINATION === */
export interface PaginationV3 {
  page: number;
  perPage: number;
}
/** === THIS FOR SUCCESS FETCH DATA === */
export interface ListSuccessV3Props<T> {
  meta: PaginationV3;
  data: T;
}
