import React, { FC } from 'react';
import { View } from 'react-native';
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
import { goBack } from '../functions';
import { PromoPaymentDetailStyles } from '../styles';
import { contexts } from '@contexts';
import { toCurrency } from '@core/functions/global/currency-format';
/** === DUMMIES === */
const dummies = {
  data: {
    id: '1',
    name: 'PROMOMRS 092021',
    startDate: '2021-09-16T03:25:00.000Z',
    endDate: '2021-09-30T16:59:00.000Z',
    discountRebate: 50000,
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
const PromoPaymentDetail: FC = () => {
  /** === HOOK === */
  const { statePromo, dispatchPromo } = React.useContext(contexts.PromoContext);
  /** => effect */
  /** === VIEW === */
  /** => header */
  const renderHeader = () => {
    return <SnbTopNav.Type3 type="red" title="" backAction={() => goBack()} />;
  };
  /** => red background */
  const renderRedBackground = () => {
    return <View style={{ backgroundColor: color.red50, height: 75 }} />;
  };
  /** => promo card information */
  const renderPromoCardInformation = () => {
    return (
      <View style={{ marginTop: -90 }}>
        <SnbCardInfoType2.Header title={dummies.data.name}>
          <SnbCardInfoType2.Row
            label={'Berlaku Dari'}
            text={`${moment(new Date(dummies.data.startDate)).format(
              'DD MMM YYYY',
            )} - ${moment(new Date(dummies.data.endDate)).format(
              'DD MMM YYYY',
            )}`}
          />
          <SnbCardInfoType2.Row
            label={'Promo Potongan'}
            text={toCurrency(dummies.data.discountRebate)}
          />
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
      {renderHeader()}
      {renderRedBackground()}
      {renderPromoCardInformation()}
      {renderPromoTnC()}
    </SnbContainer>
  );
};

export default PromoPaymentDetail;
