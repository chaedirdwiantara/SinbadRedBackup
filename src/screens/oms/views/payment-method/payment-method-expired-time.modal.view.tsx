import React, { FC } from 'react';
import BottomModalError from '@core/components/BottomModalError';
import ActionSheet from '@core/components/product/ActionSheet';
import {
  SnbBottomSheet2,
  SnbBottomSheetPart,
  Content,
  SnbButton2,
  FooterButton,
} from 'react-native-sinbad-ui';
import { View } from 'react-native';
interface PaymentMethodExpiredTimeModalProps {
  isOpen: boolean;
  close: () => void;
}
/** === COMPONENT === */

export const PaymentMethodExpiredTimeModal: FC<
  PaymentMethodExpiredTimeModalProps
> = ({ isOpen, close }) => {
  const children = {};

  return (
    // <BottomModalError
    //   isOpen={isOpen}
    //   errorTitle={'Batas waktu pemesanan habis'}
    //   errorSubtitle={
    //     'Silahkan ulangi proses pemesanan dan selesaikan kurang dari 5 menit.'
    //   }
    //   errorImage={require('../../../../assets/images/expired_time.png')}
    //   buttonTitle={'Kembali ke Keranjang'}
    //   buttonOnPress={() => {
    //     close();
    //   }}
    // />
    // <ActionSheet
    //   contentHeight={460}
    //   open={isOpen}
    //   name="modal-expired-time"
    //   onClose={() => {
    //     close();
    //   }}
    //   title="Batas waktu pemesanan habis"></ActionSheet>

    <SnbBottomSheet2
      name={'modal-expired-time'}
      type="content"
      contentHeight={410}
      // closeFromBackdrop
      open={isOpen}
      close={() => {
        close();
      }}
      navigation={
        <SnbBottomSheetPart.Navigation
          iconRight1Name="x"
          onRight1Action={() => {
            close();
          }}
        />
      }
      title={
        <SnbBottomSheetPart.Title
          // swipeIndicator
          title={'Batas waktu pemesanan habis'}
          // rightButton={withClear ? 'Reset' : ''}
          // onRightButton={onClearFilter}
          // titleType={withClear ? 'left' : 'center'}
        />
      }
      content={
        <>
          <Content.Illustration
            image={require('../../../../assets/images/expired_time.png')}
            title="Batas waktu pemesanan habis"
            description="Silahkan ulangi proses pemesanan dan selesaikan kurang dari 5 menit."
          />
          <FooterButton.Single
            title="Kembali ke Keranjang"
            buttonPress={() => close()}
          />
        </>
      }
    />
  );
};

export default PaymentMethodExpiredTimeModal;
