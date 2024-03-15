import * as models from '@models';
export interface Invoice {
  orderId: string;
  orderSellerId?: string;
  htmlContent: string;
}

export interface InvoiceProcessProps {
  id: string;
  orderCode?: string;
  type: string;
}

export interface InvoiceProcessAction {
  type: string;
  payload: InvoiceProcessProps;
  contextDispatch: (action: any) => any;
}
