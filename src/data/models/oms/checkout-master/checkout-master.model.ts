export interface IPaymentTypeCheckout {
  id: number;
  name: string;
  iconUrl: string;
}

export interface IPaymentChannelCheckout {
  id: number;
  name: string;
  iconUrl: string;
}

export interface IPromoSeller {
  id: number;
  name: string;
  benefitType: 'amount' | 'percent' | 'qty';
  amount: number | null;
  productName: string | null;
  bonusQty: number | null;
}

export interface IVoucherCheckout {
  id: number;
  name: string;
  amount: number;
}

export interface IProductCheckout {
  productId: string;
  productName: string;
  urlImages: string;
  qty: number;
  displayPrice: number;
  priceBeforeTax: number;
  priceAfterTax: number;
  uom: string;
}

export interface IBrandCheckout {
  brandId: string;
  brandName: string;
  products: IProductCheckout[];
}

export interface IInvoiceCheckout {
  invoiceGroupId: string;
  totalProduct: number;
  totalPriceBeforeTax: number;
  totalPriceAfterTax: number;
  tax: number | null;
  isPotentialPaymentPromo: boolean;
  totalPromoSellerAndVoucher?: number;
  totalPromoPayment?: number;
  totalPaymentFee?: number;
  totalPayment?: number;
  paymentType?: IPaymentTypeCheckout | null;
  paymentChannel?: IPaymentChannelCheckout | null;
  promoSellers?: IPromoSeller[];
  vouchers?: IVoucherCheckout[];
  brands: IBrandCheckout[];
}

export interface CheckoutDataMaster {
  cartId: string | null;
  invoices: IInvoiceCheckout[];
}

export interface ReserveDiscount {
  invoiceGroupId: string;
  promoSellers: IPromoSeller[];
  vouchers: IVoucherCheckout[];
  totalPromoSellerAndVoucher: number;
}

export interface PaymentTypeChannel {
  invoiceGroupId: string;
  totalFee: number;
  totalPayment: number;
  promoPayment: number;
  paymentType: IPaymentTypeCheckout;
  paymentChannel: IPaymentChannelCheckout;
}

export interface PromoPayment {
  invoiceGroupId: string;
  totalPromoPayment: number;
}

export interface CartIdPayload {
  cartId: string | null;
}
