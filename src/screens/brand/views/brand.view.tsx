/** === IMPORT PACKAGES ===  */
import React, { FC, useEffect } from 'react';
import { View, FlatList, Dimensions } from 'react-native';
import {
  SnbContainer,
  SnbTopNav,
  SnbTopNav2,
  Content,
  spacingV2,
} from 'react-native-sinbad-ui';
/** === IMPORT COMPONENTS === */
// import { BrandCard } from '@core/components/BrandCard';
import { EmptyState } from '@core/components/EmptyState';
import { BrandListSkeleton } from './BrandListSkeleton';
/** === IMPORT FUNCTIONS === */
import { useListDisplayState } from '@core/functions/product';
import { useBrandContext } from 'src/data/contexts/brand/useBrandContext';
import { goBack, goToProduct, useBrandListAction } from '../functions';
/** === CONSTANT === */
const { spacing } = spacingV2;
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
  /** => Main */
  return (
    <SnbContainer color="white">
      <SnbTopNav2.Type4
        iconName=""
        iconAction={() => {}}
        title="Brand Resmi"
        backAction={goBack}
        color="white"
      />
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
                paddingTop: spacing.sm,
                paddingBottom: spacing.lg,
                paddingHorizontal: spacing.md,
              }}
              columnWrapperStyle={{ justifyContent: 'space-between' }}
              data={brandListState.data}
              renderItem={({ item }) => (
                <View style={{ padding: spacing.lg }}>
                  <Content.NewBrand.Square
                    image={item.image}
                    name={item.name}
                    onPress={() => goToProduct(item)}
                  />
                </View>
              )}
              keyExtractor={(item) => item.id}
              numColumns={3}
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
