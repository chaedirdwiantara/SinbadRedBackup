export interface IPaymentType {
  id: number;
  name: string;
  iconUrl: string;
}

export interface IPaymentChannel {
  id: number;
  name: string;
  iconUrl: string;
}

export interface IPromoSeller {
  id: number;
  name: string;
  benefitType: string;
  amount: number;
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
  cartParcelId: string;
  invoiceGroupId: string;
  invoiceGroupName: string;
  totalProduct: number;
  totalPriceBeforeTax: number;
  totalPriceAfterTax: number;
  tax: number | null;
  isPotentialPromoPayment: boolean;
  totalPromoSellerAndVoucher: number;
  totalPromoPayment: number;
  totalPaymentFee: number;
  totalPayment: number;
  paymentType: IPaymentType | null;
  paymentChannel: IPaymentChannel | null;
  promoSellers: IPromoSeller[];
  vouchers: IVoucherCheckout[];
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
  paymentType: IPaymentType;
  paymentChannel: IPaymentChannel;
}

export interface PromoPayment {
  invoiceGroupId: string;
  totalPromoPayment: number;
}

export interface CartIdPayload {
  cartId: string | null;
}
