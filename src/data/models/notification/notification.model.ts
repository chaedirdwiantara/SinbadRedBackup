/** === NOTIFICATION LIST === */
export interface NotificationData {
  reasons: string;
  supplierName: string;
  approvalStatus: string;
  billingId: number;
  id: number;
  section: string;
  orderParcelId: number;
}
export interface NotificationListSuccessProps {
  id: number;
  userId: number;
  type: string;
  data: NotificationData;
  body: string;
  imageUrl: string;
  isRead: boolean;
  screen: string;
  title: string;
  createdAt: string;
}

export interface NotificationTotalSuccess {
  data: { total: number };
}
