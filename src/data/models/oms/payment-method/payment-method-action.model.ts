export interface PaymentMethodProps {
  amount: number;
  page: string;
  perPage: string;
}

export interface isOrderRTDBChangeAction {
  type: string;
  payload: PaymentMethodOrderRTDB;
}

export interface PaymentMethodOrderRTDB {
  message: 'Successfully created data';
  data: PaymentMethodRtdbData;
}

export interface PaymentMethodRtdbData {
  id: string;
  createdAt: string;
  updatedAt: string;
}
