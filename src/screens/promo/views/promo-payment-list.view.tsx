import React, { FC } from 'react';
import { View } from 'react-native';
import { SnbContainer, SnbTopNav, SnbProgress } from 'react-native-sinbad-ui';
import { goBack } from '../functions';
import { PromoPaymentListStyles } from '../styles';
import { contexts } from '@contexts';
import * as models from '@models';
import { toCurrency } from '@core/functions/global/currency-format';
import * as Actions from '@actions';
import { useDispatch } from 'react-redux';
import { useDataGlobal } from '@core/redux/Data';
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
      {renderLoading()}
    </SnbContainer>
  );
};

export default PromoPaymentList;
