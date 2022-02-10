/** === IMPORT INTERNAL === */
import {
  cartExampleInitialState,
  cartExampleReducer,
  CartExampleInitialProps,
} from './example-cart.reducer';
export interface CartInitialProps {
  example: CartExampleInitialProps;
}
/** === INITIAL STATE === */
export const cartInitialState = {
  example: cartExampleInitialState,
};
/** === REDUCER === */
export const cartReducer = ({ example }: CartInitialProps, action: any) => ({
  example: cartExampleReducer(example, action),
});
