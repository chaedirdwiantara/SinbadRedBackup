/** === IMPORT PACKAGE HERE ===  */
import React from 'react';
import { View, ScrollView, Image, FlatList } from 'react-native';
import moment from 'moment';
import {
  SnbContainer,
  SnbTopNav,
  SnbText,
  SnbCardInfoType2,
  color,
  SnbDivider,
} from 'react-native-sinbad-ui';
import SnbTextSeeMore from '@core/components/TextSeeMore';
import { ProductGridCard } from '@core/components/ProductGridCard';
import { goBack } from '../functions';
import { BannerDetailStyles } from '../styles';
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

/** Mock Data TnC */
const termsAndCondition = [
  'Berlaku untuk user dari semua tier',
  'Pembelian min 1.000.000 untuk SKU (SGM 300gr)',
  'Tidak berlaku kelipatan',
  'Voucher tidak bisa diuangkan, ditukar kembali dalam bentuk point atau digunakan untuk pembelian SKU lain',
  'Masa aktif voucher terhitung dari voucher didapatkan',
];

/** === COMPONENT === */
const BannerDetailView: React.FC = () => {
  /** === HOOK === */
  /** === VIEW === */
  /** => header */
  const renderHeader = () => {
    return (
      <View
        style={{ width: '100%', position: 'absolute', zIndex: 1000, top: 0 }}>
        <SnbTopNav.Type5
          type={'transparent1'}
          backAction={() => goBack()}
          title={''}
          iconAction={() => {}}
          iconName={'cart'}
          iconValue={10}
        />
      </View>
    );
  };

  /** => banner */
  const renderBanner = () => {
    return (
      <Image
        source={{
          uri: 'https://images.tokopedia.net/img/cache/1200/NXCtjv/2021/9/22/9f12eb8f-41d9-4618-83eb-f47cd636617f.png.webp',
        }}
        style={{
          height: 180,
          width: '100%',
        }}
      />
    );
  };

  /** => promo card information */
  const renderPromoCardInformation = () => {
    return (
      <View style={{ marginTop: -90 }}>
        <SnbCardInfoType2.Header
          title={'Khusus untuk kamu, iya kamu ! Dapatkan Promo Voucher SGM'}>
          <SnbCardInfoType2.Row
            label={'Berlaku Sampai'}
            text={moment(new Date()).format('DD MMM YYYY')}
          />
        </SnbCardInfoType2.Header>
      </View>
    );
  };

  /** => voucher description */
  const renderPromoDescription = () => {
    return (
      <View style={BannerDetailStyles.sectionContainer}>
        <SnbTextSeeMore
          maxLine={3}
          toggleColor={color.red50}
          toggleShowMore={'Lihat Semua'}
          toggleShowLess={'Lihat Lebih Sedikit'}
          content={
            <SnbText.B1>
              {
                'Semoga Anda dan keluarga selalu diberikan kesehatan dan terhindar dari wabah Virus Corona yang melanda bumi ini. Jaga kesehatan, jaga kebersihan, dan konsumsi makanan sehat. Tetap semangat menjemput rezeki bersama Sinbad !'
              }
            </SnbText.B1>
          }
        />
      </View>
    );
  };

  /** => promo TnC */
  const renderPromoTnC = () => {
    return (
      <View style={BannerDetailStyles.sectionContainer}>
        <View>
          <SnbText.B2>Syarat dan Ketentuan</SnbText.B2>
        </View>
        <SnbDivider style={{ marginVertical: 8 }} />
        <View style={{ marginRight: 20 }}>
          {termsAndCondition.map((item, index) => {
            return (
              <View
                key={index}
                style={{
                  flexDirection: 'row',
                  marginBottom: 4,
                }}>
                <View style={{ marginRight: 8, width: 20 }}>
                  <SnbText.B1>{index + 1}.</SnbText.B1>
                </View>
                <SnbText.B1>{item}</SnbText.B1>
              </View>
            );
          })}
        </View>
      </View>
    );
  };

  /** === Product Card === */
  const renderProductCard = ({
    item,
    index,
  }: {
    item: RecommendedProduct;
    index: number;
  }) => (
    <View
      key={index}
      style={{
        width: 160,
        marginLeft: index === 0 ? 16 : 0,
        marginRight: index === recommendedProducts.length - 1 ? 16 : 0,
      }}>
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
    return <View style={{ width: 12 }} />;
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

  /** => produk terkait */
  const renderRecommendationProduct = () => {
    return (
      <View style={{ marginTop: 16 }}>
        <View style={BannerDetailStyles.headerProductList}>
          <SnbText.B2>Produk Terkait</SnbText.B2>
        </View>
        {renderProductList()}
      </View>
    );
  };

  /** => main */
  return (
    <SnbContainer color="grey">
      <ScrollView showsVerticalScrollIndicator={false}>
        {renderHeader()}
        {renderBanner()}
        {renderPromoCardInformation()}
        {renderPromoDescription()}
        {renderPromoTnC()}
        {renderRecommendationProduct()}
      </ScrollView>
    </SnbContainer>
  );
};

export default BannerDetailView;
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
