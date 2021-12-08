import { ErrorProps } from './error.model';
/** === THIS FOR PROCESS CREATE DATA === */
export interface CreateProcessProps<T> {
  data: T;
}
/**
 * ================================
 * VERSION 1
 * ================================
 */
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
export interface CreateItemSuccessProps {
  id: string;
  message: string;
  createdAt: string;
  updatedAt: string;
}
/**
 * ================================
 * VERSION 2
 * ================================
 */
/** === THIS FOR SUCCESS GET DATA === */
export interface CreateSuccessV2Props {
  data: CreateItemSuccessV2Props;
  message: string;
  code: number;
}
/** === THIS FOR CREATE PROCESS === */
export interface CreateItemV2Props {
  loading: boolean;
  data: CreateItemSuccessV2Props | null;
  error: ErrorProps | null;
}
export interface CreateV2Props {
  create: CreateItemV2Props;
}
export interface CreateItemSuccessV2Props {
  id: string;
  createdAt: string;
  updatedAt: string;
}
