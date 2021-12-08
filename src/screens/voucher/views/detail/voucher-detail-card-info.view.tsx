/** === IMPORT PACKAGE HERE ===  */
import React, { FC } from 'react';
import { View } from 'react-native';
import { SnbCardInfoType2 } from 'react-native-sinbad-ui';
import moment from 'moment';
/** === INTERFACE === */
interface VoucherDetailCardInfoProps {
  voucherName: string;
  voucherCode: string;
  expiredAt: string;
}
/** === COMPONENT ===  */
export const VoucherDetailCardInfo: FC<VoucherDetailCardInfoProps> = ({
  voucherName,
  voucherCode,
  expiredAt,
}) => {
  return (
    <View style={{ marginTop: -40 }}>
      <SnbCardInfoType2.Header title={voucherName}>
        <SnbCardInfoType2.Row
          label={'Berlaku Sampai'}
          text={moment(new Date(expiredAt)).format('DD MMMM YYYY')}
        />
        <SnbCardInfoType2.Row label={'Kode Voucher'} text={voucherCode} />
      </SnbCardInfoType2.Header>
    </View>
  );
};
