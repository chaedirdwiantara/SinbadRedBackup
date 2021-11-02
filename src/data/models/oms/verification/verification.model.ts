export interface VerificationOrderDetailProps {
  id: string;
  bonusProducts: VerificationOrderDetailBonusProduct[];
  promoProducts: VerificationOrderDetailPromoProduct[];
  nonPromoProducts: VerificationOrderDetailNonPromoList[];
  grandTotal: VerificationOrderDetailGrandTotal;
}
export interface VerificationOrderDetailBonusProduct {
  promoSupplierId: number;
  promoSupplierName: string;
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
  promoSupplierId: number;
  promoSupplierName: string;
  promoAmount: number;
  promoOwner: string;
}
export interface VerificationOrderDetailVoucherList {
  voucherSupplierId: number;
  voucherSupplierName: string;
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
}
export interface VerificationOrderDetailGrandTotal {
  grandTotalPrice: number;
  grandTotalDiscount: number;
}
