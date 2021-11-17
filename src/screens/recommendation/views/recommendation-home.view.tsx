/** === IMPORT PACKAGES === */
import React, { FC, useCallback } from 'react';
import { View, TouchableOpacity, FlatList } from 'react-native';
import { SnbText, color } from 'react-native-sinbad-ui';
import { useFocusEffect } from '@react-navigation/native';
/** === IMPORT COMPONENT === */
import { ProductGridCard } from '@core/components/ProductGridCard';
import { HorizontalGridSkeleton } from '@core/components/product/HorizontalGridSkeleton';
/** === IMPORT FUNCTIONS === */
import { useProductListActions } from '@screen/product/functions';
import { useProductContext } from 'src/data/contexts/product';
import { goToProduct, goToProductDetail } from '../functions';
/** === IMPORT TYPE === */
import * as models from '@models';
/** === STYLE === */
import RecommendationHomeStyle from '../styles/recommendation-home.style';
/** === COMPONENT === */
const RecommendationHomeView: FC = () => {
  /** === HOOKS === */
  const {
    stateProduct: { list: productListState },
    dispatchProduct,
  } = useProductContext();
  const { fetch } = useProductListActions('recommendations');

  useFocusEffect(
    useCallback(() => {
      fetch(dispatchProduct);
    }, []),
  );
  /** === VIEW === */
  /** === Product Card === */
  const renderProductCard = ({
    item,
    index,
  }: {
    item: models.ProductList;
    index: number;
  }) => (
    <View
      key={index}
      style={{
        width: 160,
        marginLeft: index === 0 ? 16 : 0,
        marginRight: index === productListState.data.length - 1 ? 16 : 0,
      }}>
      <ProductGridCard
        flexOne={true}
        name={item.name}
        imageUrl={item.thumbnail}
        originalPrice={item.originalPrice}
        currentPrice={item.currentPrice}
        isBundle={item.isBundle}
        isPromo={item.isPromo}
        isExclusive={item.isExclusive}
        onCardPress={() => goToProductDetail(item.id)}
      />
    </View>
  );
  /** => Main */
  return (
    <View style={RecommendationHomeStyle.container}>
      <View style={RecommendationHomeStyle.header}>
        <SnbText.B4>Rekomendasi</SnbText.B4>
        <TouchableOpacity
          style={{ justifyContent: 'center', alignItems: 'center' }}
          onPress={goToProduct}>
          <SnbText.C2 color={color.red50}>Lihat Semua</SnbText.C2>
        </TouchableOpacity>
      </View>
      {productListState.loading ? (
        <HorizontalGridSkeleton />
      ) : (
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={productListState.data}
          renderItem={renderProductCard}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
        />
      )}
    </View>
  );
};

export default RecommendationHomeView;
