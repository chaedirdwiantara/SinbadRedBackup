/** === IMPORT PACKAGES ===  */
import React, { FC } from 'react';
import { View } from 'react-native';
/** === IMPORT COMPONENTS ===  */
import { SupplierProductGridLayout } from './SupplierProductGridLayout';
import { SupplierProductListLayout } from './SupplierProductListLayout';
/** === IMPORT TYPES ===  */
import * as models from '@models';
import { LayoutDisplay } from '@core/components/product/list/BottomAction';
import { ITag } from '@core/components/product/list/product-list-core.type';
/** === TYPE === */
interface SupplierProductProps {
  tags: Array<ITag>;
  products: Array<models.ProductList>;
  layoutDisplay: LayoutDisplay;
  onTagPress: (index: number, tag: ITag) => void;
  onOrderPress: (product: models.ProductList) => void;
  loading: boolean;
  error: models.ErrorProps | null;
}
/** === COMPONENT === */
export const SupplierProduct: FC<SupplierProductProps> = ({
  tags,
  products,
  layoutDisplay,
  onTagPress,
  onOrderPress,
  loading,
  error,
}) => {
  return (
    <View style={{ flex: 1 }}>
      {layoutDisplay === 'grid' ? (
        <SupplierProductGridLayout
          products={products}
          tags={tags}
          onTagPress={onTagPress}
          onOrderPress={onOrderPress}
          loading={loading}
          error={error}
        />
      ) : (
        <SupplierProductListLayout
          products={products}
          tags={tags}
          onTagPress={onTagPress}
          onOrderPress={onOrderPress}
          loading={loading}
          error={error}
        />
      )}
    </View>
  );
};
