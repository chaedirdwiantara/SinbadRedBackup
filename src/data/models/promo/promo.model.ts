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
/** === PROMO GENERAL DETAIL === */
export interface PromoGeneralDetailSuccessProps {
  id: number;
  name: string;
  shortDescription: string;
  header: string;
  imageUrl: string;
  startDate: string;
  endDate: string;
  termsAndCondition: string[];
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
  benefitType: string;
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
