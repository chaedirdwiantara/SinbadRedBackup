import * as models from '@models';

export interface OrderStatus {
  status: models.OrderStatusQuery;
  title: string;
  detail: string;
}

export interface PaymentType {
  id: number;
  name: string;
}

export interface PaymentChannel {
  id: number;
  name: string;
  icon: string;
  description: string;
}

export interface PaymentDetailSuccessProps {
  id: number;
  paymentType: PaymentType;
  paymentChannel: PaymentChannel;
  paymentFee: number;
  totalPayment: number;
  deliveredTotalPayment: number;
  refundTotal: number;
  expiredPaymentTime: string;
  refundedTime: string;
  accountVaNo: string | null;
  billingStatus: string;
}

export interface PaymentInvoiceSuccessProps {
  fileName: string;
  url: string;
}

export interface PaymentActivateVASuccess {
  type: string;
  payload: any;
}

export interface PaymentActivateVASuccessProps {
  id: number;
  message: string;
}
