export interface PaymentMethodList {
  id: number;
  code: string;
  displayLabel: string;
  paymentMethods: PaymentMethod[];
  createdAt: string;
  updatedAt: string;
}

export interface PaymentMethod {
  id: number;
  code: string;
  displayLabel: string;
  iconUrl: string;
  serviceFeeDeduct: string;
  serviceFeeNonDeduct: string;
  isServiceFeeFree: string;
  isSelected: boolean;
}

export interface PaymentMethodGetWaitingPaymentOrder {
  skip: string;
  limit: string;
  keyword: string;
  sort: string;
  sortBy: string;
  amount: string;
  status: string;
}

export interface PaymentMethodCreateOrderResponse {
  id: string;
  message: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaymentMethodCreateOrderData {
  id: string;
  userId: number;
  cartId: string;
  buyerId: number;
  sellers: PaymentMethodSellers[];
  buyerName: string;
  buyerAddress: PaymentMethodBuyerAdress;
  paymentMethod: PaymentMethodChoosen;
}

export interface PaymentMethodSellers {
  sellerId: number;
  sellerName: string;
  products: PaymentMethodProducts[];
}
export interface PaymentMethodBuyerAdress {
  longtitude: string;
  latitude: string;
  province: string;
  city: string;
  district: string;
  urban: string;
  zipCode: string;
  address: string;
  noteAddress: string;
  locationId: string;
}

export interface PaymentMethodChoosen {
  id: number;
  code: string;
  serviceFeeDeduct: number;
  serviceFeeNonDeduct: number;
  displayLabel: string;
  isServiceFeeFree: boolean;
  iconUrl: string;
}
export interface PaymentMethodProducts {
  productId: string;
  warehouseId: number;
  warehouseName: string;
  categoryId: string;
  brandId: string;
  brandName: string;
  productName: string;
  productImageUrl: string;
  qty: number;
  minQty: number;
  multipleQty: number;
  qtyPerBox: number;
  uomLabel: string;
  isPriceAfterTax: boolean;
  taxPercentage: number;
  lastUsedPrice: number;
  leadTime: number;
  price: number;
  priceRules: PaymentMethodPriceRules;
}

export interface PaymentMethodPriceRules {
  minQty: number;
  maxQty: number;
  price: number;
}
