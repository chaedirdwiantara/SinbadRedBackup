export interface VerificationOrderDetailProps {
  id: string;
  totalTransaction: number;
  totalRebate: number;
  bonusProduct: VerificationOrderBonusProduct[];
  discountProduct: VerificationOrderDiscountProduct[];
  notPromoSku: VerificationOrderNotPromoSkuList[];
  meta: string;
  createdAt: string;
  expiredAt: string;
}
export interface VerificationOrderBonusProduct {
  promoId: number;
  promoName: string;
  productId: string;
  productName: string;
  productQty: number;
  productImageUrl: string;
}
export interface VerificationOrderDiscountProduct {
  productName: string;
  productImageUrl: string;
  qty: number;
  price: number;
  totalProductPrice: number;
  totalProductDiscount: number;
  promoList: VerificationOrderPromoList[];
  voucherList: VerificationOrderVoucherList[];
}
export interface VerificationOrderPromoList {
  promoId: number;
  promoName: string;
  promoValue: number;
  promoOwner: string;
}
export interface VerificationOrderVoucherList {
  voucherId: number;
  voucherName: string;
  voucherValue: number;
  voucherOwner: string;
}
export interface VerificationOrderNotPromoSkuList {
  productName: string;
  productImageUrl: string;
  qty: number;
  price: number;
  totalProductPrice: number;
}
