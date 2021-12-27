/** PAYMENT TYPE */
export const PaymentType = {
  PAY_NOW: 1,
  PAY_LATER: 2,
  PAY_COD: 3,
};

/** BILLING STATUS */
export const BillingStatus = {
  PENDING: 'pending', // waiting_for_payment
  OVERDUE: 'overdue',
  PAID: 'paid',
  CANCEL: 'cancel', //payment_failed
  REFUND_REQUESTED: 'refund_requested', //waiting_for_refund
  REFUNDED: 'refunded',
  EXPIRED: 'expired',
};

/** ORDER STATUS */
export const OrderStatus = {
  DELIVERED: 'delivered',
  DONE: 'done',
};

export const ChannelType = {
  CASH: 1,
};
