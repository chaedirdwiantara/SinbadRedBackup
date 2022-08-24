import React from 'react';
import { Content } from '@sinbad/react-native-sinbad-ui';
import { View } from 'react-native';
import { VoucherCartListStyles } from '@screen/voucher/styles';

export const VoucherCartEmpty = () => {
  return (
    <View style={VoucherCartListStyles.emptyContainer}>
      <Content.Illustration
        image={require('../../../../assets/images/voucher_not_found.png')}
        imageStyle={VoucherCartListStyles.emptyImage}
        title="Voucher Tidak Ditemukan"
        description="Silahkan ulangi pencarian atau pilih voucher dari halaman utama"
      />
    </View>
  );
};
