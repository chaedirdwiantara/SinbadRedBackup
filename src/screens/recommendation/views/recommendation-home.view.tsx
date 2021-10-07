/** === EXTERNAL === */
import React, { FC } from 'react';
import { View, TouchableOpacity, FlatList } from 'react-native';
import { SnbText, color } from 'react-native-sinbad-ui';
/** === INTERNAL === */
import { ProductGridCard } from '@core/components/ProductGridCard';
/** === STYLE === */
import RecommendationHomeStyle from '../styles/recommendation-home.style';
/** === TYPE === */
interface RecommendedProduct {
  id: string;
  name: string;
  imageUrl: string;
  displayPrice: number;
  isBundle: boolean;
  isPromo: boolean;
  isExclusive: boolean;
}
/** === DUMMY === */
const recommendedProducts: Array<RecommendedProduct> = [
  {
    id: '1',
    name: 'LAKME CC CREAM ALMOND',
    imageUrl:
      'https://sinbad-website.s3.amazonaws.com/odoo_img/product/67400566.png',
    displayPrice: 77891,
    isBundle: false,
    isPromo: true,
    isExclusive: true,
  },
  {
    id: '2',
    name: 'LAKME BLUR PERFECT CREAMER',
    imageUrl:
      'https://sinbad-website.s3.amazonaws.com/odoo_img/product/67201003.png',
    displayPrice: 150000,
    isBundle: false,
    isPromo: false,
    isExclusive: false,
  },
  {
    id: '3',
    name: 'LAKME ABSOLUTE LIQUID CONCEALER IVORY FAIR',
    imageUrl:
      'https://sinbad-website.s3.amazonaws.com/odoo_img/product/67145109.png',
    displayPrice: 98782,
    isBundle: true,
    isPromo: true,
    isExclusive: true,
  },
  {
    id: '4',
    name: 'LAKME BIPHASED MAKEUP REMOVER',
    imageUrl:
      'https://sinbad-website.s3.amazonaws.com/odoo_img/product/21158106.png',
    displayPrice: 72000,
    isBundle: false,
    isPromo: true,
    isExclusive: false,
  },
  {
    id: '5',
    name: 'LAKME CC CREAM HONEY',
    imageUrl:
      'https://sinbad-website.s3.amazonaws.com/odoo_img/product/67400582.png',
    displayPrice: 77891,
    isBundle: false,
    isPromo: false,
    isExclusive: true,
  },
];
/** === COMPONENT === */
const RecommendationHomeView: FC = () => {
  /** === VIEW === */
  /** === Product Card === */
  const renderProductCard = ({
    item,
    index,
  }: {
    item: RecommendedProduct;
    index: number;
  }) => (
    <View key={index} style={{ width: 160 }}>
      <ProductGridCard
        flexOne={true}
        name={item.name}
        imageUrl={item.imageUrl}
        price={item.displayPrice}
        isBundle={item.isBundle}
        isPromo={item.isPromo}
        isExclusive={item.isExclusive}
        onCardPress={() => console.log(`${item.name} pressed`)}
      />
    </View>
  );
  /** === Product List Separator === */
  const renderProductListSeparator = () => {
    return <View style={{ width: 10 }} />;
  };
  /** => Product List */
  const renderProductList = () => (
    <FlatList
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      data={recommendedProducts}
      renderItem={renderProductCard}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={renderProductListSeparator}
    />
  );
  /** => Content */
  const renderContent = () => (
    <View>
      <View style={RecommendationHomeStyle.header}>
        <SnbText.B4>Rekomendasi</SnbText.B4>
        <TouchableOpacity
          style={{ justifyContent: 'center', alignItems: 'center' }}
          onPress={() => console.log('See all pressed')}>
          <SnbText.C2 color={color.red50}>Lihat Semua</SnbText.C2>
        </TouchableOpacity>
      </View>
      {renderProductList()}
    </View>
  );
  /** => Main */
  return (
    <View style={RecommendationHomeStyle.container}>{renderContent()}</View>
  );
};

export default RecommendationHomeView;
/**
 * ================================================================
 * NOTES
 * ================================================================
 * createdBy: hasapu (team)
 * createDate: 01022021
 * updatedBy: aliisetia
 * updatedDate: 07-10-21
 * updatedFunction/Component:
 * -> NaN (no desc)
 * -> NaN (no desc)
 */
