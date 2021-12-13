/** === IMPORT HERE === */
import {
  promoPaymentInitialState,
  promoPaymentReducer,
  PromoPaymentInitialProps,
} from './promo-payment/promo-payment.reducer';
import {
  promoSellerInitialState,
  promoSellerReducer,
  PromoSellerInitialProps,
} from './promo-seller/promo-seller.reducer';
import {
  potentialPromoProductInitialState,
  potentialPromoProductReducer,
  PotentialPromoProductInitialProps,
} from './potential-promo-product/potential-promo-product.reducer';
import {
  reserveDiscountInitialState,
  reserveDiscountReducer,
  ReserveDiscountInitialProps,
} from './reserve-discount/reserve-discount.reducer';
import {
  checkPromoPaymentInitialState,
  checkPromoPaymentReducer,
  CheckPromoPaymentInitialProps,
} from './check-promo-payment/check-promo-payment.reducer';
import {
  checkAllPromoPaymentInitialState,
  checkAllPromoPaymentReducer,
  CheckAllPromoPaymentInitialProps,
} from './check-all-promo-payment/check-all-promo-payment.reducer';
/** === TYPE HERE === */
export type PromoInitialProps = {
  promoPayment: PromoPaymentInitialProps;
  promoSeller: PromoSellerInitialProps;
  potentialPromoProduct: PotentialPromoProductInitialProps;
  reserveDiscount: ReserveDiscountInitialProps;
  checkPromoPayment: CheckPromoPaymentInitialProps;
  checkAllPromoPayment: CheckAllPromoPaymentInitialProps;
};
/** === INITIAL HERE === */
export const promoInitialState = {
  promoPayment: promoPaymentInitialState,
  promoSeller: promoSellerInitialState,
  potentialPromoProduct: potentialPromoProductInitialState,
  reserveDiscount: reserveDiscountInitialState,
  checkPromoPayment: checkPromoPaymentInitialState,
  checkAllPromoPayment: checkAllPromoPaymentInitialState,
};
/** === EXPORT ALL HERE === */
export const promoReducer = (
  {
    promoPayment,
    promoSeller,
    potentialPromoProduct,
    reserveDiscount,
    checkPromoPayment,
    checkAllPromoPayment,
  }: any,
  action: any,
) => ({
  promoPayment: promoPaymentReducer(promoPayment, action),
  promoSeller: promoSellerReducer(promoSeller, action),
  potentialPromoProduct: potentialPromoProductReducer(
    potentialPromoProduct,
    action,
  ),
  reserveDiscount: reserveDiscountReducer(reserveDiscount, action),
  checkPromoPayment: checkPromoPaymentReducer(checkPromoPayment, action),
  checkAllPromoPayment: checkAllPromoPaymentReducer(
    checkAllPromoPayment,
    action,
  ),
});
