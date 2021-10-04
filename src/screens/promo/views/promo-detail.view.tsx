import React, { FC } from 'react';
import { View, ScrollView, Image } from 'react-native';
import {
  SnbContainer,
  SnbTopNav,
  SnbProgress,
  color,
  SnbCardInfoType2,
  SnbText,
  SnbDivider,
} from 'react-native-sinbad-ui';
import moment from 'moment';
import { goBack, usePromoPaymentAction } from '../functions';
import { PromoPaymentDetailStyles } from '../styles';
import { contexts } from '@contexts';
import { toCurrency } from '@core/functions/global/currency-format';
/** === DUMMIES === */
const dummies = {
  data: {
    promoTnC: [
      'Berlaku hanya untuk user tertentu',
      'Promo hanya didapat oleh store yang memiliki order Rp. 100.000',
      'Promo berlaku untuk faktur MARS',
      'Tidak berlaku kelipatan (1 toko mendapatkan 1 promo)',
      'Promo dipotong setelah pajak',
      'Promo hanya berlaku untuk pembayaran Bayar Sekarang dan Bayar Nanti dengan metode pembayaran Virtual Account',
      'Promo hanya berlaku menggunakan Aplikasi Sinbad Red',
      'Untuk mendapatkan promo pastikan sudah menginstall aplikasi Sinbad terbaru',
      'Dengan menggunakan promo ini, pengguna dianggap mengerti dan menyetujui semua Syarat & Kententuan yang berlaku',
    ],
  },
};
/** === COMPONENT === */
const PromoDetail: FC = ({ route }: any) => {
  /** === HOOK === */
  /** => effect */
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
          uri: 'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/open-mic-night-facebook-event-banner-design-template-5a951f3dcd85d692ef014b7594d11498_screen.jpg?ts=1566599540',
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
          title={'Diskon hingga 5% untuk pembelian Ovaltine'}>
          <SnbCardInfoType2.Row label={'Berlaku Sampai'} text={'31 Jan 2020'} />
        </SnbCardInfoType2.Header>
      </View>
    );
  };
  /** => promo TnC */
  const renderPromoTnC = () => {
    return (
      <View style={PromoPaymentDetailStyles.sectionContainer}>
        <View>
          <SnbText.B2>Syarat dan Ketentuan</SnbText.B2>
        </View>
        <SnbDivider style={{ marginVertical: 8 }} />
        <View style={{ marginRight: 20 }}>
          {dummies.data.promoTnC.map((item, index) => {
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
  /** => loading */
  const renderLoading = () => {
    return (
      <View style={PromoPaymentDetailStyles.singleContainer}>
        <SnbProgress size={40} />
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
        {renderPromoTnC()}
      </ScrollView>
    </SnbContainer>
  );
};

export default PromoDetail;
