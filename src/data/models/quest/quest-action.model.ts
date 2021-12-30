export interface QuestListProcessProps {
  status: string;
}

export interface QuestListQueryOptions {
  status: string;
}

export interface QuestDetailProcessProps {
  id: number;
}

export interface QuestDetailProcessAction {
  type: string;
  payload: QuestDetailProcessProps;
  contextDispatch: (action: any) => any;
}

export interface QuestTaskProcessProps {
  questId: number;
  taskId: number;
  status: string;
}

export interface QuestTaskProcessAction {
  type: string;
  payload: QuestTaskProcessProps;
  contextDispatch: (action: any) => any;
}
