/** === IMPORT PACKAGE HERE ===  */
import React, { FC, Ref } from 'react';
import {
  SnbBottomSheetPart,
  SnbBottomSheet2,
  SnbBottomSheet2Ref,
  Content,
  FooterButton,
} from 'react-native-sinbad-ui';
import { Images } from 'src/assets';
/** === INTERFACE ===  */
interface ModalErrorCheckVoucherProps {
  handleClose: () => void;
  parentRef: Ref<SnbBottomSheet2Ref>;
  testID: string;
}
/** === COMPONENT ===  */
export const ModalErrorCheckVoucher: FC<ModalErrorCheckVoucherProps> = ({
  handleClose,
  parentRef,
  testID,
}) => {
  const content = () => {
    return (
      <Content.Illustration
        image={Images.voucherNotMatch}
        title={'Voucher Tidak Tersedia'}
        description={
          'Sepertinya voucher anda sudah habis, silahkan klik tombol dibawah untuk memilih voucher lainnya'
        }
      />
    );
  };

  /** => button */
  const button = () => {
    return (
      <FooterButton.Single
        testID={`modalErrorCheckVoucher.${testID}`}
        title={'Kembali Ke Keranjang'}
        buttonPress={handleClose}
      />
    );
  };

  const title = () => {
    return <SnbBottomSheetPart.Title />;
  };

  return (
    <SnbBottomSheet2
      ref={parentRef}
      name={'errorCheckVoucher'}
      type={'content'}
      contentHeight={430}
      snap={false}
      title={title()}
      content={content()}
      button={button()}
      isBackDisable
    />
  );
};
