/** === IMPORT HERE === */
import {
  promoPaymentInitialState,
  promoPaymentReducer,
  PromoPaymentInitialProps,
} from './promo-payment/promo-payment.reducer';
import {
  promoGeneralInitialState,
  promoGeneralReducer,
  PromoGeneralInitialProps,
} from './promo-general/promo-general.reducer';
/** === TYPE HERE === */
export type PromoInitialProps = {
  promoPayment: PromoPaymentInitialProps;
  promoGeneral: PromoGeneralInitialProps;
};
/** === INITIAL HERE === */
export const promoInitialState = {
  promoPayment: promoPaymentInitialState,
  promoGeneral: promoGeneralInitialState,
};
/** === EXPORT ALL HERE === */
export const promoReducer = (
  { promoPayment, promoGeneral }: any,
  action: any,
) => ({
  promoPayment: promoPaymentReducer(promoPayment, action),
  promoGeneral: promoGeneralReducer(promoGeneral, action),
});
