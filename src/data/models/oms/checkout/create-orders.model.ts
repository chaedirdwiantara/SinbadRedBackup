export interface CreateOrderSuccess {
  id: number;
  message: string;
  createdAt: string;
  updatedAt: string;
}
export interface CreateOrders {
  cartId: string;
  data: Array<CreateOrderInvoiceGroup>;
  verification: CreateOrderVerification;
}

export interface CreateOrderInvoiceGroup {
  invoiceGroupId: string;
  sellerId: number;
  invoiceGroupName: string;
  paymentTypeId: number;
  paymentChannelId: number;
  paylaterTypeId?: number | null;
  portfolioId?: number | null;
  brands: Array<CreateOrderBrand>;
  supplierId: number;
  channelId?: number | null;
  groupId?: number | null;
  typeId?: number | null;
  clusterId?: number | null;
}

export interface CreateOrderBrand {
  brandId: number;
  brandName: string;
  products: Array<CreateOrderBrandProduct>;
}

export interface CreateOrderBrandProduct {
  productId: string;
  qty: number;
  displayPrice: number;
  priceBeforeTax: number;
  priceAfterTax: number;
  warehouseId: number;
  uom: string;
}

export interface CreateOrderVerification {
  promosSeller: Array<CreateOrderVerificationPromo>;
  vouchersSeller: Array<CreateOrderVerificationVoucher>;
}

export interface CreateOrderVerificationPromo {
  invoiceGroupId: string;
  productId: string;
  promos: Array<CreateOrderVerificationPromoDetail>;
}

export interface CreateOrderVerificationPromoDetail {
  promoId: string;
  promoName: string;
  promoFreeProduct: {
    productId: string;
    qty: number;
    uom: string;
  };
  promoRebate: number;
  promoOwner: string;
}

export interface CreateOrderVerificationVoucher {
  invoiceGroupId: string;
  productId: string;
  voucherId: string;
  voucherName: string;
  voucherRebate: number;
}
