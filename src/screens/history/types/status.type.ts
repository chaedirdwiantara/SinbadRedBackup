import { color } from 'react-native-sinbad-ui';

const paymentStatusList = [
  { status: 'waiting_for_payment', title: 'Menunggu Pembayaran' },
  { status: 'payment_failed', title: 'Tidak Dibayar' },
  { status: 'overdue', title: 'Overdue' },
  { status: 'paid', title: 'Dibayar' },
  { status: 'waiting_for_refund', title: 'Menunggu Pengembalian' },
  { status: 'refunded', title: 'Dikembalikan' },
] as const;
const orderStatusList = [
  { status: 'pending', title: 'Tertunda' },
  { status: 'pending_payment', title: 'Menunggu Pembayaran' },
  { status: 'confirmed', title: 'Verifikasi' },
  { status: 'pending_seller', title: 'Menunggu Konfirmasi' },
  { status: 'packing', title: 'Dikemas' },
  { status: 'shipping', title: 'Dikirim' },
  { status: 'delivered', title: 'Diterima' },
  { status: 'done', title: 'Selesai' },
  { status: 'cancel', title: 'Batal' },
  { status: 'pending_partial', title: 'Partial Pending' },
] as const;

export type PaymentStatusSlug = typeof paymentStatusList[number]['status'];
export type OrderStatusSlug = typeof orderStatusList[number]['status'];

export interface HistoryStatusColor {
  white: string;
  yellow: string;
  green: string;
  red: string;
}

export const historyStatusBgColor: HistoryStatusColor = {
  white: color.black5,
  yellow: color.yellow10,
  green: color.green10,
  red: color.red10,
};
export const historyStatusTextColor: HistoryStatusColor = {
  white: color.black60,
  yellow: color.yellow50,
  green: color.green50,
  red: color.red50,
};

export const paymentStatusColor: Record<
  PaymentStatusSlug,
  keyof HistoryStatusColor
> = {
  waiting_for_payment: 'yellow',
  payment_failed: 'white',
  overdue: 'red',
  paid: 'green',
  waiting_for_refund: 'yellow',
  refunded: 'green',
};
export const orderStatusColor: Record<
  OrderStatusSlug,
  keyof HistoryStatusColor
> = {
  pending: 'yellow',
  pending_payment: 'yellow',
  confirmed: 'white',
  pending_seller: 'yellow',
  packing: 'white',
  shipping: 'white',
  delivered: 'green',
  done: 'green',
  cancel: 'red',
  pending_partial: 'yellow',
};
