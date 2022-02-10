import { ErrorProps } from './error.model';
/** === THIS FOR PROCESS CREATE DATA === */
export interface UpdateProcessProps<T> {
  data: T;
}
/**
 * ================================
 * VERSION 1
 * ================================
 */
/** === THIS FOR DATA SUCCESS UPDATE === */
export interface DataSuccessUpdateProps {
  id: string;
  message: string;
  createdAt: string;
  updatedAt: string;
}
/** === THIS FOR SUCCESS UPDATE DATA === */
export interface UpdateSuccessProps {
  data: DataSuccessUpdateProps;
}
/** === THIS FOR CREATE PROCESS === */
export interface UpdateItemProps {
  loading: boolean;
  data: DataSuccessUpdateProps | null;
  error: ErrorProps | null;
}
export interface UpdateProps {
  update: UpdateItemProps;
}
/**
 * ================================
 * VERSION 2
 * ================================
 */
/** === THIS FOR DATA SUCCESS UPDATE === */
export interface DataSuccessUpdateV2Props {
  id: string;
  createdAt: string;
  updatedAt: string;
}
/** === THIS FOR SUCCESS UPDATE DATA === */
export interface UpdateSuccessV2Props {
  data: DataSuccessUpdateV2Props;
  message: string;
  code: number;
}
/** === THIS FOR CREATE PROCESS === */
export interface UpdateItemV2Props {
  loading: boolean;
  data: DataSuccessUpdateV2Props | null;
  error: ErrorProps | null;
}
export interface UpdateV2Props {
  update: UpdateItemV2Props;
}
/**
 * ================================
 * VERSION 3
 * ================================
 */
/** === THIS FOR SUCCESS UPDATE DATA === */
export interface UpdateSuccessV3Props<T> {
  data: T;
  message: string;
}
/** === THIS FOR CREATE PROCESS === */
export interface UpdateItemV3Props<T> {
  loading: boolean;
  data: T | null;
  error: ErrorProps | null;
}
export interface UpdateV3Props<T> {
  update: UpdateItemV3Props<T>;
}
