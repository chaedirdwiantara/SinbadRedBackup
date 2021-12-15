/** === QUEST LIST === */
export interface QuestListProcessProps {
  status: string;
  buyerId: number;
}

export interface QuestListItem {
  id: number;
  title: string;
  image: string;
  endDate: string;
  currentTask: number;
  totalTask: number;
  status: string;
}

export interface QuestListQueryOptions {
  status: string;
  buyerId: number;
}
