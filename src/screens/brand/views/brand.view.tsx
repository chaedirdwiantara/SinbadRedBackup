/** === IMPORT PACKAGES ===  */
import React, { FC, useEffect } from 'react';
import { View, FlatList, Dimensions } from 'react-native';
import { SnbContainer, SnbTopNav } from 'react-native-sinbad-ui';
/** === IMPORT COMPONENTS === */
import { BrandCard } from '@core/components/BrandCard';
import { EmptyState } from '@core/components/EmptyState';
import { BrandListSkeleton } from './BrandListSkeleton';
/** === IMPORT FUNCTIONS === */
import { useListDisplayState } from '@core/functions/product';
import { useBrandContext } from 'src/data/contexts/brand/useBrandContext';
import { goBack, goToProduct, useBrandListAction } from '../functions';
/** === IMPORT TYPE === */
import * as models from '@models';
/** === CONSTANT === */
const { width } = Dimensions.get('window');
/** === COMPONENT === */
const BrandView: FC = () => {
  /** === HOOKS === */
  const {
    stateBrand: { list: brandListState },
    dispatchBrand,
  } = useBrandContext();
  const { fetch, loadMore, refresh } = useBrandListAction();
  const displayState = useListDisplayState({
    loading: brandListState.loading,
    error: brandListState.error,
    dataLength: brandListState.data.length,
  });

  useEffect(() => {
    fetch(dispatchBrand);
  }, []);
  /** === VIEW === */
  /** => Brand Item */
  const renderBrandItem = ({
    item,
    index,
  }: {
    item: models.BrandListItem;
    index: number;
  }) => (
    <View
      key={index}
      style={{
        marginRight: index + (1 % 4) === 0 ? 0 : 8,
        marginVertical: 4,
      }}>
      <BrandCard
        id={item.id}
        imageUrl={item.image}
        height={0.25 * width}
        width={0.21 * width}
        onCardPress={() => goToProduct(item)}
      />
    </View>
  );
  /** => Main */
  return (
    <SnbContainer color="white">
      <SnbTopNav.Type3 type="red" title="Brand Kami" backAction={goBack} />
      <View style={{ flex: 1 }}>
        {displayState === 'loading' && <BrandListSkeleton />}
        {displayState === 'error' && (
          <EmptyState
            title="Terjadi Kesalahan"
            description="Boleh coba refresh lagi?"
          />
        )}
        {displayState === 'empty' && (
          <EmptyState
            title="Terjadi Kesalahan"
            description="Boleh coba refresh lagi?"
          />
        )}
        {displayState === 'success' && (
          <View>
            <FlatList
              contentContainerStyle={{
                paddingTop: 8,
                paddingBottom: 16,
                paddingHorizontal: 12,
              }}
              data={brandListState.data}
              renderItem={renderBrandItem}
              keyExtractor={(item) => item.id}
              numColumns={4}
              onEndReachedThreshold={0.1}
              onEndReached={() => loadMore(dispatchBrand, brandListState)}
              refreshing={brandListState.refresh}
              onRefresh={() => refresh(dispatchBrand)}
            />
          </View>
        )}
      </View>
    </SnbContainer>
  );
};

export default BrandView;
