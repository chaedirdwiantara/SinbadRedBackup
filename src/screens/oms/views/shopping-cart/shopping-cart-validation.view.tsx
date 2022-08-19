import React, { Ref } from 'react';
import { View, Image } from 'react-native';
import {
  SnbBottomSheet2,
  SnbBottomSheetPart,
  SnbText2,
  colorV2,
  FooterButton,
  SnbBottomSheet2Ref,
} from 'react-native-sinbad-ui';
import { ShoppingCartValidationStyles } from '@screen/oms/styles';
import { Images } from 'src/assets';
import { testProps } from '@core/functions/global/test-props';
/** === INTERFACE === */
/** => error props */
interface ShoppingCartValidationProps {
  closeAction?: () => void;
  parentRef: Ref<SnbBottomSheet2Ref>;
  testID: string;
}
/** === COMPONENT === */
const ShoppingCartValidation: React.FC<ShoppingCartValidationProps> = ({
  parentRef,
  ...props
}) => {
  /** ======================================================================= */
  /** => content item image */
  const contentItemImage = () => {
    return (
      <View style={ShoppingCartValidationStyles.contentImageContainer}>
        <Image
          {...testProps(`img.content.modalRemoveProduct.${props.testID}`)}
          source={Images.reminder}
          style={ShoppingCartValidationStyles.image}
        />
      </View>
    );
  };
  /** => content item title */
  const contentItemTitle = () => {
    return (
      <View style={ShoppingCartValidationStyles.contentTitleContainer}>
        <SnbText2.Headline.Default
          testID={`title.content.modalCartValidation.${props.testID}`}
          color={colorV2.textColor.default}
          align={'center'}>
          Perubahan Produk di Keranjang
        </SnbText2.Headline.Default>
      </View>
    );
  };
  /** => content item message */
  const contentItemMessage = () => {
    return (
      <View style={ShoppingCartValidationStyles.contentMessageContainer}>
        <SnbText2.Paragraph.Default
          testID={`subTitle.content.modalCartValidation.${props.testID}`}
          color={colorV2.textColor.secondary}
          align={'center'}>
          Cek ulang keranjang Anda untuk mengetahui produk yang mengalami
          perubahan.
        </SnbText2.Paragraph.Default>
      </View>
    );
  };
  /** => content item */
  const contentItem = () => {
    return (
      <View style={ShoppingCartValidationStyles.contentItemContainer}>
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
        testID={`modalCartValidation.${props.testID}`}
        title={'Kembali Ke Keranjang'}
        buttonPress={() => {
          props?.closeAction && props?.closeAction();
        }}
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
  /** => main */
  return (
    <SnbBottomSheet2
      ref={parentRef}
      name={'cartValidationCheckoutModal'}
      type={'content'}
      contentHeight={400}
      title={title()}
      snap={false}
      content={content()}
      button={button()}
      isBackDisable
    />
  );
};

export default ShoppingCartValidation;
