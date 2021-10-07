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
import { goBack, usePromoGeneralAction } from '../functions';
import { PromoPaymentDetailStyles } from '../styles';
import { contexts } from '@contexts';
import { toCurrency } from '@core/functions/global/currency-format';
import SnbTextSeeMore from '../../voucher/components/SnbTextSeeMore';
/** === DUMMIES === */
const dummies = {
  data: {
    id: 1,
    name: 'PROMOMRS 092021',
    shortDescription:
      'Ini adalah voucher dari supplier TRS Ini adalah voucher dari supplier TRS Ini adalah voucher dari supplier TRS Ini adalah voucher dari supplier TRS Ini adalah voucher dari supplier TRS Ini adalah voucher dari supplier TRS',
    header: 'SupplierVoucherTRS',
    imageUrl:
      'https://sinbad-website-sg.s3.ap-southeast-1.amazonaws.com/staging/voucher/image_1633342649926.png',
    startDate: '2021-09-16T03:25:00.000Z',
    endDate: '2021-11-30T16:59:00.000Z',
    termsAndCondition: [
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
  const { statePromo, dispatchPromo } = React.useContext(contexts.PromoContext);
  const promoGeneralAction = usePromoGeneralAction();
  const promoGeneralDetailState = statePromo.promoGeneral.detail;
  console.log(promoGeneralDetailState);
  /** === HOOK === */
  /** => effect */
  React.useEffect(() => {
    promoGeneralAction.detail(dispatchPromo, '1');
    return () => {
      promoGeneralAction.reset(dispatchPromo);
    };
  }, []);
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
    if (promoGeneralDetailState.data === null) {
      return null;
    }
    return (
      <View style={{ marginTop: -90 }}>
        <SnbCardInfoType2.Header title={promoGeneralDetailState.data.name}>
          <SnbCardInfoType2.Row
            label={'Berlaku Sampai'}
            text={moment(
              new Date(promoGeneralDetailState.data.startDate),
            ).format('DD MMM YYYY')}
          />
        </SnbCardInfoType2.Header>
      </View>
    );
  };
  /** => voucher description */
  const renderPromoDescription = () => {
    if (promoGeneralDetailState.data === null) {
      return null;
    }
    return (
      <View style={PromoPaymentDetailStyles.sectionContainer}>
        <SnbTextSeeMore
          maxLine={3}
          toggleColor={color.red50}
          toggleShowMore={'Lihat Semua'}
          toggleShowLess={'Lihat Lebih Sedikit'}
          content={
            <SnbText.B1>
              {promoGeneralDetailState.data.shortDescription}
            </SnbText.B1>
          }
        />
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
          {promoGeneralDetailState.data?.termsAndCondition.map(
            (item, index) => {
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
            },
          )}
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
      {!promoGeneralDetailState.loading &&
      promoGeneralDetailState.data !== null ? (
        <ScrollView showsVerticalScrollIndicator={false}>
          {renderHeader()}
          {renderBanner()}
          {renderPromoCardInformation()}
          {renderPromoDescription()}
          {renderPromoTnC()}
        </ScrollView>
      ) : (
        renderLoading()
      )}
    </SnbContainer>
  );
};

export default PromoDetail;
