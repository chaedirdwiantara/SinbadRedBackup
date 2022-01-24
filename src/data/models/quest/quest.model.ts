/** === QUEST LIST === */
export interface QuestListItem {
  id: number;
  title: string;
  image: string;
  endDate: string;
  currentTaskId: number;
  doneTask: number;
  totalTask: number;
  status: string;
}

/** === QUEST DETAIL === */
export interface QuestDetailTask {
  id: number;
  taskId: string;
  isHaveScreen: boolean;
  screenName: string;
  sequence: number;
  title: string;
  description: string;
  status: string | null;
}

export interface QuestDetailItem {
  id: number;
  rewardDescription: string;
  endDate: string;
  imageUrl: string;
  title: string;
  detailQuest: string;
  termsAndCondition: string;
  currentTask: string;
  currentTaskId: number;
  doneTask: number;
  questStatus: string;
  rewardType: string;
  rewardValue: number;
  startDate: string;
  task: QuestDetailTask[];
}

export interface QuestTaskProducts {
  catalogueImages: string;
  maxRewardVoucherPerCustomer: number | null;
  productId: number | null;
  productName: string;
  regularSellingPrice: number | null;
  suggestedSellingPrice: number | null;
}

export interface QuestTaskDetailItem {
  id: number;
  headerTitle: string;
  createdAt: string;
  screenName: string;
  buyerId: string;
  updatedAt: string;
  description: string;
  products: QuestTaskProducts;
  title: string;
}

export interface QuestValidateVoucherItem {
  message: string;
}
