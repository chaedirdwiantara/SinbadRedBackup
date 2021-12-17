/** === IMPORT PACKAGES === */
import React, { FC, useEffect } from 'react';
import { View, TouchableOpacity } from 'react-native';
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
interface RecommendationHomeViewProps {
  navigationParent: any;
}
const RecommendationHomeView: FC<RecommendationHomeViewProps> = ({
  navigationParent,
}) => {
  /** === HOOKS === */
  const {
    stateProduct: {
      list: { data: productListData, loading: productListLoading },
    },
    dispatchProduct,
  } = useProductContext();
  const { fetch } = useProductListActions('recommendations');

  useEffect(() => {
    const unsubscribe = navigationParent.addListener('focus', () => {
      fetch(dispatchProduct);
    });

    return unsubscribe;
  }, [navigationParent]);
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
        data={productListData}
        loading={productListLoading}
      />
    </View>
  );
};

export default RecommendationHomeView;
