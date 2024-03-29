/** === IMPORT PACKAGE HERE ===  */
import React, { FC } from 'react';
import { View, ScrollView } from 'react-native';
import {
  SnbContainer,
  color,
  SnbCardInfoType2,
  SnbText,
  SnbDivider,
} from 'react-native-sinbad-ui';
import moment from 'moment';
/** === IMPORT COMPONENT HERE === */
import LoadingPage from '@core/components/LoadingPage';
import BottomSheetError from '@core/components/BottomSheetError';
import { PromoPaymentDetailHeader } from './promo-payment-detail-header.view';
/** === IMPORT INTERNAL FUNCTION HERE === */
import {
  goBack,
  usePromoPaymentAction,
  useStandardModalState,
} from '../../functions';
import { PromoPaymentDetailStyles } from '../../styles';
/** === IMPORT EXTERNAL FUNCTION HERE === */
import { contexts } from '@contexts';
import { toCurrency } from '@core/functions/global/currency-format';
import { NavigationAction } from '@core/functions/navigation';
/** === COMPONENT === */
const PromoPaymentDetail: FC = () => {
  /** === HOOK === */
  const promoPaymentDetailError = useStandardModalState();
  const { statePromo, dispatchPromo } = React.useContext(contexts.PromoContext);
  const promoPaymentAction = usePromoPaymentAction();
  const promoPaymentDetailState = statePromo.promoPayment.detail;
  const { id } = NavigationAction.useGetNavParams().params;
  /** => effect */
  React.useEffect(() => {
    promoPaymentAction.detail(dispatchPromo, id);
    return () => {
      promoPaymentAction.resetDetail(dispatchPromo);
    };
  }, []);
  React.useEffect(() => {
    if (promoPaymentDetailState.error !== null) {
      promoPaymentDetailError.setOpen(true);
    }
  }, [promoPaymentDetailState]);
  /** === VIEW === */
  /** => header */
  const renderHeader = () => {
    return <PromoPaymentDetailHeader />;
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
            text={toCurrency(promoPaymentDetailState.data.discountRebate, {
              withFraction: false,
            })}
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
          {promoPaymentDetailState.data?.termAndConditions.map(
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
  /** => error modal */
  const renderErrorModal = () => {
    return (
      <BottomSheetError
        open={promoPaymentDetailError.isOpen}
        error={promoPaymentDetailState.error}
        closeAction={() => {
          promoPaymentDetailError.setOpen(false);
          goBack();
        }}
      />
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
      {/* modal */}
      {renderErrorModal()}
    </SnbContainer>
  );
};

export default PromoPaymentDetail;
