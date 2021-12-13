import {
  brandlistInitialState,
  BrandListInitialProps,
  brandListReducer,
} from './brand-list.reducer';
/** === TYPE === */
export interface BrandState {
  list: BrandListInitialProps;
}
/** === INITIAL STATE === */
export const brandInitialState = {
  list: brandlistInitialState,
};
/** === REDUCER === */
export const brandReducer = ({ list }: BrandState, action: any) => ({
  list: brandListReducer(list, action),
});
