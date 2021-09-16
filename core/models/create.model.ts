import { ErrorProps } from './error.model';
/** === THIS FOR DATA SUCCESS CREATE === */
export interface CreateItemSuccessProps {
  id: string;
  message: string;
  createdAt: string;
  updatedAt: string;
}
/** === THIS FOR SUCCESS GET DATA === */
export interface CreateSuccessProps {
  data: CreateItemSuccessProps;
}
/** === THIS FOR CREATE PROCESS === */
export interface CreateItemProps {
  loading: boolean;
  data: CreateItemSuccessProps | null;
  error: ErrorProps | null;
}
export interface CreateProps {
  create: CreateItemProps;
}
/** === THIS FOR PROCESS CREATE DATA === */
export interface CreateProcessProps<T> {
  data: T;
}
