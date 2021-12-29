export interface CheckoutDoneProcessAction {
  type: string;
  payload: CheckoutDoneProcessProps;
  contextDispatch: (action: any) => any;
}

export interface CheckoutDoneProcessProps {
  id: number;
}
export interface CheckoutDoneOrders {
  totalAmount: number;
  orderDate: string;
  estDueDate: string;
  estDeliveredDate: string;
  buyerId: number;
  orderParcels: Array<CheckoutDoneOrderParccels>;
}

export interface CheckoutDoneOrderParccels {
  id: number;
  orderId: number;
  orderCode: string;
  amount: number;
  paymentChannel: CheckoutDonePaymentChannel;
  paymentType: CheckoutDonePaymentType;
  billing: CheckoutDoneBilling;
  paylaterType?: null;
  paymentPromo?: null;
}

export interface CheckoutDonePaymentChannel {
  id: number;
  name: string;
  description: Array<CheckoutDonePaymentChannelDescription>;
}

export interface CheckoutDonePaymentChannelDescription {
  name: string;
  description: string;
}

export interface CheckoutDonePaymentType {
  id: number;
  name: string;
}

export interface CheckoutDoneBilling {
  id: number;
  accountVaNo: string;
  accountVaType: string;
  expiredTime: string;
  createdTime: string;
  totalFeeDeduct: number;
}
