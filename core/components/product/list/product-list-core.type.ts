import * as models from '@models';

export interface ProductLayoutProps {
  products: Array<models.ProductList>;
  tags: Array<string>;
  onTagPress: (tags: Array<string>) => void;
  onOrderPress: (item: models.ProductList) => void;
  isRefreshing: boolean;
  onRefresh: () => void;
  onLoadMore: () => void;
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
