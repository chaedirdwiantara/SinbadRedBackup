/** === IMPORT PACKAGE HERE ===  */
import React, { FC } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { SnbText, color } from 'react-native-sinbad-ui';
import { VoucherDetailStyles } from '../../styles';
import { useStandardModalState } from '../../functions';
import { VoucherDetailListItem } from './voucher-detail-list-item.view';
import { VoucherDetailListModal } from './voucher-detail-list-modal.view';
/** === INTERFACE === */
interface VoucherDetailTnCProps {
  termsAndCondition: Array<string>;
}
/** === COMPONENT ===  */
export const VoucherDetailTnC: FC<VoucherDetailTnCProps> = ({
  termsAndCondition,
}) => {
  const tncModal = useStandardModalState();
  return (
    <View style={VoucherDetailStyles.sectionContainer}>
      <View style={{ marginBottom: 8 }}>
        <SnbText.B2>Syarat dan Ketentuan</SnbText.B2>
      </View>
      <VoucherDetailListItem listItem={termsAndCondition} />
      <View style={{ marginTop: 8 }}>
        {termsAndCondition.length > 3 ? (
          <TouchableOpacity onPress={() => tncModal.setOpen(true)}>
            <SnbText.B1 color={color.red50}>Baca Selengkapnya</SnbText.B1>
          </TouchableOpacity>
        ) : (
          <View />
        )}
      </View>
      <VoucherDetailListModal
        isOpen={tncModal.isOpen}
        handleClose={() => tncModal.setOpen(false)}
        type={'Syarat dan Ketentuan'}
        listItem={termsAndCondition}
      />
    </View>
  );
};
