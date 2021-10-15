/** === IMPORT PACKAGE HERE === */
import React, { FC } from 'react';
import { View, TouchableOpacity, FlatList } from 'react-native';
import { SnbText, color } from 'react-native-sinbad-ui';
/** === INTERNAL === */
import { BrandCard } from '@core/components/BrandCard';
/** === STYLE === */
import BrandHomeStyle from '../styles/brand-home.style';
/** === TYPE === */
interface Brand {
  id: string;
  name: string;
  imageUrl: string;
}
/** === DUMMY === */
const brandList: Array<Brand> = [
  {
    id: '1',
    name: 'Whiskas',
    imageUrl: 'https://cdn.sinbad.web.id/brand/WHISKAS.png',
  },
  {
    id: '2',
    name: 'Ovaltine',
    imageUrl: 'https://cdn.sinbad.web.id/brand/OVALTINE.png',
  },
  {
    id: '3',
    name: 'SGM',
    imageUrl: 'https://cdn.sinbad.web.id/brand/SGM.png',
  },
  {
    id: '4',
    name: 'Yupi',
    imageUrl: 'https://cdn.sinbad.web.id/brand/YUPI.png',
  },
  {
    id: '5',
    name: 'Lakme',
    imageUrl: 'https://cdn.sinbad.web.id/brand/LAKME.png',
  },
];
/** === COMPONENT === */
const BrandHomeView: FC = () => {
  /** === VIEW === */
  /** === Brand Card === */
  const renderBrandCard = ({ item, index }: { item: Brand; index: number }) => (
    <View
      key={index}
      style={{
        marginLeft: index === 0 ? 16 : 0,
        marginRight: index === brandList.length - 1 ? 16 : 0,
      }}>
      <BrandCard
        id={item.id}
        name={item.name}
        imageUrl={item.imageUrl}
        height={150}
        width={110}
        onCardPress={() => console.log(`${item.name} pressed`)}
      />
    </View>
  );
  /** === Brand List Separator === */
  const renderBrandListSeparator = () => {
    return <View style={{ width: 10 }} />;
  };
  /** => Brand List */
  const renderBrandList = () => (
    <FlatList
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      data={brandList}
      renderItem={renderBrandCard}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={renderBrandListSeparator}
    />
  );
  /** => Content */
  const renderContent = () => (
    <View>
      <View style={BrandHomeStyle.header}>
        <SnbText.B4>Brand Kami</SnbText.B4>
        <TouchableOpacity
          style={{ justifyContent: 'center', alignItems: 'center' }}
          onPress={() => console.log('See all brand pressed')}>
          <SnbText.C2 color={color.red50}>Lihat Semua</SnbText.C2>
        </TouchableOpacity>
      </View>
      {renderBrandList()}
    </View>
  );
  /** => Main */
  return <View style={BrandHomeStyle.container}>{renderContent()}</View>;
};

export default BrandHomeView;
/**
 * ================================================================
 * NOTES
 * ================================================================
 * createdBy: hasapu (team)
 * createDate: 01022021
 * updatedBy: aliisetia
 * updatedDate: 14-10-21
 * updatedFunction/Component:
 * -> NaN (no desc)
 * -> NaN (no desc)
 */
