export interface QuestListProcessProps {
  status: string;
  buyerId: number;
}

export interface QuestListQueryOptions {
  status: string;
  buyerId: number;
}

export interface QuestDetailProcessProps {
  id: number;
  buyerId: number;
}

export interface QuestDetailProcessAction {
  type: string;
  payload: QuestDetailProcessProps;
  contextDispatch: (action: any) => any;
}
