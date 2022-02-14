/** === IMPORT PACKAGES ===  */
import React, { FC } from 'react';
import { View } from 'react-native';
/** === IMPORT COMPONENTS === */
import { EmptyState } from '@core/components/EmptyState';
import { ProductListCard } from '@core/components/ProductListCard';
import ProductTagList from '@core/components/product/list/ProductTagList';
import { ListSkeleton } from '@core/components/product/list/list-layout/ListSkeleton';
/** === IMPORT FUNCTIONS === */
import {
  goToProductDetail,
  useListDisplayState,
} from '@core/functions/product';
/** === IMPORT TYPE === */
import { SupplierProductLayoutProps } from './types';
/** === COMPONENT === */
export const SupplierProductListLayout: FC<SupplierProductLayoutProps> = ({
  products,
  tags,
  onTagPress,
  onOrderPress,
  loading,
  error,
}) => {
  /** === HOOK ===  */
  const displayState = useListDisplayState({
    loading,
    error,
    dataLength: products.length,
  });
  /** === DERIVED === */
  const hasTags = tags.length > 0;
  /** === VIEW === */
  if (displayState === 'loading') {
    return <ListSkeleton />;
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
        <View style={{ paddingTop: !hasTags ? 14 : 0, paddingBottom: 24 }}>
          {products.map((product, productIndex) => (
            <View
              key={productIndex}
              style={{ minHeight: 100, marginHorizontal: 16 }}>
              <ProductListCard
                name={product.name}
                imageUrl={product.thumbnail}
                finalPrice={product.finalPrice}
                isBundle={product.isBundle}
                isPromo={product.isPromo}
                isExclusive={product.isExclusive}
                onCardPress={() => {
                  goToProductDetail(product.id);
                }}
                withOrderButton={true}
                onOrderPress={() => onOrderPress(product)}
              />
            </View>
          ))}
        </View>
      )}
    </View>
  );
};
