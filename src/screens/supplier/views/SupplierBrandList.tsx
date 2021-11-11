/** === IMPORT PACKAGES ===  */
import React, { FC } from 'react';
import { View, TouchableOpacity, FlatList, Image } from 'react-native';
import { SnbText, color } from 'react-native-sinbad-ui';
/** === IMPORT FUNCTIONS ===  */
import { goToBrandProduct, goToBrand } from '../functions';
/** === IMPORT TYPE ===  */
import * as models from '@models';
/** === IMPORT STYLE ===  */
import { SupplierStyle } from '../styles';
/** === TYPES === */
interface SupplierBrandCardProps {
  imageUrl: string;
  onCardPress?: () => void;
}

interface SupplierBrandListProps {
  brands: Array<models.BrandListSuccessProps>;
}
/** === COMPONENTS === */
const SupplierBrandCard: FC<SupplierBrandCardProps> = ({
  imageUrl,
  onCardPress,
}) => (
  <TouchableOpacity style={SupplierStyle.brandCard} onPress={onCardPress}>
    <Image source={{ uri: imageUrl }} style={SupplierStyle.brandCardImage} />
  </TouchableOpacity>
);

export const SupplierBrandList: FC<SupplierBrandListProps> = ({ brands }) => {
  /** => Brand Item */
  const renderBrandItem = ({
    item,
    index,
  }: {
    item: models.BrandListSuccessProps;
    index: number;
  }) => (
    <View key={index} style={{ paddingHorizontal: 5, paddingVertical: 5 }}>
      <SupplierBrandCard
        imageUrl={item.image}
        onCardPress={() => goToBrandProduct(item)}
      />
    </View>
  );
  /** => Main */
  return (
    <View style={{ paddingTop: 12, paddingBottom: 0, paddingHorizontal: 16 }}>
      <View style={SupplierStyle.brandListHeader}>
        <SnbText.B4>Brand Kami</SnbText.B4>
        <TouchableOpacity
          style={{ justifyContent: 'center', alignItems: 'center' }}
          onPress={goToBrand}>
          <SnbText.C2 color={color.red50}>Lihat Semua</SnbText.C2>
        </TouchableOpacity>
      </View>
      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={brands}
        renderItem={renderBrandItem}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View style={{ width: 16 }} />}
      />
    </View>
  );
};
