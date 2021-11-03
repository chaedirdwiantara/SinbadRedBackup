/** === IMPORT PACKAGES === */
import React, { FC, useEffect } from 'react';
import { View, TouchableOpacity, FlatList } from 'react-native';
import { SnbText, color } from 'react-native-sinbad-ui';
/** === IMPORT COMPONENTS === */
import { BrandCard } from '@core/components/BrandCard';
/** === IMPORT FUNCTIONS === */
import { NavigationAction } from '@navigation';
import { useBrandContext } from 'src/data/contexts/brand/useBrandContext';
import { useBrandListAction, goToProduct } from '../functions';
/** === IMPORT TYPES === */
import * as models from '@models';
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

  useEffect(() => {
    fetch(dispatchBrand);
  }, []);
  /** === VIEW === */
  /** === Brand Item === */
  const renderBrandItem = ({
    item,
    index,
  }: {
    item: models.BrandListSuccessProps;
    index: number;
  }) => (
    <View
      key={index}
      style={{
        marginLeft: index === 0 ? 16 : 0,
        marginRight: index === brandListState.data.length - 1 ? 16 : 0,
      }}>
      <BrandCard
        id={item.id}
        imageUrl={item.image}
        height={150}
        width={110}
        onCardPress={() => goToProduct(item)}
      />
    </View>
  );
  /** => Main */
  return (
    <View style={BrandHomeStyle.container}>
      <View>
        <View style={BrandHomeStyle.header}>
          <SnbText.B4>Brand Kami</SnbText.B4>
          <TouchableOpacity
            style={{ justifyContent: 'center', alignItems: 'center' }}
            onPress={() => NavigationAction.navigate('BrandView')}>
            <SnbText.C2 color={color.red50}>Lihat Semua</SnbText.C2>
          </TouchableOpacity>
        </View>
        {/* Brand List */}
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={brandListState.data}
          renderItem={renderBrandItem}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
        />
      </View>
    </View>
  );
};

export default BrandHomeView;
