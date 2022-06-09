import React, { FC } from 'react';
import { Image, View } from 'react-native';
import {
  SnbText2,
  colorV2,
  FooterButton,
  SnbBottomSheet2,
  SnbBottomSheetPart,
} from 'react-native-sinbad-ui';
import { Images } from 'src/assets';
import { CheckoutStyle } from '../../styles';
interface CheckoutBottomErrorModalProps {
  isOpen: boolean;
  close: () => void;
}
/** === COMPONENT === */
export const ModalValidationLimit: FC<CheckoutBottomErrorModalProps> = ({
  isOpen,
  close,
}) => {
  /** => content item image */
  const contentItemImage = () => {
    return (
      <View style={CheckoutStyle.contentImageContainer}>
        <Image
          source={Images.pendingPayment}
          style={CheckoutStyle.image}
          resizeMode={'contain'}
        />
      </View>
    );
  };
  /** => content item title */
  const contentItemTitle = () => {
    return (
      <View style={CheckoutStyle.contentTitleContainer}>
        <SnbText2.Headline.Default
          color={colorV2.textColor.default}
          align={'center'}>
          Total Pembelian Terlalu Besar
        </SnbText2.Headline.Default>
      </View>
    );
  };
  /** => content item message */
  const contentItemMessage = () => {
    return (
      <View style={CheckoutStyle.contentMessageContainer}>
        <SnbText2.Paragraph.Default
          color={colorV2.textColor.secondary}
          align={'center'}>
          Kurangi produk di keranjang Anda hingga di bawah nominal Rp999.999.999
        </SnbText2.Paragraph.Default>
      </View>
    );
  };
  /** => content item */
  const contentItem = () => {
    return (
      <View style={CheckoutStyle.contentItemContainer}>
        {contentItemImage()}
        {contentItemTitle()}
        {contentItemMessage()}
      </View>
    );
  };
  /** => button */
  const button = () => {
    return (
      <FooterButton.Single title={'Kembali Ke Keranjang'} buttonPress={close} />
    );
  };
  /** => content */
  const content = () => {
    return <View>{contentItem()}</View>;
  };
  /** => title */
  const title = () => {
    return <SnbBottomSheetPart.Title />;
  };

  return (
    <SnbBottomSheet2
      name={'checkoutValidationLimitModal'}
      type={'content'}
      contentHeight={410}
      title={title()}
      open={isOpen}
      snap={false}
      content={content()}
      button={button()}
    />
  );
};

export default ModalValidationLimit;
