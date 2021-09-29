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
      id: 1,
      name: 'Promo Virtual Account BCA',
      startDate: '2021-07-01T16:59:00.000Z',
      endDate: '2021-07-31T16:59:00.000Z',
      discountRebate: 10000,
      image:
        'https://artolouis.com/wp-content/uploads/2019/05/Bank_Central_Asia.png',
    },
    {
      id: 2,
      name: 'Promo Virtual Account BCA 2',
      startDate: '2021-07-01T16:59:00.000Z',
      endDate: '2021-07-31T16:59:00.000Z',
      discountRebate: 20000,
      image:
        'https://artolouis.com/wp-content/uploads/2019/05/Bank_Central_Asia.png',
    },
    {
      id: 3,
      name: 'Promo Virtual Account BCA 3',
      startDate: '2021-07-01T16:59:00.000Z',
      endDate: '2021-07-31T16:59:00.000Z',
      discountRebate: 30000,
      image:
        'https://artolouis.com/wp-content/uploads/2019/05/Bank_Central_Asia.png',
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
            resizeMode: 'contain',
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
                title={item.name}
                subTitle1={`Promo potongan sebesar ${item.discountRebate}`}
                subTitle2={`Berlaku ${moment(new Date(item.startDate)).format(
                  'DD MMM',
                )} - ${moment(new Date(item.endDate)).format('DD MMM YYYY')}`}
                left={() => renderImagePaymentPromo(item.image)}
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
