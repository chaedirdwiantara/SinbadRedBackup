export interface VerificationOrderDetailProps {
  id: string;
  bonusProducts: VerificationOrderDetailBonusProduct[];
  promoProducts: VerificationOrderDetailPromoProduct[];
  nonPromoProducts: VerificationOrderDetailNonPromoList[];
  grandTotal: VerificationOrderDetailGrandTotal;
}
export interface VerificationOrderDetailBonusProduct {
  promoSellerId: number;
  promoSellerName: string;
  bonusProductId: string;
  bonusProductName: string;
  bonusQty: number;
  bonusProductImageUrl: string;
}
export interface VerificationOrderDetailPromoProduct {
  productId: number;
  productName: string;
  productImageUrl: string;
  qty: number;
  displayPrice: number;
  priceBeforeTax: number;
  priceAfterTax: number;
  promoPrice: number;
  voucherPrice: number;
  priceAfterDiscount: number;
  promos: VerificationOrderDetailPromoList[];
  vouchers: VerificationOrderDetailVoucherList[];
}
export interface VerificationOrderDetailPromoList {
  promoSellerId: number;
  promoSellerName: string;
  promoAmount: number;
  promoOwner: string;
}
export interface VerificationOrderDetailVoucherList {
  voucherSellerId: number;
  voucherSellerName: string;
  voucherAmount: number;
  voucherOwner: string;
}
export interface VerificationOrderDetailNonPromoList {
  productId: number;
  productName: string;
  productImageUrl: string;
  qty: number;
  displayPrice: number;
  priceBeforeTax: number;
  priceAfterTax: number;
  finalPrice: number;
}
export interface VerificationOrderDetailGrandTotal {
  grandTotalPrice: number;
  grandTotalDiscount: number;
}
