import React, { FC } from 'react';
import { View, ScrollView } from 'react-native';
import {
  SnbContainer,
  SnbTopNav,
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
import LoadingPage from '@core/components/LoadingPage';
/** === COMPONENT === */
const PromoPaymentDetail: FC = ({ route }: any) => {
  /** === HOOK === */
  const { statePromo, dispatchPromo } = React.useContext(contexts.PromoContext);
  const promoPaymentAction = usePromoPaymentAction();
  const promoPaymentDetailState = statePromo.promoPayment.detail;
  /** => effect */
  React.useEffect(() => {
    promoPaymentAction.detail(dispatchPromo, route.params.promoPaymentId);
    return () => {
      promoPaymentAction.resetDetail(dispatchPromo);
    };
  }, []);
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
    if (promoPaymentDetailState.data === null) {
      return null;
    }
    return (
      <View style={{ marginTop: -90 }}>
        <SnbCardInfoType2.Header title={promoPaymentDetailState.data.name}>
          <SnbCardInfoType2.Row
            label={'Berlaku Dari'}
            text={`${moment(
              new Date(promoPaymentDetailState.data.startDate),
            ).format('DD MMM YYYY')} - ${moment(
              new Date(promoPaymentDetailState.data.endDate),
            ).format('DD MMM YYYY')}`}
          />
          <SnbCardInfoType2.Row
            label={'Promo Potongan'}
            text={toCurrency(promoPaymentDetailState.data.discountRebate)}
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
          {promoPaymentDetailState.data?.promoTnC.map((item, index) => {
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
      {!promoPaymentDetailState.loading &&
      promoPaymentDetailState.data !== null ? (
        <ScrollView showsVerticalScrollIndicator={false}>
          {renderHeader()}
          {renderRedBackground()}
          {renderPromoCardInformation()}
          {renderPromoTnC()}
        </ScrollView>
      ) : (
        <LoadingPage />
      )}
    </SnbContainer>
  );
};

export default PromoPaymentDetail;
