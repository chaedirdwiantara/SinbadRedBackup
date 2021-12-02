/** === IMPORT PACKAGES ===  */
import React, { FC } from 'react';
import { View } from 'react-native';
/** === IMPORT COMPONENTS === */
import { EmptyState } from '@core/components/EmptyState';
import ProductTagList from '@core/components/product/list/ProductTagList';
import GridLayoutCard from '@core/components/product/list/grid-layout/GridLayoutCard';
import { GridSkeleton } from '@core/components/product/list/grid-layout/GridSkeleton';
/** === IMPORT FUNCTIONS === */
import { useProductDisplayState } from '@core/functions/product';
/** === IMPORT TYPE === */
import { SupplierProductLayoutProps } from './types';
/** === COMPONENT === */
export const SupplierProductGridLayout: FC<SupplierProductLayoutProps> = ({
  products,
  tags,
  onTagPress,
  onOrderPress,
  loading,
  error,
}) => {
  /** === HOOK ===  */
  const displayState = useProductDisplayState({
    loading,
    error,
    productsLength: products.length,
  });
  /** === DERIVED ===  */
  const hasTags = tags.length > 0;
  /** === VIEW ===  */
  if (displayState === 'loading') {
    return <GridSkeleton />;
  }

  return (
    <View style={{ flex: 1 }}>
      {(displayState === 'success' || displayState === 'empty') && hasTags && (
        <ProductTagList tags={tags} onTagPress={onTagPress} />
      )}
      {displayState === 'error' && (
        <EmptyState
          title="Terjadi Kesalahan"
          description="Boleh coba refresh lagi?"
        />
      )}
      {displayState === 'empty' && (
        <EmptyState title="Produk Kosong" description="Maaf Produk Kosong" />
      )}
      {displayState === 'success' && (
        <View style={{ flexDirection: 'row', paddingTop: !hasTags ? 14 : 0 }}>
          <View style={{ flex: 1 }}>
            {products.map(
              (product, productIndex) =>
                productIndex % 2 === 0 && (
                  <GridLayoutCard
                    key={product.id}
                    product={product}
                    index={productIndex}
                    onOrderPress={() => onOrderPress(product)}
                  />
                ),
            )}
          </View>
          <View style={{ flex: 1 }}>
            {products.map(
              (product, productIndex) =>
                productIndex % 2 === 1 && (
                  <GridLayoutCard
                    key={product.id}
                    product={product}
                    index={productIndex}
                    onOrderPress={() => onOrderPress(product)}
                  />
                ),
            )}
          </View>
        </View>
      )}
    </View>
  );
};
