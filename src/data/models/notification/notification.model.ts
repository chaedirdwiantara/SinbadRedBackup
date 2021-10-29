/** === NOTIFICATION LIST === */
export interface NotificationListSuccessProps {
  id: number;
  userId: number;
  type: string;
  description: string;
  imageUrl: string;
  isRead: boolean;
  createdAt: string;
}
