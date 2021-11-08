import * as models from '@models';
/** === TAG LIST === */
export interface TagList {
  tags: string;
  total: number;
}

export interface TagListProcessProps {
  loading: boolean;
  keyword?: string;
  brandId?: string;
  categoryId?: string;
}

export type TagListQueryOptions = Omit<TagListProcessProps, 'loading'>;

export interface TagListProcessAction {
  type: string;
  payload: TagListProcessProps;
  contextDispatch: (action: any) => any;
}

export interface TagListSuccessProps {
  data: Array<TagList>;
}

export interface TagListSuccessAction {
  type: string;
  payload: TagListSuccessProps;
}

export interface TagListItemProps {
  loading: boolean;
  refresh: boolean;
  data: Array<TagList>;
  error: models.ErrorProps | null;
}
