/** === IMPORT PACKAGE HERE ===  */
import BottomModalError from '@core/components/BottomModalError';
import React, { FC } from 'react';
import { Image, View } from 'react-native';
import {
  SnbDialog,
  SnbBottomSheet,
  SnbText,
  SnbButton,
} from 'react-native-sinbad-ui';

interface BackToCartModalProps {
  isOpen: boolean;
  handleOkAction: () => void;
  handleNoAction: () => void;
}
/** === COMPONENT === */
export const BackToCartModal: FC<BackToCartModalProps> = ({
  isOpen,
  handleOkAction,
  handleNoAction,
}) => {
  const button = () => {
    return (
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
        }}>
        <SnbButton.Multiple
          rightTitle={'Tidak'}
          leftTitle={'Ya'}
          leftType={'secondary'}
          rightType={'primary'}
          onPressLeft={handleOkAction}
          onPressRight={handleNoAction}
        />
      </View>
    );
  };

  const content = () => {
    return (
      <>
        <View
          style={{
            paddingHorizontal: 16,
            paddingBottom: 60,
          }}>
          <View style={{ marginBottom: 16, alignItems: 'center' }}>
            <Image source={require('../../../../assets/images/cancel.png')} />
            <SnbText.H3>Batalkan Pesanan</SnbText.H3>
            <SnbText.B1>Apakah anda ingin membatalkan pesanan?</SnbText.B1>
          </View>
        </View>
        {button()}
      </>
    );
  };

  return (
    // <SnbDialog
    //   open={isOpen}
    //   title="Konfirmasi"
    //   content="Apakah anda ingin membatalkan pesanan?"
    //   ok={handleNoAction}
    //   cancel={handleOkAction}
    //   okText="Tidak"
    //   cancelText="Ya"
    // />
    <SnbBottomSheet
      open={isOpen}
      content={content()}
      // title={'Batalkan Pesanan'}
      // closeAction={handleOkAction}
      size={'normal'}
    />
  );
};

/**
 * ================================================================
 * NOTES
 * ================================================================
 * createdBy: Ryan (voyager)
 * createDate: 30112021
 * updatedBy: -
 * updatedDate: -
 * updatedFunction/Component:
 * -> NaN (no desc)
 * -> NaN (no desc)
 */
