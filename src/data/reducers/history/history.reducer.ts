/** === IMPORT INTERNAL === */
import {
  OrderStatusInitialProps,
  orderStatusInitialState,
  orderStatusReducer,
} from './order-status.reducer';

export interface OrderStatusState {
  orderStatus: OrderStatusInitialProps;
}

export const OrderStatusInitialState = {
  orderStatus: orderStatusInitialState,
};

export const orderStatusHistoryReducer = (
  { orderStatus }: OrderStatusState,
  action: any,
) => ({
  orderStatus: orderStatusReducer(orderStatus, action),
});
