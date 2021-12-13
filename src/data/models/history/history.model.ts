import { UrlTile } from 'react-native-maps';

export interface OrderStatus {
  status: string;
  title: string;
  detail: string;
}

export interface OrderStatusSuccessProps extends Array<OrderStatus> {}

export interface DetailOrderStatusProcessAction {
  type: string;
  contextDispatch: (action: any) => any;
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
}

export interface PaymentInvoiceSuccessProps {
  fileName: string;
  url: string;
}
