/** === NOTIFICATION LIST === */
export interface NotificationData {
  reasons: string;
  supplierName: string;
  approvalStatus: string;
}
export interface NotificationListSuccessProps {
  id: number;
  userId: number;
  type: string;
  data: NotificationData;
  description: string;
  imageUrl: string;
  isRead: boolean;
  createdAt: string;
}
