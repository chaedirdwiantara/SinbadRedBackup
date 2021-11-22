/** === IMPORT PACKAGE HERE ===  */
import React, { FC } from 'react';
import { View } from 'react-native';
import { SnbText } from 'react-native-sinbad-ui';
import { contexts } from '@contexts';
/** === IMPORT EXTERNAL FUNCTION HERE === */
import { ShoppingCartStyles } from '../../styles';

/** === COMPONENT === */
export const ShippingAddress: FC = () => {
  const {
    stateUser: {
      detail: { data: storeDetail },
    },
  } = React.useContext(contexts.UserContext);

  console.log('[stateUser]: ', storeDetail);
  return (
    <View style={ShoppingCartStyles.cardContainer}>
      <View style={ShoppingCartStyles.topCardSlot}>
        <SnbText.B4>Alamat Pengiriman</SnbText.B4>
      </View>
      <View style={ShoppingCartStyles.verticalBottomCardSlot}>
        <View style={{ marginBottom: 6 }}>
          <SnbText.B4>{storeDetail?.ownerData?.profile?.name}</SnbText.B4>
        </View>
        <View style={{ marginBottom: 6 }}>
          <SnbText.C2>Alamat 1 (default)</SnbText.C2>
        </View>
        <SnbText.B3>{storeDetail?.storeData?.storeAddress?.address}</SnbText.B3>
      </View>
    </View>
  );
};
