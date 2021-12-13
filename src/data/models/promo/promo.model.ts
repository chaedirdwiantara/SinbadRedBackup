import * as models from '@models';
/** === PROMO PAYMENT LIST === */
export interface PromoPaymentListSuccessProps {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  discountRebate: number;
  image: string;
}
/** === PROMO PAYMENT DETAIL === */
export interface PromoPaymentDetailSuccessProps {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  discountRebate: number;
  termAndConditions: string[];
}
/** === PROMO SELLER DETAIL === */
export interface PromoSellerDetailSuccessProps {
  id: number;
  name: string;
  endDate: string;
  shortDescription: string;
  imageUrl: string;
}
export interface PotentialPromoProductProps {
  flexiCombo: PotentialPromoProductFlexiCombo[];
  crossSelling: PotentialPromoProductCrossSelling[];
}
export interface PotentialPromoProductFlexiCombo {
  promoSellerId: string;
  shortDescription: string;
}
export interface PotentialPromoProductCrossSelling {
  promoSellerId: string;
  name: string;
  description: string;
}
export interface ReserveDiscountPostPayload {
  id: string;
  data: ReserveDiscountPayloadData[];
  isActiveStore: boolean;
  voucherIds: models.VoucherId[];
  potentialDiscountId: string;
  reservedAt: string;
}
export interface ReserveDiscountPayloadData {
  invoiceGroupId: string;
  portfolioId: string;
  brands: ReserveDiscountPayloadBrands[];
  sellerId: number;
  channelId: number;
  groupId: number;
  typeId: number;
  clusterId: number;
}
export interface ReserveDiscountPayloadBrands {
  brandId: string;
  products: ReserveDiscountPayloadProducts[];
}
export interface ReserveDiscountPayloadProducts {
  productId: string;
  qty: number;
  displayPrice: number;
  priceBeforeTax: number;
  priceAfterTax: number;
  warehouseId: number;
}
export interface ReserveDiscountDetail {
  promoMatch: ReserveDiscountPromoMatch[];
  promoNotMatch: ReserveDiscountPromoNotMatch;
  discountVerification: ReserveDiscountVerification;
}
export interface ReserveDiscountPromoMatch {
  invoiceGroupId: string;
  promoSellers: ReserveDiscountPromoSellers[];
  vouchers: ReserveDiscountVouchers[];
  totalPromoSellerAndVoucher: number;
}
export interface ReserveDiscountPromoNotMatch {
  amount: ReserveDiscountNotMatchData[];
  bonus: ReserveDiscountNotMatchData[];
}
export interface ReserveDiscountPromoSellers {
  id: number;
  name: string;
  benefitType: 'amount' | 'percent' | 'qty';
  amount: number | null;
  productName: string | null;
  bonusQty: number | null;
}
export interface ReserveDiscountVouchers {
  id: number;
  name: string;
  amount: number;
}
export interface ReserveDiscountNotMatchData {
  productId: string;
  productName: string;
  productImage: string;
  promoSellers: Array<string>;
}
export interface CheckPromoPaymentGetData {
  paymentChannelId: number;
  promoPaymentId: number;
  promoPaymentAvailable: boolean;
  promoPaymentDescription: string | null;
  promoPaymentAmount: number | null;
}
export interface CheckAllPromoPaymentGetData {
  invoiceGroupId: string;
  cartParcelId: string;
  paymentTypeId: number;
  paymentChannelId: number;
  parcelPrice: number;
  promoPaymentId: number;
  promoPaymentAvailable: boolean;
  promoPaymentDescription: string;
  promoPaymentAmount: number;
}
export interface ReserveDiscountVerification {
  promosSeller: ReserveDiscountVerificationPromosSeller[];
  vouchersSeller: [];
}
export interface ReserveDiscountVerificationPromosSeller {
  invoiceGroupId: string;
  productId: string;
  promos: ReserveDiscountVerificationPromos[];
}
export interface ReserveDiscountVerificationPromos {
  promoId: number;
  promoName: string;
  promoFreeProduct: ReserveDiscountPromoFreeProduct | null;
  promoRebate: number | null;
  promoOwner: string;
}
export interface ReserveDiscountPromoFreeProduct {
  productId: string;
  qty: number;
  uom: string;
}
export interface ReserveDiscountVerificationVouchersSeller {
  voucherId: number;
  voucherName: string;
  invoiceGroupId: string;
  vouchers: [];
}
export interface ReserveDiscountVerificationVouchers {
  productId: string;
  voucherRebate: number;
}
