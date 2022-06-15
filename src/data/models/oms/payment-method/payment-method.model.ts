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
  serviceFeeDeduct: number;
  serviceFeeNonDeduct: number;
  isServiceFeeFree: boolean;
  isSelected: boolean;
  isActive: boolean;
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
  userId: number;
  cartId: string;
  sellers: PaymentMethodSellers[];
  buyerId: number;
  buyerCode: string;
  ownerId: string;
  ownerFullname: string;
  ownerPhoneNo: string;
  buyerName: string;
  buyerAddressLatitude: string;
  buyerAddressLongitude: string;
  buyerAddressProvince: string;
  buyerAddressCity: string;
  buyerAddressDistrict: string;
  buyerAddressUrban: string;
  buyerAddressZipCode: string;
  buyerAddress: string;
  buyerAddressNoteAddress: string;
  buyerAddressLocationId: string;
  paymentMethodId: number;
  paymentMethodCode: string;
  paymentMethodServiceFeeDeduct: number;
  paymentMethodServiceFeeNonDeduct: number;
  paymentMethodDisplayLabel: string;
  paymentMethodIsServiceFeeFree: boolean;
  paymentMethodIconUrl: string;
  reservedAt: string;
}

export interface PaymentMethodSellers {
  sellerId: number;
  sellerName: string;
  sellerAdminEmail: string;
  sellerAdminId: string;
  sellerAdminFullname: string;
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
export interface PaymentMethodProducts {
  productId: string;
  warehouseId: number;
  warehouseCode: string;
  warehouseName: string;
  categoryId: string;
  brandId: string;
  productCode: string;
  productName: string;
  productImageUrl: string;
  brandName: string;
  qty: number;
  qtyPerBox: number;
  uomLabel: string;
  productPriceBeforeTax: number;
  taxPercentage: number;
  productTax: number;
  productPriceAfterTax: number;
  totalProductPriceAfterTax: number;
  leadTime: number;
}
export interface PaymentMethodCommitCartData {
  checkoutId: string;
  orderId: number;
}

export interface CommitCart<T> {
  data: T;
  message: string;
}

export interface CommitCartResponseData {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface CommitCartResponse
  extends CommitCart<CommitCartResponseData> {}
