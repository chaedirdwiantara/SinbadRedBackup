/** === NOTIFICATION LIST === */
export interface NotificationData {
  iconName: string;
  iconColor: string;
  // id can be order id or product id
  id?: string;
  screen?: string;
  warehouseId?: string;
  productImage?: string;
  productName?: string;
}
export interface NotificationListSuccessProps {
  id: string;
  typeName: string;
  title: string;
  body: string;
  isRead: boolean;
  screen: string;
  data: NotificationData;
  createdAt: string;
}

export interface NotificationTotalSuccess {
  data: { total: number };
}
