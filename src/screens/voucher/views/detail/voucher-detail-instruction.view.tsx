/** === IMPORT PACKAGE HERE ===  */
import React, { FC } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { SnbText, color } from 'react-native-sinbad-ui';
import { VoucherDetailStyles } from '../../styles';
import { useStandardModalState } from '../../functions';
import { VoucherDetailListItem } from './voucher-detail-list-item.view';
import { VoucherDetailListModal } from './voucher-detail-list-modal.view';
/** === INTERFACE === */
interface VoucherDetailInstructionProps {
  instructions: Array<string>;
}
/** === COMPONENT ===  */
export const VoucherDetailInstruction: FC<VoucherDetailInstructionProps> = ({
  instructions,
}) => {
  const instructionModal = useStandardModalState();
  return (
    <View style={VoucherDetailStyles.sectionContainer}>
      <View style={{ marginBottom: 8 }}>
        <SnbText.B2>Cara Pakai</SnbText.B2>
      </View>
      <VoucherDetailListItem listItem={instructions} />
      <View style={{ marginTop: 8 }}>
        {instructions.length > 3 ? (
          <TouchableOpacity onPress={() => instructionModal.setOpen(true)}>
            <SnbText.B1 color={color.red50}>Baca Selengkapnya</SnbText.B1>
          </TouchableOpacity>
        ) : (
          <View />
        )}
      </View>
      <VoucherDetailListModal
        isOpen={instructionModal.isOpen}
        handleClose={() => instructionModal.setOpen(false)}
        type={'Cara Pakai'}
        listItem={instructions}
      />
    </View>
  );
};
