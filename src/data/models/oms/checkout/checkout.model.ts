/**
 * CHECKOUT
 */

export interface CheckoutCart<T> {
  sellerId: number;
  sellerName: string;
  fullSellerAddress?: string;
  sellerTaxNo?: string;
  sellerAdminId?: number;
  sellerAdminName?: string;
  sellerAdminEmail?: string;
  sinbadVoucherDiscountParcel: number;
  products: T[];
}

export interface CheckoutProductPriceRules {
  minQty: number;
  priceBeforeTax: number;
  priceAfterTax: number;
  taxPrice: number;
}

export interface CheckoutCartProduct {
  productId: string;
  externalProductCode: string;
  warehouseId: number;
  warehouseName: string;
  externalWarehouseCode: string;
  categoryId: string;
  brandId: string;
  brandName: string;
  productName: string;
  productImageUrl: string;
  qty: number;
  qtyPerBox: number;
  uomLabel: string;
  taxPercentage: number;
  leadTime: number;
  priceAfterTax: number;
  priceBeforeTax: number;
  taxPrice: number;
}

export interface CheckoutData {
  id: string;
  userId: number;
  cartId: string;
  buyerId: number;
  sellers: CheckoutSellers[];
}

export interface CheckoutSellers {
  sellerId: number;
  sellerName: string;
  products: CheckoutProducts[];
}
export interface CheckoutProducts {
  productId: string;
  warehouseId: number;
  warehouseName: string;
  categoryId: string;
  brandId: string;
  brandName: string;
  productName: string;
  productImageUrl: string;
  qty: number;
  qtyPerBox: number;
  uomLabel: string;
  taxPercentage: number;
  lastUsedPrice: number;
  leadTime: number;
  price: number;
  priceRules: CheckoutPriceRules;
}

export interface CheckoutPriceRules {
  minQty: number;
  maxQty: number;
  price: number;
}

export interface CheckoutAddressDetail {
  address: string;
  urban: string;
  district: string;
  city: string;
  province: string;
  zipCode: string;
  priceAfterTax: number;
  priceBeforeTax: number;
  taxPrice: number;
  selected: boolean;
  priceRules: CheckoutProductPriceRules;
}
