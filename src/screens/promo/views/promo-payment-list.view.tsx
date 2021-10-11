import React, { FC } from 'react';
import { View, Image, ScrollView } from 'react-native';
import {
  SnbContainer,
  SnbTopNav,
  SnbCardButtonType1,
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
/** === COMPONENT === */
const PromoPaymentList: FC = () => {
  /** === HOOK === */
  const { statePromo, dispatchPromo } = React.useContext(contexts.PromoContext);
  const promoPaymentAction = usePromoPaymentAction();
  const promoPaymentListState = statePromo.promoPayment.list;
  /** => effect */
  React.useEffect(() => {
    promoPaymentAction.list(dispatchPromo);
    return () => {
      promoPaymentAction.resetList(dispatchPromo);
    };
  }, []);
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
  /** => main */
  return (
    <SnbContainer color="grey">
      {renderHeader()}
      {!promoPaymentListState.loading &&
      promoPaymentListState.data.length !== 0 ? (
        <ScrollView>{renderPromoList()}</ScrollView>
      ) : (
        <LoadingPage />
      )}
    </SnbContainer>
  );
};

export default PromoPaymentList;
