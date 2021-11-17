import * as models from '@models';

export interface ProductLayoutProps {
  products: Array<models.ProductList>;
  tags: Array<string>;
  onTagPress: (tags: Array<string>) => void;
  /** To reset ProductTagList component every time category changes by changing it's key. */
  tagListComponentKey?: string;
  onOrderPress: (item: models.ProductList) => void;
  isRefreshing: boolean;
  onRefresh: () => void;
  onLoadMore: () => void;
  loading: boolean;
  error: models.ErrorProps | null;
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
