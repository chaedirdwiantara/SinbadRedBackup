import React from 'react';
import { SnbContainer, SnbText2 } from '@sinbad/react-native-sinbad-ui';
import { Image, View } from 'react-native';
import { VoucherCartListStyles } from '@screen/voucher/styles';

export const VoucherCartEmpty = () => {
  return (
    <SnbContainer color="grey">
      <View style={VoucherCartListStyles.emptyContainer}>
        <Image
          source={require('../../../../assets/images/voucher_not_found.png')}
          style={VoucherCartListStyles.emptyImage}
        />
        <View style={VoucherCartListStyles.emptyTitle}>
          <SnbText2.Headline.Default>
            Voucher Tidak Ditemukan
          </SnbText2.Headline.Default>
        </View>
        <SnbText2.Paragraph.Default align="center">
          Silahkan ulangi pencarian atau pilih voucher dari halaman utama
        </SnbText2.Paragraph.Default>
      </View>
    </SnbContainer>
  );
};