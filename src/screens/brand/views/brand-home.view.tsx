/** === IMPORT PACKAGES === */
import React, { FC, useCallback } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { SnbText, color } from 'react-native-sinbad-ui';
import { useFocusEffect } from '@react-navigation/native';
/** === IMPORT COMPONENTS === */
import { HorizontalBrandLayout } from '@core/components/product/HorizontalBrandLayout';
/** === IMPORT FUNCTIONS === */
import { useBrandContext } from 'src/data/contexts/brand/useBrandContext';
import { useBrandListAction, goToProduct, goToBrandList } from '../functions';
/** === IMPORT STYLES === */
import BrandHomeStyle from '../styles/brand-home.style';
/** === COMPONENT === */
const BrandHomeView: FC = () => {
  /** === HOOKS === */
  const {
    stateBrand: { list: brandListState },
    dispatchBrand,
  } = useBrandContext();
  const { fetch } = useBrandListAction();

  useFocusEffect(
    useCallback(() => {
      fetch(dispatchBrand);
    }, []),
  );
  /** === VIEW === */
  return (
    <View style={BrandHomeStyle.container}>
      <View style={BrandHomeStyle.header}>
        <SnbText.B4>Brand Kami</SnbText.B4>
        <TouchableOpacity
          style={{ justifyContent: 'center', alignItems: 'center' }}
          onPress={goToBrandList}>
          <SnbText.C2 color={color.red50}>Lihat Semua</SnbText.C2>
        </TouchableOpacity>
      </View>
      <HorizontalBrandLayout
        data={brandListState.data}
        loading={brandListState.loading}
        onCardPress={(brand) => goToProduct(brand)}
      />
    </View>
  );
};

export default BrandHomeView;
