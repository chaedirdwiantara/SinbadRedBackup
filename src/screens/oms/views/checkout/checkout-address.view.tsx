/** === IMPORT PACKAGE HERE ===  */
import { CheckoutStyle } from '@screen/oms/styles';
import React, { FC } from 'react';
import { View } from 'react-native';
import { SnbText, SnbDivider } from 'react-native-sinbad-ui';
import { contexts } from '@contexts';
/** === COMPONENT === */
export const CheckoutAddressView: FC = () => {
  const {
    stateUser: {
      detail: { data: storeDetail },
    },
  } = React.useContext(contexts.UserContext);

  return (
    <View style={CheckoutStyle.addessSection}>
      <SnbText.B2>Alamat Pengiriman</SnbText.B2>
      <SnbDivider style={{ marginVertical: 8 }} />

      <View style={{ marginBottom: 6 }}>
        <SnbText.B4>{storeDetail?.ownerData?.profile?.name}</SnbText.B4>
      </View>
      <SnbText.B1>{storeDetail?.storeData?.storeAddress?.address}</SnbText.B1>
    </View>
  );
};

/**
 * ================================================================
 * NOTES
 * ================================================================
 * createdBy: Maulana Ghozi (pyramid)
 * createDate: 25112021
 * updatedBy: -
 * updatedDate: -
 * updatedFunction/Component:
 * -> NaN (no desc)
 * -> NaN (no desc)
 */
