/** === IMPORT PACKAGE HERE ===  */
import React, { FC } from 'react';
import { TouchableOpacity, View, Image, ScrollView } from 'react-native';
import { SnbContainer, SnbTopNav, SnbText } from 'react-native-sinbad-ui';
import { goBack, goToBannerDetail } from '../functions';
import { BannerStyles } from '../styles'
/** === COMPONENT === */
const BannerListView: React.FC = () => {
  /** === HOOK === */
  /** === VIEW === */
  /** => header */
  const header = () => {
    return (
      <SnbTopNav.Type3
        type="red"
        title={'Penawaran Nasional'}
        backAction={() => goBack()}
      />
    );
  };

  /** => content */
  const content = () => {
    return (
      <View style={{ margin: 16 }}>
        {[0,1,2,3].map((item, index) => {
          return (
            <CardBanner/>
          );
        })}
      </View>
    );
  };
  /** => main */
  return (
    <SnbContainer color="white">
      {header()}
      <ScrollView>{content()}</ScrollView>
      <TouchableOpacity onPress={() => goToBannerDetail()}>
        <SnbText.B1>Go To Banner Detail</SnbText.B1>
      </TouchableOpacity>
    </SnbContainer>
  );
};

export default BannerListView;
/**
 * ================================================================
 * NOTES
 * ================================================================
 * createdBy: hasapu (team)
 * createDate: 01022021
 * updatedBy: -
 * updatedDate: -
 * updatedFunction/Component:
 * -> NaN (no desc)
 * -> NaN (no desc)
 */

const CardBanner = () => {
  return <View style={BannerStyles.bannerCardContainer}>
    {/* Image */}
    <View>
      <Image 
        style={BannerStyles.imageCard}
        source={{uri: 'https://images.tokopedia.net/img/cache/1200/NXCtjv/2021/9/22/9f12eb8f-41d9-4618-83eb-f47cd636617f.png.webp'}}
      />
    </View>
    {/* Info */}
    {/* Foter */}
  </View>
}