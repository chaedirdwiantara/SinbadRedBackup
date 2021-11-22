import * as models from '@models';
/** === PROMO PAYMENT LIST === */
/** => success props */
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
  data: [];
  isActiveStore: boolean;
  voucherIds: models.VoucherId[];
  potentialDiscountId: string;
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
  prodcuts: ReserveDiscountPayloadProducts[];
}
export interface ReserveDiscountPayloadProducts {
  productId: string;
  qty: number;
  displayPrice: number;
  priceBeforeTax: number;
  priceAfterTax: number;
  warehouseId: number;
}
