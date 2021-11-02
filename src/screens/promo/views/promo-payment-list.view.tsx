import React, { FC } from 'react';
import { View, Image, ScrollView } from 'react-native';
import {
  SnbContainer,
  SnbTopNav,
  SnbCardButtonType1,
  SnbEmptyData,
} from 'react-native-sinbad-ui';
import moment from 'moment';
import {
  goBack,
  usePromoPaymentAction,
  goToPromoPaymentDetail,
} from '../functions';
import { PromoPaymentListStyles } from '../styles';
import { contexts } from '@contexts';
import { toCurrency } from '@core/functions/global/currency-format';
import LoadingPage from '@core/components/LoadingPage';
import BottomModalError from '@core/components/BottomModalError';
/** === COMPONENT === */
const PromoPaymentList: FC = () => {
  /** === HOOK === */
  const [isErrorModalOpen, setErrorModalOpen] = React.useState(false);
  const { statePromo, dispatchPromo } = React.useContext(contexts.PromoContext);
  const promoPaymentAction = usePromoPaymentAction();
  const promoPaymentListState = statePromo.promoPayment.list;
  /** => effect */
  React.useEffect(() => {
    promoPaymentAction.list(dispatchPromo, '2');
    return () => {
      promoPaymentAction.resetList(dispatchPromo);
    };
  }, []);
  React.useEffect(() => {
    if (promoPaymentListState.error !== null) {
      setErrorModalOpen(true);
    }
  }, [promoPaymentListState]);
  /** === VIEW === */
  /** => header */
  const renderHeader = () => {
    return (
      <SnbTopNav.Type3
        type="red"
        title="Promo Pembayaran"
        backAction={() => goBack()}
      />
    );
  };
  /** => image payment promo */
  const renderImagePaymentPromo = (imageUrl: string) => {
    return (
      <View style={PromoPaymentListStyles.imageContainer}>
        <Image
          source={{ uri: imageUrl }}
          style={PromoPaymentListStyles.image}
        />
      </View>
    );
  };
  /** => promo list */
  const renderPromoList = () => {
    return (
      <View style={{ margin: 16 }}>
        {promoPaymentListState.data.map((item, index) => {
          return (
            <View key={index} style={PromoPaymentListStyles.card}>
              <SnbCardButtonType1
                title={item.name}
                subTitle1={`Promo potongan sebesar ${toCurrency(
                  item.discountRebate,
                )}`}
                subTitle2={`Berlaku ${moment(new Date(item.startDate)).format(
                  'DD MMM',
                )} - ${moment(new Date(item.endDate)).format('DD MMM YYYY')}`}
                left={() => renderImagePaymentPromo(item.image)}
                type={'goTo'}
                onPress={() => goToPromoPaymentDetail(1)}
              />
            </View>
          );
        })}
      </View>
    );
  };
  /** => empty */
  const renderEmpty = (messageTitle: string, messageBody: string) => {
    const image = () => {
      return (
        <Image
          source={require('../../../assets/images/voucher_empty.png')}
          style={PromoPaymentListStyles.emptyImage}
        />
      );
    };
    return (
      <View style={PromoPaymentListStyles.singleContainer}>
        <SnbEmptyData
          title={messageTitle}
          subtitle={messageBody}
          image={image()}
        />
      </View>
    );
  };
  /** => promo section */
  const renderPromoSection = () => {
    if (promoPaymentListState.data.length === 0) {
      return renderEmpty(
        'Promo Pembayaran Tidak Tersedia',
        'Tidak ada promo pembayaran yang tersedia saat ini',
      );
    } else {
      return <ScrollView>{renderPromoList()}</ScrollView>;
    }
  };
  /** => error modal */
  const renderErrorModal = () => {
    return (
      <BottomModalError
        isOpen={isErrorModalOpen}
        errorTitle={'Terjadi kesalahan'}
        errorSubtitle={'Silahkan mencoba kembali'}
        errorImage={require('../../../assets/images/cry_sinbad.png')}
        buttonTitle={'Ok'}
        buttonOnPress={() => {
          setErrorModalOpen(false);
          goBack();
        }}
      />
    );
  };
  /** => main */
  return (
    <SnbContainer color="grey">
      {renderHeader()}
      {!promoPaymentListState.loading ? renderPromoSection() : <LoadingPage />}
      {/* modal */}
      {renderErrorModal()}
    </SnbContainer>
  );
};

export default PromoPaymentList;
