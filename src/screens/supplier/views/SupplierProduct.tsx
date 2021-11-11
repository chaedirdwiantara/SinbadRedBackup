/** === IMPORT PACKAGES ===  */
import React, { FC, Dispatch, SetStateAction } from 'react';
import { View } from 'react-native';
/** === IMPORT COMPONENTS ===  */
import GridLayout from '@core/components/product/list/grid-layout/GridLayout';
import ListLayout from '@core/components/product/list/ListLayout';
import { SupplierBrandList } from './SupplierBrandList';
/** === IMPORT TYPES ===  */
import * as models from '@models';
import {
  LayoutDisplay,
  PriceRange,
} from '@core/components/product/list/BottomAction';
import { SortQuery } from '@core/functions/product';
/** === TYPE === */
interface SupplierProductProps {
  brands: Array<models.BrandListSuccessProps>;
  tags: Array<string>;
  products: Array<models.ProductList>;
  isRefreshing: boolean;
  onRefresh: (queryOptions: models.ProductListQueryOptions) => void;
  onFetch: (queryOptions: models.ProductListQueryOptions) => void;
  onLoadMore: (queryOptions: models.ProductListQueryOptions) => void;
  sellerId: string;
  layoutDisplay: LayoutDisplay;
  sortQuery: SortQuery | null;
  filterQuery: PriceRange | null;
  selectedTags: Array<string>;
  setSelectedTags: Dispatch<SetStateAction<Array<string>>>;
}
/** === COMPONENT === */
export const SupplierProduct: FC<SupplierProductProps> = ({
  brands,
  tags,
  products,
  isRefreshing,
  onRefresh,
  onFetch,
  onLoadMore,
  sellerId,
  layoutDisplay,
  sortQuery,
  filterQuery,
  selectedTags,
  setSelectedTags,
}) => {
  /** === DERIVEDS === */
  const derivedQueryOptions: models.ProductListQueryOptions = {
    sort: sortQuery?.sort,
    sortBy: sortQuery?.sortBy,
    minPrice: filterQuery?.minPrice,
    maxPrice: filterQuery?.maxPrice,
    sellerId,
    tags: selectedTags,
  };

  const handleTagPress = (currentTags: Array<string>) => {
    setSelectedTags(currentTags);
    onFetch({ ...derivedQueryOptions, tags: currentTags });
  };
  /** === VIEW === */
  return (
    <View style={{ flex: 1 }}>
      <SupplierBrandList brands={brands} />
      {layoutDisplay === 'grid' ? (
        <GridLayout
          products={products}
          tags={tags}
          onTagPress={handleTagPress}
          onOrderPress={(product) =>
            console.log('Add to Cart pressed', { product })
          }
          isRefreshing={isRefreshing}
          onRefresh={() => onRefresh(derivedQueryOptions)}
          onLoadMore={() => onLoadMore(derivedQueryOptions)}
        />
      ) : (
        <ListLayout
          products={products}
          tags={tags}
          onTagPress={handleTagPress}
          onOrderPress={(product) =>
            console.log('Add to Cart pressed', { product })
          }
          isRefreshing={isRefreshing}
          onRefresh={() => onRefresh(derivedQueryOptions)}
          onLoadMore={() => onLoadMore(derivedQueryOptions)}
        />
      )}
    </View>
  );
};
