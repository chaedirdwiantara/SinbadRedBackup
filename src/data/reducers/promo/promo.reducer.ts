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
import {
  potentialPromoProductInitialState,
  potentialPromoProductReducer,
  PotentialPromoProductInitialProps,
} from './potential-promo-product/potential-promo-product.reducer';
/** === TYPE HERE === */
export type PromoInitialProps = {
  promoPayment: PromoPaymentInitialProps;
  promoGeneral: PromoGeneralInitialProps;
  potentialPromoProduct: PotentialPromoProductInitialProps;
};
/** === INITIAL HERE === */
export const promoInitialState = {
  promoPayment: promoPaymentInitialState,
  promoGeneral: promoGeneralInitialState,
  potentialPromoProduct: potentialPromoProductInitialState,
};
/** === EXPORT ALL HERE === */
export const promoReducer = (
  { promoPayment, promoGeneral, potentialPromoProduct }: any,
  action: any,
) => ({
  promoPayment: promoPaymentReducer(promoPayment, action),
  promoGeneral: promoGeneralReducer(promoGeneral, action),
  potentialPromoProduct: potentialPromoProductReducer(
    potentialPromoProduct,
    action,
  ),
});
