/** === IMPORT PACKAGE HERE ===  */
import React, { FC } from 'react';
import { TouchableOpacity, View, Image, ScrollView } from 'react-native';
import {
  SnbContainer,
  SnbTopNav,
  SnbText,
  color,
  SnbIcon,
  SnbTextField,
} from 'react-native-sinbad-ui';
import { goBack, goToBannerDetail } from '../functions';
import { BannerStyles } from '../styles';
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

  /** => search */
  const search = () => {
    return (
      <View style={BannerStyles.search}>
        <SnbTextField.Text
          noBorder
          value={''}
          type={'default'}
          placeholder="Cari di Sinbad"
          onChangeText={() => {}}
          clearText={() => {}}
          autoCapitalize="none"
          keyboardType="default"
          returnKeyType="search"
          enter={() => {}}
          prefixIconName="search"
        />
      </View>
    );
  };

  /** => content */
  const content = () => {
    return (
      <View style={{ margin: 16 }}>
        {[0, 1, 2, 3].map((item, index) => (
          <CardBanner key={index.toString()} />
        ))}
      </View>
    );
  };
  /** => main */
  return (
    <SnbContainer color="white">
      {header()}
      {search()}
      <ScrollView>{content()}</ScrollView>
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
  return (
    <View style={BannerStyles.bannerCardContainer}>
      {/* Image */}
      <View>
        <Image
          style={BannerStyles.imageCard}
          source={{
            uri: 'https://images.tokopedia.net/img/cache/1200/NXCtjv/2021/9/22/9f12eb8f-41d9-4618-83eb-f47cd636617f.png.webp',
          }}
        />
      </View>
      {/* Info */}
      <View style={{ padding: 16, backgroundColor: 'white' }}>
        <SnbText.B2>
          Khusus untuk kamu, iya kamu ! Dapatkan Promo Voucher SGM
        </SnbText.B2>
        <View style={{ marginTop: 8 }}>
          <SnbText.B3 color={color.black80}>
            SINBAD mengadakan diskon hingga 5% untuk pembelian SGM. Jangan
            sampai ketinggalan promo dari SINBAD !
          </SnbText.B3>
        </View>
      </View>
      {/* Foter */}
      <View style={BannerStyles.footerCardBanner}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <SnbIcon name={'calender'} color={color.black60} size={16} />
          <View style={{ marginLeft: 7 }}>
            <SnbText.C1 color={color.black60}>
              Berlaku sampai 31 Jan 2020
            </SnbText.C1>
          </View>
        </View>
        <TouchableOpacity
          style={BannerStyles.buttonDetail}
          onPress={() => goToBannerDetail()}>
          <SnbText.B2 color={'white'}>Detail</SnbText.B2>
        </TouchableOpacity>
      </View>
    </View>
  );
};
