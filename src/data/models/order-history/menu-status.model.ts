import * as models from '@models';

// type codeMenuStatusList = 'waiting_for_payment' | 'ongoing' | 'completed';
// type labelMenuStatusList = 'Menunggu Pembayaran' | 'Pesanan Berlangsung' | 'Pesanan Selesai';
export type MenuStatusList = {
  id: string;
  code: string;
  label: string;
}

export interface ListMenuStatusProcessAction <T = object> {
  type: string;
  contextDispatch: (action: any) => any;
}