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
import {
  stockInformationInitialState,
  stockInformationReducer,
  StockInformationInitialProps,
} from './stock-information.reducer';

/** === TYPES === */
export interface StockState {
  validation: StockValidationInitialProps;
  detail: StockValidationDetailInitialProps;
  information: StockInformationInitialProps;
}
/** === INITIAL STATE === */
export const stockInitialState = {
  validation: stockValidationInitialState,
  detail: stockValidationDetailInitialState,
  information: stockInformationInitialState,
};
/** === REDUCER === */
export const stockReducer = (
  { validation, detail, information }: StockState,
  action: any,
) => ({
  validation: stockValidationReducer(validation, action),
  detail: stockValidationDetailReducer(detail, action),
  information: stockInformationReducer(information, action),
});
