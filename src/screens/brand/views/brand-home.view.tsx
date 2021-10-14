/** === IMPORT PACKAGE HERE === */
import React, { FC } from 'react';
import { View, TouchableOpacity, FlatList } from 'react-native';
import { SnbText, color } from 'react-native-sinbad-ui';
import { NavigationAction } from '@navigation';
import { useBrandAction } from '../functions';
import { contexts } from '@contexts';
import * as models from '@models';
/** === INTERNAL === */
import { BrandCard } from '@core/components/BrandCard';
/** === STYLE === */
import BrandHomeStyle from '../styles/brand-home.style';

/** === COMPONENT === */
const BrandHomeView: FC = () => {
  /** === HOOK === */
  const { stateBrand, dispatchBrand } = React.useContext(contexts.BrandContext);
  const brandAction = useBrandAction();
  const brandListState = stateBrand.list;
  /** => effect */
  React.useEffect(() => {
    brandAction.list(dispatchBrand);
  }, []);
  /** === VIEW === */
  /** === Brand Card === */
<<<<<<< HEAD
  const renderBrandCard = ({
    item,
    index,
  }: {
    item: models.BrandListSuccessProps;
    index: number;
  }) => (
    <View key={index}>
=======
  const renderBrandCard = ({ item, index }: { item: Brand; index: number }) => (
    <View
      key={index}
      style={{
        marginLeft: index === 0 ? 16 : 0,
        marginRight: index === brandList.length - 1 ? 16 : 0,
      }}>
>>>>>>> 1d0fabf6c7781738c513d0e502e16bb3874fa1c1
      <BrandCard
        id={item.id}
        imageUrl={item.image}
        height={150}
        width={110}
        onCardPress={() => console.log(`${item.image} pressed`)}
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
      data={brandListState.data}
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
          onPress={() => NavigationAction.navigate('BrandView')}>
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
