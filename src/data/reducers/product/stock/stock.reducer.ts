import {
  stockValidationInitialState,
  StockValidationInitialProps,
  stockValidationReducer,
} from './stock-validation.reducer';
import {
  stockValidationDetailInitialState,
  stockValidationDetailReducer,
  StockValidationDetailInitialProps,
} from './stock-validation-detail.reducer';

/** === TYPES === */
export interface StockState {
  validation: StockValidationInitialProps;
  detail: StockValidationDetailInitialProps;
}
/** === INITIAL STATE === */
export const stockInitialState = {
  validation: stockValidationInitialState,
  detail: stockValidationDetailInitialState,
};
/** === REDUCER === */
export const stockReducer = (
  { validation, detail }: StockState,
  action: any,
) => ({
  validation: stockValidationReducer(validation, action),
  detail: stockValidationDetailReducer(detail, action),
});
