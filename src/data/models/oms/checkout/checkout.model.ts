export interface ProductCheckout {
  productId: string;
  productName: string;
  urlImages: string;
  qty: number;
  displayPrice: number;
  priceBeforeTax: number;
  priceAfterTax: number;
  uom: string;
  warehouseId: number;
}

export interface BrandCheckout {
  brandId: string;
  brandName: string;
  products: ProductCheckout[];
}

export interface InvoiceCheckout {
  invoiceGroupId: string;
  totalProduct: number;
  totalPriceBeforeTax: number;
  totalPriceAfterTax: number;
  tax: number;
  isPotentialPaymentPromo: boolean;
  brands: BrandCheckout[];
  invoiceGroupName: string;
  sellerId: number;
  channelId: number;
  groupId: number;
  typeId: number;
  clusterId: number;
}

export interface CheckoutSuccess {
  cartId: string;
  invoices: InvoiceCheckout[];
}
