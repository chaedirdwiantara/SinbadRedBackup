import React, { FC } from 'react';
import { View, Image, ScrollView } from 'react-native';
import {
  SnbContainer,
  SnbTopNav,
  SnbProgress,
  SnbCardButtonType1,
} from 'react-native-sinbad-ui';
import moment from 'moment';
import { goBack } from '../functions';
import { PromoPaymentListStyles } from '../styles';
import { contexts } from '@contexts';
import * as models from '@models';
import { toCurrency } from '@core/functions/global/currency-format';
import * as Actions from '@actions';
import { useDispatch } from 'react-redux';
import { useDataGlobal } from '@core/redux/Data';
/** === DUMMIES === */
const dummies = {
  data: [
    {
      paymentPromoId: 1,
      paymentPromoName: 'Promo Virtual Account BCA',
      paymentPromoDescription: 'Promo potongan sebesar Rp50.000',
      imageUrl:
        'https://artolouis.com/wp-content/uploads/2019/05/Bank_Central_Asia.png',
      startDate: '2021-07-01T16:59:00.000Z',
      expiredAt: '2021-07-31T16:59:00.000Z',
    },
  ],
};
/** === COMPONENT === */
const PromoPaymentList: FC = () => {
  /** === HOOK === */
  /** => effect */
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
      <View
        style={{
          alignContent: 'flex-start',
          marginRight: 16,
          alignSelf: 'center',
        }}>
        <Image
          source={{ uri: imageUrl }}
          style={{
            width: 60,
            height: 40,
            borderRadius: 20,
          }}
        />
      </View>
    );
  };
  /** => promo list */
  const renderPromoList = () => {
    return (
      <View style={{ marginHorizontal: 16, marginTop: 16 }}>
        {dummies.data.map((item, index) => {
          return (
            <View
              key={index}
              style={{
                paddingVertical: 8,
                flexDirection: 'row',
                flexWrap: 'wrap',
              }}>
              <SnbCardButtonType1
                title={item.paymentPromoName}
                subTitle1={item.paymentPromoDescription}
                subTitle2={`Berlaku ${moment(new Date(item.startDate)).format(
                  'DD MMM',
                )} - ${moment(new Date(item.expiredAt)).format('DD MMM YYYY')}`}
                left={() => renderImagePaymentPromo(item.imageUrl)}
                type={'goTo'}
                onPress={() => goBack()}
              />
            </View>
          );
        })}
      </View>
    );
  };
  /** => loading */
  const renderLoading = () => {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <SnbProgress size={40} />
      </View>
    );
  };
  /** => main */
  return (
    <SnbContainer color="grey">
      {renderHeader()}
      <ScrollView>{renderPromoList()}</ScrollView>
    </SnbContainer>
  );
};

export default PromoPaymentList;
