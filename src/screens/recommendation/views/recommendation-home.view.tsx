/** === IMPORT PACKAGES === */
import React, { FC, useCallback } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { SnbText, color } from '@sinbad/react-native-sinbad-ui';
/** === IMPORT COMPONENT === */
import { HorizontalProductGridLayout } from '@core/components/product/HorizontalProductGridLayout';
/** === IMPORT FUNCTIONS === */
import { useProductListActions } from '@screen/product/functions';
import { useProductContext } from 'src/data/contexts/product';
import { goToProduct } from '../functions';
/** === IMPORT STYLE === */
import { RecommendationHomeStyle } from '../styles';
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
      <HorizontalProductGridLayout
        data={productListState.data}
        loading={productListState.loading}
      />
    </View>
  );
};

export default RecommendationHomeView;
