export interface ThankYouOrderDetailProps {
  id: string;
  orderStatus: string;
  paymentMethodId: string;
  expiredDate: string;
  vaAccountNo: string;
  paymentIconUrl: string;
  paymentServiceFeeDeduct: number;
  paymentIsServiceFeeFree: boolean;
  totalOrderPriceAfterTax: number;
  sellers: OrderSeller[];
  buyerAddress: string;
  buyerAddressProvince: string;
  buyerAddressCity: string;
  buyerAddressDistrict: string;
  buyerAddressUrban: string;
  buyerAddressZipCode: string;
  buyerAddressNoteAddress: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderSeller {
  sellerName: string;
  products: OrderSellerProduct[];
}

export interface OrderSellerProduct {
  productName: string;
  qty: number;
  productPriceAfterTax: number;
  leadTime: number;
}
export interface PaymentGuideListItem {
  id: number;
  paymentMethodId: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}
export interface CancelOrder<T> {
  data: T;
}
export interface CancelOrderData {
  orderId: string;
  createdAt: string;
  updatedAt: string;
  message: string;
}

export interface CancelOrderResponse extends CancelOrder<CancelOrderData> {}
