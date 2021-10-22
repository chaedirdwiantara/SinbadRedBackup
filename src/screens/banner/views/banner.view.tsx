/** === IMPORT PACKAGE HERE ===  */
import React from 'react';
import { TouchableOpacity, View, Image, FlatList } from 'react-native';
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

/** === MOCK === */
const bannerList = [
  {
    id: 1,
    imageUrl:
      'https://images.tokopedia.net/img/cache/1200/NXCtjv/2021/9/22/9f12eb8f-41d9-4618-83eb-f47cd636617f.png.webp',
    title: 'Khusus untuk kamu, iya kamu ! Dapatkan Promo Voucher SGM',
    description:
      'SINBAD mengadakan diskon hingga 5% untuk pembelian SGM. Jangan sampai ketinggalan promo dari SINBAD !',
    expiredAt: '31 Jan 2020',
  },
  {
    id: 2,
    imageUrl:
      'https://images.tokopedia.net/img/cache/1200/NXCtjv/2021/9/22/9f12eb8f-41d9-4618-83eb-f47cd636617f.png.webp',
    title: 'Khusus untuk kamu, iya kamu ! Dapatkan Promo Voucher SGM',
    description:
      'SINBAD mengadakan diskon hingga 5% untuk pembelian SGM. Jangan sampai ketinggalan promo dari SINBAD !',
    expiredAt: '31 Jan 2020',
  },
  {
    id: 3,
    imageUrl:
      'https://images.tokopedia.net/img/cache/1200/NXCtjv/2021/9/22/9f12eb8f-41d9-4618-83eb-f47cd636617f.png.webp',
    title: 'Khusus untuk kamu, iya kamu ! Dapatkan Promo Voucher SGM',
    description:
      'SINBAD mengadakan diskon hingga 5% untuk pembelian SGM. Jangan sampai ketinggalan promo dari SINBAD !',
    expiredAt: '31 Jan 2020',
  },
];

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

  /** => list banner */
  const renderListBanner = ({ item }: { item: any; index: number }) => {
    return (
      <View style={BannerStyles.bannerCardContainer}>
        {/* Image */}
        <View>
          <Image
            style={BannerStyles.imageCard}
            source={{
              uri: item.imageUrl,
            }}
          />
        </View>
        {/* Info */}
        <View style={{ padding: 16, backgroundColor: 'white' }}>
          <SnbText.B2>{item.title}</SnbText.B2>
          <View style={{ marginTop: 8 }}>
            <SnbText.B3 color={color.black80}>{item.description}</SnbText.B3>
          </View>
        </View>
        {/* Foter */}
        <View style={BannerStyles.footerCardBanner}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <SnbIcon name={'calender'} color={color.black60} size={16} />
            <View style={{ marginLeft: 7 }}>
              <SnbText.C1 color={color.black60}>
                Berlaku sampai {item.expiredAt}
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

  /** => content */
  const content = () => {
    return (
      <View style={{ margin: 16 }}>
        <FlatList
          data={bannerList}
          renderItem={renderListBanner}
          keyExtractor={(item) => item.id.toString()}
          onEndReachedThreshold={0.1}
          onEndReached={() => console.log('List scroll has reached end')}
          showsVerticalScrollIndicator={true}
        />
      </View>
    );
  };

  /** => main */
  return (
    <SnbContainer color="white">
      {header()}
      {search()}
      {content()}
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
