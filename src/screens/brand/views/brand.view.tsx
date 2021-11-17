/** === IMPORT PACKAGES ===  */
import React, { FC, useEffect } from 'react';
import { View, FlatList, Dimensions } from 'react-native';
import { SnbContainer, SnbTopNav } from 'react-native-sinbad-ui';
/** === IMPORT COMPONENTS === */
import { BrandCard } from '@core/components/BrandCard';
import LoadingPage from '@core/components/LoadingPage';
/** === IMPORT FUNCTIONS === */
import { useBrandContext } from 'src/data/contexts/brand/useBrandContext';
import { goBack, goToProduct, useBrandListAction } from '../functions';
/** === IMPORT TYPES === */
import * as models from '@models';
/** === CONSTANTS === */
const { width } = Dimensions.get('window');
/** === COMPONENT === */
const BrandView: FC = () => {
  /** === HOOKS === */
  const {
    stateBrand: { list: brandListState },
    dispatchBrand,
  } = useBrandContext();
  const { fetch, loadMore, refresh } = useBrandListAction();

  useEffect(() => {
    fetch(dispatchBrand);
    return () => {
      fetch(dispatchBrand);
    };
  }, []);
  /** === VIEW === */
  /** => Brand Item */
  const renderBrandItem = ({
    item,
    index,
  }: {
    item: models.BrandListSuccessProps;
    index: number;
  }) => (
    <View key={index} style={{ paddingHorizontal: 5, paddingVertical: 5 }}>
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
        {!brandListState.loading && brandListState.data.length !== 0 ? (
          <View>
            <FlatList
              contentContainerStyle={{
                paddingVertical: 20,
                paddingHorizontal: 0.01 * width,
              }}
              showsHorizontalScrollIndicator
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
        ) : (
          <LoadingPage />
        )}
      </View>
    </SnbContainer>
  );
};

export default BrandView;
