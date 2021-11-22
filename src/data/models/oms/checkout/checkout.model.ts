export interface ProductCheckout {
  productId: string;
  productName: string;
  urlImages: string;
  qty: number;
  displayPrice: number;
  priceBeforeTax: number;
  priceAfterTax: number;
  uom: string;
}

export interface BrandCheckout {
  brandId: string;
  brandName: string;
  products: ProductCheckout[];
}

export interface InvoiceCheckout {
  cartParcelId: string;
  invoiceGroupId: string;
  invoiceGroupName: string;
  totalProduct: number;
  totalPriceBeforeTax: number;
  PPN: number;
  isPotentialPromoPayment: boolean;
  brands: BrandCheckout[];
}

export interface CheckoutSuccess {
  cartId: string;
  userId: number;
  storeId: number;
  data: InvoiceCheckout[];
}
