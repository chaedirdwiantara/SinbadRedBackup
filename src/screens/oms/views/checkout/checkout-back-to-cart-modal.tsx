/** === IMPORT PACKAGE HERE ===  */
import React, { FC, Ref } from 'react';
import { Image, View } from 'react-native';
import {
  SnbText2,
  FooterButton,
  SnbBottomSheetPart,
  SnbBottomSheet2,
  colorV2,
  SnbBottomSheet2Ref,
} from 'react-native-sinbad-ui';
import { Images } from 'src/assets';
import { CheckoutStyle } from '../../styles';

interface BackToCartModalProps {
  parentRef: Ref<SnbBottomSheet2Ref>;
  handleOkAction: () => void;
  handleNoAction: () => void;
}
/** === COMPONENT === */
export const BackToCartModal: FC<BackToCartModalProps> = ({
  parentRef,
  handleOkAction,
  handleNoAction,
}) => {
  /** => content item image */
  const contentItemImage = () => {
    return (
      <View style={CheckoutStyle.contentImageContainer}>
        <Image
          source={Images.emptySinbad}
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
          Keluar dari Halaman Checkout
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
          Dengan keluar dari halaman ini, pesanan Anda tidak akan diproses.
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
      <FooterButton.Dual
        title1={'Lanjut Bayar'}
        title2={'Keluar'}
        button1Press={handleNoAction}
        button2Press={handleOkAction}
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
  /** => navigation */
  const navigation = () => {
    return (
      <SnbBottomSheetPart.Navigation
        iconRight1Name="x"
        onRight1Action={handleNoAction}
      />
    );
  };

  return (
    <SnbBottomSheet2
      ref={parentRef}
      name={'checkoutBackToCartModal'}
      type={'content'}
      contentHeight={410}
      title={title()}
      snap={true}
      content={content()}
      button={button()}
      navigation={navigation()}
    />
  );
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
