/** === IMPORT HERE === */
import {
  promoPaymentInitialState,
  promoPaymentReducer,
  PromoPaymentInitialProps,
} from './promo-payment/promo-payment.reducer';
/** === TYPE HERE === */
export type PromoInitialProps = {
  promoPayment: PromoPaymentInitialProps;
};
/** === INITIAL HERE === */
export const promoInitialState = {
  promoPayment: promoPaymentInitialState,
};
/** === EXPORT ALL HERE === */
export const promoReducer = ({ promoPayment }: any, action: any) => ({
  promoPayment: promoPaymentReducer(promoPayment, action),
});
