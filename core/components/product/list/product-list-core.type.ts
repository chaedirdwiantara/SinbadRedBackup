import * as models from '@models';

export interface ProductLayoutProps {
  products: Array<models.ProductList>;
  withTags?: boolean;
  tags: Array<ITag>;
  onTagPress: (index: number, tag: ITag) => void;
  onOrderPress: (item: models.ProductList) => void;
  isRefreshing: boolean;
  onRefresh: () => void;
  onLoadMore: () => void;
  loading: boolean;
  error: models.ErrorProps | null;
  total: number;
  onChangeLayoutListPress?: (layout: 'list' | 'grid') => void;
  onSortPress?: () => void;
  onFilterPress: () => void;
}

export type ProductHeaderType = 'default' | 'search';

export type CategoryTabLevel = '2' | '3';

export interface CategoryTabsConfig {
  level?: CategoryTabLevel;
  firstLevelIndex?: number;
  secondLevelIndex?: number;
  thirdLevelIndex?: number;
}

export type CategoryType =
  | models.CategoryLevel
  | models.CategoryLevel2
  | models.CategoryLevel3;

export interface ITag {
  value: string;
  selected: boolean;
}

export type ListDisplayState = 'loading' | 'error' | 'empty' | 'success';
