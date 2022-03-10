/** === IMPORT PACKAGE HERE ===  */
import React, { FC } from 'react';
import { Image, View } from 'react-native';
import { SnbBottomSheet, SnbText, SnbButton } from 'react-native-sinbad-ui';

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
  /** => ACTION */
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

  return <SnbBottomSheet open={isOpen} content={content()} size={'normal'} />;
};

/**
 * ================================================================
 * NOTES
 * ================================================================
 * createdBy: Ryan (voyager)
 * createDate: 30112021
 * updatedBy: Andi Chaedir Dwiantara (valkyrie)
 * updatedDate: 09032022
 * updatedFunction/Component:
 * -> NaN (no desc)
 * -> NaN (no desc)
 */
