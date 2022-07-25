/** === NOTIFICATION LIST === */
export interface NotificationData {
  iconName: string;
  iconColor: string;
  orderId?: string;
  screen?: string;
  productId?: string;
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
