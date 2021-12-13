/** === IMPORT PACKAGE HERE ===  */
import React, { FC } from 'react';
import { View } from 'react-native';
import { SnbBottomSheet } from 'react-native-sinbad-ui';
import { VoucherDetailListItem } from './voucher-detail-list-item.view';
/** === INTERFACE === */
interface VoucherDetailListModalProps {
  listItem: Array<string>;
  isOpen: boolean;
  handleClose: () => void;
  type: string;
}
/** === COMPONENT ===  */
export const VoucherDetailListModal: FC<VoucherDetailListModalProps> = ({
  listItem,
  isOpen,
  handleClose,
  type,
}) => {
  return (
    <View>
      <SnbBottomSheet
        open={isOpen}
        content={
          <View style={{ marginHorizontal: 16, marginBottom: 16 }}>
            <VoucherDetailListItem listItem={listItem} isFull />
          </View>
        }
        title={type}
        actionIcon={'close'}
        closeAction={handleClose}
        size={'fullscreen'}
      />
    </View>
  );
};
