import { testProps } from '@core/functions/global/test-props';
import React, { FC, Ref } from 'react';
import { Image, View } from 'react-native';
import {
  SnbText2,
  colorV2,
  FooterButton,
  SnbBottomSheet2,
  SnbBottomSheetPart,
  SnbBottomSheet2Ref,
} from 'react-native-sinbad-ui';
import { Images } from 'src/assets';
import { CheckoutStyle } from '../../styles';
interface CheckoutBottomErrorModalProps {
  parentRef: Ref<SnbBottomSheet2Ref>;
  close: () => void;
  testID: string;
}
/** === COMPONENT === */
export const ModalValidationLimit: FC<CheckoutBottomErrorModalProps> = ({
  parentRef,
  close,
  testID,
}) => {
  /** => content item image */
  const contentItemImage = () => {
    return (
      <View style={CheckoutStyle.contentImageContainer}>
        <Image
          {...testProps(`img.modalValidationLimit.${testID}`)}
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
          testID={`title.modalValidationLimit.${testID}`}
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
          testID={`subTitle.modalValidationLimit.${testID}`}
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
      <FooterButton.Single
        testID={`modalValidationLimit.${testID}`}
        title={'Kembali Ke Keranjang'}
        buttonPress={close}
      />
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
      ref={parentRef}
      name={'checkoutValidationLimitModal'}
      type={'content'}
      contentHeight={410}
      title={title()}
      snap={false}
      content={content()}
      button={button()}
    />
  );
};

export default ModalValidationLimit;
