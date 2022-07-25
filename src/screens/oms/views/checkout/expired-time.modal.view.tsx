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
export const ModalBottomErrorExpiredTime: FC<CheckoutBottomErrorModalProps> = ({
  parentRef,
  close,
  testID,
}) => {
  /** => content item image */
  const contentItemImage = () => {
    return (
      <View style={CheckoutStyle.contentImageContainer}>
        <Image
          testID={`img.modalExpiredTime.${testID}`}
          source={Images.cartNotFound}
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
          testID={`title.modalExpiredTime.${testID}`}
          color={colorV2.textColor.default}
          align={'center'}>
          Batas Waktu Pemesanan Habis
        </SnbText2.Headline.Default>
      </View>
    );
  };
  /** => content item message */
  const contentItemMessage = () => {
    return (
      <View style={CheckoutStyle.contentMessageContainer}>
        <SnbText2.Paragraph.Default
          testID={`subTitle.modalExpiredTime.${testID}`}
          color={colorV2.textColor.secondary}
          align={'center'}>
          Silahkan ulangi proses pemesanan dan selesaikan kurang dari 5 menit
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
        testID={`modalExpiredTime.${testID}`}
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
      name={'checkoutExpiredTimeModal'}
      type={'content'}
      contentHeight={410}
      title={title()}
      snap={false}
      content={content()}
      button={button()}
      isBackDisable
    />
  );
};

export default ModalBottomErrorExpiredTime;
