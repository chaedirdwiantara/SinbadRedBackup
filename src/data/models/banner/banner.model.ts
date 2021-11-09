import { ErrorProps } from '@core/models/error.model';
/** === BANNER SLIDER === */
export interface SliderProps<T> {
  list: SliderItemProps<T>;
}
export interface SliderProcessAction {
  type: string;
  // payload: SliderProcessProps;
  contextDispatch: (action: any) => any;
}
export interface SliderProcessProps {
  loading: boolean;
}
export interface SliderSuccessProps<T> {
  data: T;
}
export interface SliderSuccessAction<T> {
  type: string;
  payload: SliderSuccessProps<T>;
}
export interface SliderItemProps<T> {
  loading: boolean;
  data: T;
  error: ErrorProps | null;
}
export interface BannerSliderSuccessProps {
  id: number;
  header: string;
  description: string;
  imageUrl: string;
  bannerType: string;
  promoId: number;
  termAndCondition: string;
  activeFrom: string;
  activeTo: string;
  createdAt: string;
  updatedAt: string;
}
/** === BANNER LIST === */
export interface BannerListSuccessProps {
  id: number;
  header: string;
  description: string;
  imageUrl: string;
  bannerType: string;
  promoType: string;
  promoId: number;
  termAndCondition: string;
  activeFrom: string;
  activeTo: string;
  createdAt: string;
  updatedAt: string;
}
/** === BANNER DETAIL === */
export interface BannerDetailSuccessProps {
  id: number;
  header: string;
  description: string;
  imageUrl: string;
  bannerType: string;
  promoId: number;
  promoType: string;
  termAndCondition: string;
  activeFrom: string;
  activeTo: string;
  createdAt: string;
  updatedAt: string;
}
