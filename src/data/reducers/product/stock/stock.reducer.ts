import {
  stockValidationInitialState,
  StockValidationInitialProps,
  stockValidationReducer,
} from './stock-validation.reducer';

/** === TYPES === */
export interface StockState {
  validation: StockValidationInitialProps;
}
/** === INITIAL STATE === */
export const stockInitialState = {
  validation: stockValidationInitialState,
};
/** === REDUCER === */
export const stockReducer = ({ validation }: StockState, action: any) => ({
  validation: stockValidationReducer(validation, action),
});
