/** === IMPORT PACKAGE HERE ===  */
import React from 'react';
import { View, ScrollView, Image } from 'react-native';
import moment from 'moment';
import { 
  SnbContainer, 
  SnbTopNav, 
  SnbText, 
  SnbCardInfoType2, 
  color,
  SnbDivider
} from 'react-native-sinbad-ui';
import SnbTextSeeMore from '@core/components/TextSeeMore';
import { goBack } from '../functions';
import { BannerDetailStyles } from '../styles'

/** Mock Data TnC */
const termsAndCondition = [
  "Berlaku untuk user dari semua tier",
  "Pembelian min 1.000.000 untuk SKU (SGM 300gr)",
  "Tidak berlaku kelipatan",
  "Voucher tidak bisa diuangkan, ditukar kembali dalam bentuk point atau digunakan untuk pembelian SKU lain",
  "Masa aktif voucher terhitung dari voucher didapatkan"
]

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
        <SnbCardInfoType2.Header title={"Khusus untuk kamu, iya kamu ! Dapatkan Promo Voucher SGM"}>
          <SnbCardInfoType2.Row
            label={'Berlaku Sampai'}
            text={moment(
              new Date(),
            ).format('DD MMM YYYY')}
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
              {"Semoga Anda dan keluarga selalu diberikan kesehatan dan terhindar dari wabah Virus Corona yang melanda bumi ini. Jaga kesehatan, jaga kebersihan, dan konsumsi makanan sehat. Tetap semangat menjemput rezeki bersama Sinbad !"}
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

  /** => main */
  return (
    <SnbContainer color="grey">
      <ScrollView showsVerticalScrollIndicator={false}>
        {renderHeader()}
        {renderBanner()}
        {renderPromoCardInformation()}
        {renderPromoDescription()}
        {renderPromoTnC()}
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
