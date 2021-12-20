/** PAYMENT TYPE */
export const PAY_NOW = 1;
export const PAY_LATER = 2;
export const PAY_COD = 3;

/** BILLING STATUS */
export const PENDING = 'pending'; // waiting_for_payment
export const OVERDUE = 'overdue';
export const PAID = 'paid';
export const CANCEL = 'cancel'; //payment_failed
export const REFUND_REQUESTED = 'refund_requested'; //waiting_for_refund
export const REFUNDED = 'refunded';

/** ORDER STATUS */
export const DELIVERED = 'delivered';

/** PAYMENT CHANNEL TYPE */
export const CASH = 1;
