<<<<<<< HEAD
export interface IPaymentTypeCheckout {
=======
export interface IPaymentType {
>>>>>>> 4d5c297 (flow merging checkout master)
  id: number;
  name: string;
  iconUrl: string;
}

<<<<<<< HEAD
export interface IPaymentChannelCheckout {
=======
export interface IPaymentChannel {
>>>>>>> 4d5c297 (flow merging checkout master)
  id: number;
  name: string;
  iconUrl: string;
}

export interface IPromoSeller {
  id: number;
  name: string;
  benefitType: string;
<<<<<<< HEAD
  amount: number | null;
=======
  amount: number;
>>>>>>> 4d5c297 (flow merging checkout master)
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
<<<<<<< HEAD
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
=======
  cartParcelId: string;
  invoiceGroupId: string;
  invoiceGroupName: string;
  totalProduct: number;
  totalPriceBeforeTax: number;
  PPN: number;
  isPotentialPromoPayment: boolean;
  totalPromoSellerAndVoucher: number;
  totalPromoPayment: number;
  totalPaymentFee: number;
  totalPayment: number;
  paymentType: IPaymentType | null;
  paymentChannel: IPaymentChannel | null;
  promoSellers: IPromoSeller[];
  vouchers: IVoucherCheckout[];
>>>>>>> 4d5c297 (flow merging checkout master)
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
<<<<<<< HEAD
  paymentType: IPaymentTypeCheckout;
  paymentChannel: IPaymentChannelCheckout;
=======
  paymentType: IPaymentType;
  paymentChannel: IPaymentChannel;
>>>>>>> 4d5c297 (flow merging checkout master)
}

export interface PromoPayment {
  invoiceGroupId: string;
  totalPromoPayment: number;
}
<<<<<<< HEAD

export interface CartIdPayload {
  cartId: string | null;
}
=======
>>>>>>> 4d5c297 (flow merging checkout master)
