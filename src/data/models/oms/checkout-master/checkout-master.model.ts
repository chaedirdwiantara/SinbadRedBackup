import * as models from '@models';
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

export interface IInvoiceCheckout extends models.InvoiceCheckout {
  totalPromoSellerAndVoucher?: number;
  totalPromoPayment?: number;
  totalFee?: number;
  totalPayment?: number;
  paymentType?: IPaymentTypeCheckout | null;
  paymentChannel?: IPaymentChannelCheckout | null;
  promoSellers?: IPromoSeller[];
  voucherSeller?: IVoucherCheckout | null;
}

export interface CheckoutDataMaster {
  cartId: string | null;
  invoices: IInvoiceCheckout[];
}

export interface ReserveDiscount {
  invoiceGroupId: string;
  promoSellers: IPromoSeller[];
  voucherSeller: IVoucherCheckout | null;
  totalPromoSellerAndVoucher: number;
}

export interface PaymentTypeChannel {
  invoiceGroupId: string;
  totalPaymentFee: number;
  totalPayment: number;
  totalPromoPayment: number;
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
